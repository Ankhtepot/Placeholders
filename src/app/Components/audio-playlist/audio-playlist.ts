import {
  Component,
  ElementRef,
  ViewChild,
  signal,
  Input,
  WritableSignal,
  OnInit,
  ViewChildren,
  QueryList, AfterViewInit
} from '@angular/core';
import {CommonModule} from '@angular/common';
// import {IconButtonComponent} from '../icon-button/icon-button.component';
import {ETrackEventType, NULL_TRACK, Playlist, Track, TrackEventData} from './models';
import {SoundPlayer} from './sound-player/sound-player';

@Component({
  selector: 'app-audio-playlist',
  standalone: true,
  templateUrl: './audio-playlist.html',
  styleUrls: ['./audio-playlist.scss'],
  // imports: [CommonModule, IconButtonComponent, SoundPlayer]
  imports: [CommonModule, SoundPlayer]
})
export class AudioPlaylist implements OnInit, AfterViewInit {
  @ViewChild('audio') audioRef!: ElementRef<HTMLAudioElement>;
  @Input() playlist!: Playlist;
  @ViewChildren('soundPlayer') soundPlayers: QueryList<SoundPlayer>;

  currentTrack: WritableSignal<Track> = signal(NULL_TRACK);
  currentTrackIndex: WritableSignal<number> = signal(0);
  isPlaying = signal(false);
  hasTracks = signal(false);
  progress = signal(0);

  readonly maximumPlayRetries: number = 5;

  private audio!: HTMLAudioElement;
  private previousTrack: WritableSignal<Track> = this.currentTrack;
  private shouldUpdateProgress: boolean = false;

  constructor() {
    this.soundPlayers = new QueryList<SoundPlayer>();
  }

  ngOnInit() {
    if (this.playlist.tracks.length > 0) {
      this.hasTracks.set(true);
      this.currentTrack.set(this.playlist.tracks[0]);
    }
  }

  ngAfterViewInit() {
    this.audio = this.audioRef.nativeElement;
  }

  togglePlay() {
    if (!this.isPlaying()) {
      this.audio.play();
      this.isPlaying.set(true);
      this.getCurrentTrackPlayer().play(false);
      this.shouldUpdateProgress = true;
    } else {
      this.audio.pause();
      this.isPlaying.set(false);
      this.getCurrentTrackPlayer().pause(false);
      this.shouldUpdateProgress = false;
    }
  }

  updateProgress() {
    if (!this.shouldUpdateProgress) return;

    let progress: number = (this.audio.currentTime / this.audio.duration) * 100;
    this.progress.set(progress);
    this.getCurrentTrackPlayer().updateProgress(progress);
  }

  onEnded() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.shouldUpdateProgress = false;
    this.isPlaying.set(false);
    this.progress.set(0);
    this.getCurrentTrackPlayer().stop(false);
  }

  onPlay() {
    this.isPlaying.set(true);
    this.getCurrentTrackPlayer().play(false);
  }

  onPause() {
    this.isPlaying.set(false);
    this.getCurrentTrackPlayer().pause(false);
  }

  protected readonly NULL_TRACK = NULL_TRACK;

  onTrackEvent($event: TrackEventData) {
    switch ($event.event) {
      case ETrackEventType.play : {
        this.stopAll();
        this.getCurrentTrackPlayer().stop(false);
        this.currentTrack.set(this.playlist.tracks[$event.index]);
        this.previousTrack.set(this.currentTrack());
        this.currentTrackIndex.set($event.index);
        this.isPlaying.set(true);
        this.getCurrentTrackPlayer().play(false);
        this.progress.set(0);
        this.audio.load();
        this.handlePlay();
      } break;
      case ETrackEventType.pause : {
        this.getCurrentTrackPlayer().pause(false);
        this.isPlaying.set(false);
        this.audio.pause();
      }
    }
  }

  private stopAll() {
    for (let soundPlayer of this.soundPlayers) {
      soundPlayer.stop(false, true);
    }
  }

  private getCurrentTrackPlayer(): SoundPlayer {
    return this.soundPlayers.get(this.currentTrackIndex())!;
  }

  private retryNr: number = 0;

  private handlePlay() {
    let playPromise = this.audio.play();

    if (playPromise !== undefined) {
      playPromise.then(_ => {
        this.shouldUpdateProgress = true;
        this.retryNr = 0;
      })
        .catch(_ => {
          this.retryNr += 1;

          if (this.retryNr >= this.maximumPlayRetries) {
            console.log('Maximum number of retries reached, aborting...');
            return;
          }

          console.log('error post audio.play(), trying replay, attempt nr.: ', this.retryNr);
          setTimeout(() => { this.handlePlay(); }, 100);
        })
    }
  }

  protected readonly stop = stop;
}

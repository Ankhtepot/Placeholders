import {
  AfterViewInit,
  Component,
  ElementRef,
  Input, OnDestroy,
  OnInit,
  QueryList,
  signal,
  ViewChild,
  ViewChildren,
  WritableSignal
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IconButtonComponent} from '../icon-button/icon-button.component';
import {ETrackEventType, NULL_TRACK, Playlist, Track, TrackEventData} from './models';
import {SoundTrack} from './sound-track/sound-track';

@Component({
  selector: 'app-audio-playlist',
  standalone: true,
  templateUrl: './audio-playlist.html',
  styleUrls: ['./audio-playlist.scss'],
  imports: [CommonModule, IconButtonComponent, SoundTrack]
  // imports: [CommonModule, SoundPlayer]
})
export class AudioPlaylist implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('audio') audioRef!: ElementRef<HTMLAudioElement>;
  @Input() playlist!: Playlist;
  @ViewChildren('soundPlayer') soundPlayers: QueryList<SoundTrack>;

  artistTextPart: WritableSignal<string> = signal('');
  currentTrack: WritableSignal<Track> = signal(NULL_TRACK);
  currentTrackIndex: WritableSignal<number> = signal(0);
  currentTrackPlayer: WritableSignal<SoundTrack | null> = signal(null);
  isPlaying = signal(false);
  hasTracks = signal(false);

  readonly maximumPlayRetries: number = 5;
  playFirstIconWrapper!: HTMLDivElement;

  private audio!: HTMLAudioElement;
  private previousTrack: WritableSignal<Track> = this.currentTrack;
  private shouldUpdateProgress: boolean = false;
  private playRetryTimeoutId: number | null = null;

  constructor() {
    this.soundPlayers = new QueryList<SoundTrack>();
  }

  ngOnInit() {
    if (this.playlist.artist !== '' && this.playlist.artist != undefined) {
      this.artistTextPart.set(' - ' + this.playlist.artist);
    }

    if (this.playlist.tracks.length > 0) {
      this.hasTracks.set(true);
      this.currentTrack.set(this.playlist.tracks[0]);
      this.currentTrackIndex.set(0);

    }
  }

  ngAfterViewInit() {
    this.audio = this.audioRef.nativeElement;
    this.playFirstIconWrapper = document.querySelector('.button-icon-wrapper')!;
  }

  ngOnDestroy() {
    if (this.playRetryTimeoutId) {
      clearTimeout(this.playRetryTimeoutId);
    }
  }

  updateProgress() {
    if (!this.shouldUpdateProgress) return;

    let progress: number = (this.audio.currentTime / this.audio.duration) * 100;
    this.currentTrackPlayer()!.updateProgress(progress);
  }

  onEnded() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.shouldUpdateProgress = false;
    this.isPlaying.set(false);
    this.currentTrackPlayer()!.stop(false);
  }

  onPlay() {
    this.isPlaying.set(true);
    if (!this.currentTrackPlayer()) {
      this.setCurrentTrackPlayer()
    }
    this.currentTrackPlayer()!.play(false);
    this.shouldUpdateProgress = true;
  }

  onPause() {
    this.isPlaying.set(false);
    this.currentTrackPlayer()!.pause(false);
    this.shouldUpdateProgress = false;
  }

  playFirst() {
    this.onTrackEvent({event: ETrackEventType.play, index: 0})
  }

  playLast() {
    this.onTrackEvent({event: ETrackEventType.play, index: this.playlist.tracks.length - 1})
  }

  playPrevious() {
    let currentTrackIndex = this.currentTrackIndex();
    if (currentTrackIndex <= 0) {
      return;
    }

    this.onTrackEvent({event: ETrackEventType.play, index: currentTrackIndex - 1})
  }

  playNext() {
    let currentTrackIndex = this.currentTrackIndex();
    if (currentTrackIndex >= this.playlist.tracks.length - 1) {
      return;
    }

    this.onTrackEvent({event: ETrackEventType.play, index: currentTrackIndex + 1})
  }

  protected readonly NULL_TRACK = NULL_TRACK;

  onTrackEvent($event: TrackEventData) {
    switch ($event.event) {
      case ETrackEventType.play : {
        this.audio.pause();
        this.shouldUpdateProgress = true;
        this.stopAll();
        if (!this.currentTrackPlayer()) {
          this.setCurrentTrackPlayer()
        }
        this.currentTrackPlayer()!.stop(false);
        this.currentTrack.set(this.playlist.tracks[$event.index]);
        this.previousTrack.set(this.currentTrack());
        this.currentTrackIndex.set($event.index);
        this.setCurrentTrackPlayer();
        this.isPlaying.set(true);
        this.currentTrackPlayer()!.play(false);
        this.audio.load();
        this.handlePlay();
      }
        break;
      case ETrackEventType.pause : {
        this.currentTrackPlayer()!.pause(false);
        this.isPlaying.set(false);
        this.audio.pause();
        this.shouldUpdateProgress = false;
      }
        break;
      case ETrackEventType.stop : {
        this.currentTrackPlayer()!.stop(false);
        this.isPlaying.set(false);
        this.audio.pause();
        this.audio.currentTime = 0;
        this.shouldUpdateProgress = false;
      }
    }
  }

  private stopAll() {
    for (let soundPlayer of this.soundPlayers) {
      soundPlayer.stop(false, true);
    }
  }

  private setCurrentTrackPlayer() {
    this.currentTrackPlayer.set(this.soundPlayers.get(this.currentTrackIndex())!);
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
          this.playRetryTimeoutId = window.setTimeout(() => {
            this.handlePlay();
          }, 100);
        })
    }
  }

  isCurrentIndexEqual(idx: number) {
    return this.currentTrackIndex() === idx;
  }
}

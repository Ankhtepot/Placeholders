import {Component, ElementRef, ViewChild, signal, Input, WritableSignal, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IconButtonComponent} from '../icon-button/icon-button.component';
import {NULL_TRACK, Playlist, Track} from './models';

@Component({
  selector: 'app-audio-playlist',
  standalone: true,
  templateUrl: './audio-playlist.html',
  styleUrls: ['./audio-playlist.scss'],
  imports: [CommonModule, IconButtonComponent]
})
export class AudioPlaylist implements OnInit {
  @ViewChild('audio') audioRef!: ElementRef<HTMLAudioElement>;
  @Input() playlist!: Playlist;

  currentTrack: WritableSignal<Track> = signal(NULL_TRACK);
  isPlaying = signal(false);
  progress = signal(0);

  ngOnInit() {
    if (this.playlist.tracks.length > 0) {
      this.currentTrack.set(this.playlist.tracks[0]);
    }
  }

  togglePlay() {
    const audio = this.audioRef.nativeElement;

    if (audio.paused) {
      audio.play();
      this.isPlaying.set(true);
    } else {
      audio.pause();
      this.isPlaying.set(false);
    }
  }

  updateProgress() {
    const audio = this.audioRef.nativeElement;
    this.progress.set((audio.currentTime / audio.duration) * 100);
  }

  onEnded() {
    this.isPlaying.set(false);
    this.progress.set(0);
  }

  protected readonly NULL_TRACK = NULL_TRACK;
}

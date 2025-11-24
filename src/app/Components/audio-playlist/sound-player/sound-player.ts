import {Component, ElementRef, ViewChild, signal, Input} from '@angular/core';
import {IconButtonComponent} from '../../icon-button/icon-button.component';
import {Track} from '../models';

@Component({
  selector: 'app-sound-player',
  standalone: true,
  templateUrl: './sound-player.html',
  styleUrls: ['./sound-player.scss'],
  imports: [
    IconButtonComponent
  ]
})
export class SoundPlayer {
  @ViewChild('audio') audioRef!: ElementRef<HTMLAudioElement>;
  @Input() track!: Track;

  isPlaying = signal(false);
  progress = signal(0);

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
}

import {Component, EventEmitter, Input, Output, signal,} from '@angular/core';
import {IconButtonComponent} from '../../icon-button/icon-button.component';
import {ETrackEventType, Track, TrackEventData} from '../models';

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
  @Input() track!: Track;
  @Input() index!: number;
  @Output() trackEvent: EventEmitter<TrackEventData> = new EventEmitter(false);

  isPlaying = signal(false);
  progress = signal(0);

  private shouldUpdateProgress: boolean = false;

  public stop(emitEvent: boolean = true, forceUpdateProgress = false) {
    this.isPlaying.set(false);
    this.updateProgress(0, forceUpdateProgress);
    this.shouldUpdateProgress = false;
    if (emitEvent) {
      this.emitTrackEvent(ETrackEventType.stop);
    }
  }

  public play(emitEvent: boolean = true) {
    this.isPlaying = signal(true);
    this.shouldUpdateProgress = true;
    if (emitEvent) {
      this.emitTrackEvent(ETrackEventType.play);
    }
  }

  pause(emitEvent: boolean = true) {
    this.isPlaying.set(false);
    if (emitEvent) {
      this.emitTrackEvent(ETrackEventType.pause);
    }
  }

  togglePlay() {
    this.isPlaying()
      ? this.emitTrackEvent(ETrackEventType.pause)
      : this.emitTrackEvent(ETrackEventType.play);
  }

  updateProgress(progress: number, forceUpdate: boolean = false) {
    if(this.shouldUpdateProgress || forceUpdate) {
      this.progress.set(progress);
    }
  }

  private emitTrackEvent(eventType: ETrackEventType) {
    this.trackEvent.emit({
      index: this.index,
      event: eventType
    });
  }
}

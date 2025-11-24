import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Playlist} from '../audio-playlist/models';
import {AudioPlaylist} from '../audio-playlist/audio-playlist';

@Component({
  selector: 'app-modal-content-playlist',
  imports: [
    CommonModule, AudioPlaylist
  ],
  templateUrl: './modal-content-playlist.html',
  styleUrls: ['./modal-content-playlist.scss'],
  standalone: true,
})
export class ModalContentPlaylist {
  @Input() title: string = "unset";
  @Input() playlist!: Playlist;
}

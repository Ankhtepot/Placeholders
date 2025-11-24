import {Component} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {AlbumComponent, EModalContent} from '../../Components/album.component/album.component';
import {Playlist, Track} from '../../Components/audio-playlist/models';

const Artist: string = "Sleeping Deficit";

@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage, AlbumComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
})
export class HomeComponent {

  pathImages = [
    "images/path-images/2.jpg", "images/path-images/3.jpg", "images/path-images/4.jpg", "images/path-images/5.jpg",
    "images/path-images/6.jpg", "images/path-images/8.jpg", "images/path-images/9.jpg", "images/path-images/10.jpg"
  ];
  pathTracks: Track[] = [
    {
      title: 'Intro',
      trackUrl: 'mp3/path/01-coldplay-square_one-bolo.mp3',
      artist: Artist,
      duration: 89
    },
    {
      title: 'Kobe Tai',
      trackUrl: 'https://sleepingdeficit.bandcamp.com/track/kobe-tai',
      artist: Artist,
      duration: 119
    }
  ];
  readonly pathPlaylist: Playlist = {
    thumbnailUrl: 'images/path-images/2.jpg',
    title: 'Path',
    tracks: this.pathTracks
  }
  protected readonly EModalContent = EModalContent;
}

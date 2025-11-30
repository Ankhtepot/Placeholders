import {Component} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {AlbumComponent, EModalContent} from '../../Components/album.component/album.component';
import {Playlist, Track} from '../../Components/audio-playlist/models';

const Artist: string = "Placeholders";

@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage, AlbumComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
})
export class HomeComponent {

  pathImages = [
    "images/path-images/song1.webp", "images/path-images/song2.webp", "images/path-images/song3.webp", "images/path-images/song4.webp",
    "images/path-images/song5.webp", "images/path-images/song6.webp", "images/path-images/song7.webp"
  ];
  pathTracks: Track[] = [
    {
      title: 'Muladhara',
      trackUrl: 'mp3/Hope/mixkit-cant-get-you-off-my-mind-1210.mp3',
      artist: Artist,
      thumbnailUrl: 'images/path-images/song1.webp'
    },
    {
      title: 'Swaristana',
      trackUrl: 'mp3/Hope/mixkit-dirty-thinkin-989.mp3',
      artist: Artist,
      thumbnailUrl: 'images/path-images/song2.webp'
    },
    {
      title: 'Manipura',
      trackUrl: 'mp3/Hope/mixkit-driving-ambition-32.mp3',
      artist: Artist,
      thumbnailUrl: 'images/path-images/song3.webp'
    },
    {
      title: 'Anahata',
      trackUrl: 'mp3/Hope/mixkit-epical-drums-01-676.mp3',
      artist: Artist,
      thumbnailUrl: 'images/path-images/song4.webp'
    },
    {
      title: 'Vishuddha',
      trackUrl: 'mp3/Hope/mixkit-fright-night-871.mp3',
      artist: Artist,
      thumbnailUrl: 'images/path-images/song5.webp'
    },
    {
      title: 'Ajna',
      trackUrl: 'mp3/Hope/mixkit-games-worldbeat-466.mp3',
      artist: Artist,
      thumbnailUrl: 'images/path-images/song6.webp'
    },
    {
      title: 'Sahasrara',
      trackUrl: 'mp3/Hope/mixkit-sports-highlights-51.mp3',
      artist: Artist,
      thumbnailUrl: 'images/path-images/song7.webp'
    }
  ];
  readonly pathPlaylist: Playlist = {
    thumbnailUrl: 'images/Hope.jpg',
    title: 'Hope',
    tracks: this.pathTracks,
    artist: "Placeholders"

  }
  protected readonly EModalContent = EModalContent;
}

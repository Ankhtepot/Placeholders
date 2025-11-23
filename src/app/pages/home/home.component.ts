import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AlbumComponent, EModalContent} from '../../Components/album.component/album.component';
import {
  faFacebookSquare,
  faSpotify,
  faYoutubeSquare,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home',
  imports: [FontAwesomeModule, NgOptimizedImage, AlbumComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
})
export class HomeComponent {
  faFacebook = faFacebookSquare;
  faSpotify = faSpotify;
  faYoutube = faYoutubeSquare;

  pathImages = [
    "images/path-images/2.jpg", "images/path-images/3.jpg", "images/path-images/4.jpg", "images/path-images/5.jpg",
    "images/path-images/6.jpg", "images/path-images/8.jpg", "images/path-images/9.jpg", "images/path-images/10.jpg"
  ];
  pathPlaylist = ["playlist", "playlist"];
  protected readonly EModalContent = EModalContent;
}

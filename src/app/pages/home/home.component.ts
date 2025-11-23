import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AlbumComponent, EModalContent} from '../../Components/album.component/album.component';
import {
  faFacebookSquare,
  faSpotify,
  faYoutubeSquare,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FontAwesomeModule, NgOptimizedImage, AlbumComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
})
export class HomeComponent {
  faFacebook = faFacebookSquare;
  faSpotify = faSpotify;
  faYoutube = faYoutubeSquare;

  pathImages = ["blabla", "bleble"];
  pathPlaylist = ["playlist", "playlist"];
  protected readonly EModalContent = EModalContent;
}

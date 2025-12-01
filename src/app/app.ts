import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  WrapSwappingBackgroundComponent
} from './Components/wrap-swapping-background/wrap-swapping-background.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WrapSwappingBackgroundComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected title = 'Placeholders';

  backgroundImageUrls: string[] = [];

  ngOnInit(): void {
    for (let i = 1; i <= 7; i++) {
      this.backgroundImageUrls.push(`images/path-images/song${i}.webp`);
    }

    this.backgroundImageUrls.push(`images/Hope.jpg`);
    this.backgroundImageUrls.push(`images/Downs.jpg`);
  }
  NgOnInit() {
    // Preload background images

  }
}



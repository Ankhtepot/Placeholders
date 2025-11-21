import {Component, Input, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-album',
  imports: [CommonModule],
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
  standalone: true
})
export class AlbumComponent implements OnInit {
  @Input() imagePath!: string;
  @Input() name!: string;
  @Input() comment!: string;
  @Input() playList?: string[];
  @Input() images?: string[];

  readonly hasPlaylist = signal(false);
  readonly hasImages = signal(false);
  readonly hasAdditionalFunctions = signal(false);

  ngOnInit(): void {
      this.hasPlaylist.set(this.playList != undefined && this.playList.length > 0);
      this.hasImages.set(this.images != undefined && this.images.length > 0);
      this.hasAdditionalFunctions.set(this.hasPlaylist() || this.hasImages());
  }

}

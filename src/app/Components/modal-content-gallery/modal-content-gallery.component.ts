import {Component, Input, OnInit, signal} from '@angular/core';
// import {GalleryComponent, ImageItem} from 'ng-gallery';
import {ImageItem} from 'ng-gallery';
import {GallerizeDirective} from 'ng-gallery/lightbox';

@Component({
  selector: 'app-modal-content-gallery',
  // imports: [
  //   GalleryComponent,
  //   GallerizeDirective
  // ],
  imports: [
    GallerizeDirective
  ],
  templateUrl: './modal-content-gallery.component.html',
  styleUrls: ['./modal-content-gallery.component.scss'],
  standalone: true
})
export class ModalContentGalleryComponent implements OnInit {
  @Input() imagesPaths!: string[];
  @Input() galleryName!: string;

  readonly imageItems = signal<ImageItem[]>([]);

  ngOnInit() {
    if (this.imagesPaths) {
      this.imageItems.set(this.generateImageItems()); // Defensive copy, optional
    }
  }

  generateImageItems(): ImageItem[] {
    let result: ImageItem[] = [];
    for (let image of this.imagesPaths) {
      result.push(new ImageItem({
        src: image,
        thumb: image
      }))
    }

    return result;
  }

  protected readonly ImageItem = ImageItem;
}

import {Component, Input, OnInit, signal} from '@angular/core';
// import {CarouselComponent} from '../carousel/carousel.component';
// import {ImageSlideComponent} from '../carousel/image-slide/image-slide.component';

@Component({
  selector: 'app-modal-content-gallery',
  // imports: [CommonModule, CarouselComponent, ImageSlideComponent],
  imports: [],
  templateUrl: './modal-content-gallery.component.html',
  styleUrls: ['./modal-content-gallery.component.scss'],
  standalone: true
})
export class ModalContentGalleryComponent implements OnInit {
  @Input() imagesPaths!: string[];

  readonly paths = signal<string[]>([]);

  ngOnInit() {
    if (this.imagesPaths) {
      this.paths.set([...this.imagesPaths]); // Defensive copy, optional
    }
  }

}

import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-image-slide',
  templateUrl: './image-slide.component.html',
  styleUrl: './image-slide.component.scss'
})
export class ImageSlideComponent {
  @Input() image: string = '';
}

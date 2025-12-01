import {Component, signal, WritableSignal} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {AlbumComponent} from '../../Components/album.component/album.component';
import Data from '../../shared/data';

@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage, AlbumComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
})
export class HomeComponent {

  tooltipContent: WritableSignal<string> = signal<string>('');

  setTooltip(text: string) {
    this.tooltipContent.set(text);
  }

  protected readonly Data = Data;
}

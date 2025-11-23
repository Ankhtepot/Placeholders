import {Component, Input, OnInit, signal} from '@angular/core';
import {IconButtonComponent} from '../icon-button/icon-button.component';
import {ModalComponent} from '../modal/modal.component';
import {ModalContentGalleryComponent} from '../modal-content-gallery/modal-content-gallery.component';

export enum EModalContent {
  none = 'none',
  playlist = 'playlist',
  gallery = 'gallery',
  buy = 'buy',
}

@Component({
  selector: 'app-album',
  imports: [IconButtonComponent, ModalComponent, ModalContentGalleryComponent],
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

  public modalContent: string[] = [];

  readonly hasPlaylist = signal(false);
  readonly hasImages = signal(false);
  readonly hasAdditionalFunctions = signal(false);
  readonly isAdditionFunctionsHover = signal(false);
  readonly showModalContentType = signal(EModalContent.none);

  ngOnInit(): void {
      this.hasPlaylist.set(this.playList != undefined && this.playList.length > 0);
      this.hasImages.set(this.images != undefined && this.images.length > 0);
      this.hasAdditionalFunctions.set(this.hasPlaylist() || this.hasImages());
  }

  setAdditionFunctionsHover(isHover: boolean) {
      this.isAdditionFunctionsHover.set(isHover);
  }

  public onAlbumButtonClick(contentType: EModalContent, payload?: string[]): void {
    this.showModalContentType.set(contentType);

    if (contentType === EModalContent.none) {return;}

    this.modalContent = payload || [];
  }

  protected readonly EModalContent = EModalContent;
}

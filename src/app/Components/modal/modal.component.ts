import {AfterViewInit, Component, EventEmitter, HostListener, Input, Output, signal} from '@angular/core';
import {GenericButtonComponent} from '../button-general/button-generic.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [GenericButtonComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterViewInit {
  @Output() close = new EventEmitter<void>();
  @Input() isCloseButtonShown: boolean = true;

  readonly isOpening = signal(false);

  public closeText: string = 'Close';

  closeButtonStyle = {
    width: '80%',
    margin: ' 0.5em auto',
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.isOpening.set(true));
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal-backdrop')) {
      this.isOpening.set(false);
      setTimeout(() => this.close.emit(), 300);
    }
  }
}

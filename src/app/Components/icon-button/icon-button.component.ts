import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-icon-button',
  imports: [
    CommonModule,
  ],
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  standalone: true
})
export class IconButtonComponent {

  // Input for the icon name or content (customize as needed)
  @Input() iconName: string = '';
  @Input() iconColor: string = '';
  @Input() width: string = "5em";
  @Input() height: string = "5em";
  @Input() text: string = "";
  @Input() disabled: boolean = false;
  @Input() showBorder: boolean = true;

  // Input for passing a click handler function
  @Input() onclick: () => void = () => {};
}

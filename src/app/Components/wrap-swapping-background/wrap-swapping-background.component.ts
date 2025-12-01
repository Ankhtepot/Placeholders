import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";

/**
 * A component that swaps between two images at a set interval, with a fade animation.
 */
@Component({
  selector: 'app-wrap-swapping-background',
  templateUrl: './wrap-swapping-background.component.html',
  styleUrl: './wrap-swapping-background.component.scss',
  standalone: true,
  imports: [CommonModule]
})
export class WrapSwappingBackgroundComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('primary_image') primaryImage!: ElementRef;
  @ViewChild('secondary_image') secondaryImage!: ElementRef;
  @ViewChild('wrapper') wrapper!: ElementRef;
  /**
   * An array of image URLs to swap between
   */
  @Input() images: string[] = [];
  /**
   * The distance from the top of the screen to the top of the background. Default is 0.
   */
  @Input() top: number = 0;
  /**
   * The distance from the bottom of the screen to the bottom of the background. Default is 0.
   * @default 0
   */
  @Input() bottom: number = 0;
  /**
   * The time in milliseconds between each image swap. Default is 5000.
   * @default 5000
   */
  @Input() timeBetweenSwaps: number = 5000;
  /**
   * The time in milliseconds for the transition animation. Default is 2000.
   * @default 2000
   */
  @Input() transitionTime: number = 2000;
  /**
   * The color of the overlay. Default is white.
   * @default 'white'
   */
  @Input() overlayColor: string = 'white';
  /**
   * The opacity of the overlay. Default is 0.5.
   * @default 0.5
   */
  @Input() overlayOpacity: number = 0.5;

  doLoop = true;
  primaryImageStyle!: CSSStyleDeclaration;
  secondaryImageStyle!: CSSStyleDeclaration;
  lastPrimaryImage: string = '';
  lastSecondaryImage: string = '';

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.wrapper.nativeElement.style.top = `${this.top}px`;
    this.wrapper.nativeElement.style.bottom = `${this.bottom}px`;
    this.wrapper.nativeElement.style.height = `calc(100% - ${this.top}px - ${this.bottom}px)`;

    if (!this.images || this.images.length < 2) {
      console.log('WrapSwappingBackgroundComponent: Must provide at least 2 images to swap between');
      return;
    }

    this.primaryImageStyle = this.primaryImage.nativeElement.style;
    this.secondaryImageStyle = this.secondaryImage.nativeElement.style;
    this.secondaryImageStyle.opacity = '0'; // Ensures it's ready to fade in again
    this.primaryImageStyle.opacity = '1';
    this.primaryImageStyle.backgroundImage = `url(${this.images[0]})`;
    this.secondaryImageStyle.backgroundImage = `url(${this.images[1]})`;

    if (this.images.length === 1) {
      return;
    }

    this.imageSwapLoop();
  }

  ngOnDestroy(): void {
    // Stop the loop when the component is destroyed.
    this.doLoop = false;
  }

  /**
   * Runs the image swap loop.
   * @private
   */
  private async imageSwapLoop() {
    while (this.doLoop) {
      await this.delay(this.timeBetweenSwaps);
      await this.swapImages();
    }
  }

  /**
   * Swaps the primary and secondary images with a fade animation.
   * @private
   */
  private async swapImages() {
    let primaryImageSrc = this.primaryImageStyle.backgroundImage;
    let secondaryImageSrc = this.secondaryImageStyle.backgroundImage;

    this.primaryImage.nativeElement.classList.add('fade-out');
    this.secondaryImage.nativeElement.classList.add('fade-in');

    // Wait for the fade animation to complete before swapping images
    await this.delay(this.transitionTime);  // Matches the animation duration

    this.swapBackgrounds(secondaryImageSrc, primaryImageSrc);

    // Remove animation classes to reset state for next swap
    this.primaryImage.nativeElement.classList.remove('fade-out');
    this.secondaryImage.nativeElement.classList.remove('fade-in');
    this.secondaryImageStyle.opacity = '0'; // Ensures it's ready to fade in again
    this.primaryImageStyle.opacity = '1';
  }

  /**
   * Swaps the primary and secondary images.
   * @param secondaryImageSrc - The source of the secondary image.
   * @param primaryImageSrc - The source of the primary image.
   * @private
   */
  private swapBackgrounds(secondaryImageSrc: string, primaryImageSrc: string) {
    if (this.images.length === 2) {
      // swaps primary and secondary images
      this.primaryImageStyle.backgroundImage = secondaryImageSrc;
      this.secondaryImageStyle.backgroundImage = primaryImageSrc;
    } else {
      let randomIndex = Math.floor(Math.random() * this.images.length);
      while (this.images[randomIndex] === this.lastPrimaryImage || this.images[randomIndex] === this.lastSecondaryImage) {
        randomIndex = Math.floor(Math.random() * this.images.length);
      }
      this.lastPrimaryImage = primaryImageSrc;
      this.lastSecondaryImage = secondaryImageSrc;
      this.primaryImageStyle.backgroundImage = secondaryImageSrc;
      this.secondaryImageStyle.backgroundImage = `url(${this.images[randomIndex]})`;
    }
  }

  /**
   * Delays execution by the specified number of milliseconds.
   * @param ms - The number of milliseconds to delay.
   * @private
   */
  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

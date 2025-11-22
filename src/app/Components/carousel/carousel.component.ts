import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import Swiper from "swiper";
import {Autoplay, Navigation, Pagination} from 'swiper/modules';
import {ScreenService} from "../../services/screen.service";
import {Subscription} from "rxjs";
import {CommonModule} from '@angular/common';
import {ImageSlideComponent} from './image-slide/image-slide.component';

function resolveSlidesCount(mediaBreakpoint: string) {
  if (mediaBreakpoint === 'xs' || mediaBreakpoint === 'sm') {
    return 1;
  } else if (mediaBreakpoint === 'md') {
    return 3;
  } else if (mediaBreakpoint === 'lg' || mediaBreakpoint === 'xl') {
    return 4;
  } else {
    return 5;
  }
}

function resolveSlidesPerCount(mediaBreakpoint: string) {
  if (mediaBreakpoint === 'xs' || mediaBreakpoint === 'sm') {
    return 1;
  } else {
    return 2;
  }
}

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, ImageSlideComponent],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  standalone: true,
})
export class CarouselComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() maxHeight: string = '100%';
  @Input() images: string[] = [];
  resizeSubscription?: Subscription;

  swiper?: Swiper;
  fillImageUrl: string = 'assets/images/seamless-cosmic-background.jpg';

  constructor(
    private screenService: ScreenService,
    private elementRef: ElementRef,
  ) {
  }

  ngOnInit(): void {
    this.resizeSubscription = this.screenService.mediaBreakpoint$.subscribe(() => {
      this.initializeSwiper()
    });
  }

  ngOnDestroy(): void {
    this.resizeSubscription?.unsubscribe();
    if (this.swiper) {
      this.swiper.destroy(true, true);
    }
  }

  ngAfterViewInit(): void {
    this.setSwiper();
  }

  initializeSwiper() {
    if (this.swiper) {
      this.swiper.destroy(true, true);
    }
    this.setSwiper();
  }

  private setSwiper() {
    this.images = this.getImages();
    this.swiper = new Swiper('.swiper', {
      slidesPerView: resolveSlidesCount(this.screenService.mediaBreakpoint$.value),
      slidesPerGroup: resolveSlidesPerCount(this.screenService.mediaBreakpoint$.value),
      centeredSlides: true,
      spaceBetween: 0,
      loop: true,
      speed: 2000,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      modules: [Navigation, Pagination, Autoplay],
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
    this.elementRef.nativeElement.querySelector('.swiper').style.backgroundImage = `url('${this.fillImageUrl}')`
    this.setSlideStyles();
  }

  getImages(): any[] {
    //TODO: images will be provided as Input property array
    return [];
  }

  private setSlideStyles() {
    const slides = this.elementRef.nativeElement.querySelectorAll('.swiper-slide');
    slides.forEach((slide: HTMLElement) => {
      slide.style.height = this.maxHeight;
      slide.style.display = 'flex';
      slide.style.justifyContent = 'center';
      slide.style.alignItems = 'center';
    });
  }

  public reinitializeSwiper() {
    this.images = this.getImages();

    if (this.swiper) {
      this.swiper.destroy(true, true);
    }
    this.removeSwiperElements();
    setTimeout(() => {
      this.setSwiper();
    });
  }

  private removeSwiperElements() {
    const swiperContainer = this.elementRef.nativeElement.querySelector('.swiper');
    if (swiperContainer) {
      swiperContainer.innerHTML = `
        <div class="swiper-wrapper">
          ${this.images.map(image => `
            <div class="swiper-slide">
              <img src="${image}" alt="Image" style="max-height: ${this.maxHeight};"/>
            </div>`).join('')}
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev" style="color: white"></div>
        <div class="swiper-button-next" style="color: white"></div>
        <div class="swiper-scrollbar"></div>
`;
    }
  }
}

import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import {provideRouter, withRouterConfig} from '@angular/router';

import {routerOptions, routes} from './app.routes';
import {ScreenService} from './services/screen.service';
import {provideAnimations} from '@angular/platform-browser/animations';
import {GALLERY_CONFIG, GalleryConfig, GalleryModule} from 'ng-gallery';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withRouterConfig(routerOptions)),
    ScreenService,
    provideAnimations(),
    importProvidersFrom(GalleryModule),
    {
      provide: GALLERY_CONFIG,
      useValue: {
        imageSize: 'contain',
      } as GalleryConfig,
    }
  ]
};

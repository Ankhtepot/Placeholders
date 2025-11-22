import {Injectable, OnDestroy,} from '@angular/core';
import {Subject, BehaviorSubject, fromEvent, pairwise, map,} from 'rxjs';
import {takeUntil, debounceTime,} from 'rxjs/operators';

@Injectable()
export class ScreenService implements OnDestroy {
  private _unsubscriber$: Subject<any> = new Subject();
  private _lastMediaBreakpoint: string = 'null';
  public screenWidth$: BehaviorSubject<number> = new BehaviorSubject(0);
  public mediaBreakpoint$: BehaviorSubject<string> = new BehaviorSubject('');
  public scrolledUp$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public scrolledDown$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public scrolledToTop$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    this.init();
    this.initScrollEvents();
  }

  init() {
    this._setScreenWidth(window.innerWidth);
    this._setMediaBreakpoint(window.innerWidth);
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(1000),
        takeUntil(this._unsubscriber$)
      ).subscribe((evt: any) => {
      this._setScreenWidth(evt.target.innerWidth);
      this._setMediaBreakpoint(evt.target.innerWidth);
    });
  }

  initScrollEvents() {
    fromEvent(window, 'scroll')
      .pipe(
        debounceTime(10),
        map(() => window.scrollY),
        pairwise(),
        takeUntil(this._unsubscriber$)
      )
      .subscribe(([prev, current]) => {
        if (current > prev && prev !== 0) {
          this.scrolledDown$.next(true);
          this.scrolledUp$.next(false);
        } else if (current < prev) {
          this.scrolledDown$.next(false);
          this.scrolledUp$.next(true);
        }

        if (current === 0) {
          this.scrolledToTop$.next(true);
        } else {
          this.scrolledToTop$.next(false);
        }
      });
  }

  ngOnDestroy() {
    this._unsubscriber$.next(null);
    this._unsubscriber$.complete();
  }

  private _setScreenWidth(width: number): void {
    this.screenWidth$.next(width);
  }

  private _setMediaBreakpoint(width: number): void {
    if (width < 576 && this._lastMediaBreakpoint !== 'xs') {
      this.mediaBreakpoint$.next('xs');
      this._lastMediaBreakpoint = 'xs';
    } else if (width >= 576 && width < 768 && this._lastMediaBreakpoint !== 'sm') {
      this.mediaBreakpoint$.next('sm');
      this._lastMediaBreakpoint = 'sm';
    } else if (width >= 768 && width < 992 && this._lastMediaBreakpoint !== 'md') {
      this.mediaBreakpoint$.next('md');
      this._lastMediaBreakpoint = 'md';
    } else if (width >= 992 && width < 1200 && this._lastMediaBreakpoint !== 'lg') {
      this.mediaBreakpoint$.next('lg');
      this._lastMediaBreakpoint = 'lg';
    } else if (width >= 1200 && width < 1600 && this._lastMediaBreakpoint !== 'xl') {
      this.mediaBreakpoint$.next('xl');
      this._lastMediaBreakpoint = 'xl';
    } else if (width >= 1600 && this._lastMediaBreakpoint !== 'xxl'){
      this.mediaBreakpoint$.next('xxl');
      this._lastMediaBreakpoint = 'xxl';
    }
  }

}

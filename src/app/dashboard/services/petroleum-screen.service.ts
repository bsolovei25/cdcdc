import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PetroleumScreenService {

  constructor() { }

  private localDate$: BehaviorSubject<string> = new BehaviorSubject<string>(
    null
  );

  public date$: Observable<string> = this.localDate$
    .asObservable()
    .pipe(filter((item) => item !== null));

  openScreen(screen) {
    this.localDate$.next(screen);
    console.log(screen);
  }
}

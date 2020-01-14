import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { HeaderDate } from '../models/header-date';

@Injectable({
  providedIn: 'root'
})
export class HeaderDataService {

  private _date$: BehaviorSubject<HeaderDate> = new BehaviorSubject(null);

  public date$: Observable<HeaderDate> = this._date$.asObservable().pipe(
    filter(item => item !== null)
  );

  public startDate;
  public endDate;
  public statusButton;

  public dateToLine = {

  };

  constructor() { }

  public catchDefaultDate(start, end, status){
    let datePipe = new DatePipe("en-Us");
    this.startDate = datePipe.transform(start, 'dd');
    this.endDate = datePipe.transform(end, 'dd');
    this.statusButton = status;
    this.pushDate();
    return console.log("date start: " + this.startDate + "; data end: " + end + "; status: " + status);
  }

  public catchDate(data, dateTime){
    let datePipe = new DatePipe("en-Us");
    let result = (dateTime) ? this.startDate = datePipe.transform(data, 'dd') : this.endDate = datePipe.transform(data, 'dd');
    this.pushDate();
    return console.log("choose date: " + result);
  }

  public catchStatusButton(status){
    this.statusButton = status;
    this.pushDate();
    return console.log("status: " + status);
  }

  public pushDate(){
    let dateTo = { start: this.startDate, end: this.endDate, status: this.statusButton };
    this._date$.next(dateTo);
  }

}

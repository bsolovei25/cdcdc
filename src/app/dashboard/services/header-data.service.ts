import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HeaderDataService {

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
    return console.log("date start: " + this.startDate + "; data end: " + end + "; status: " + status);
  }

  public catchDate(data, dateTime){
    let result = (dateTime) ? this.startDate = data : this.endDate = data;
    return console.log("choose date: " + result);
  }

  public catchStatusButton(status){
    this.statusButton = status;
    
    return console.log("status: " + status);
  }

  public getDate(){
    let dateTo = { start: this.startDate, end: this.endDate, status: this.statusButton };
    return dateTo;
  }

}

import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { HeaderDataService } from '../../services/header-data.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { HeaderDate } from '../../models/header-date';

@Component({
  selector: 'evj-line-datetime',
  templateUrl: './line-datetime.component.html',
  styleUrls: ['./line-datetime.component.scss']
})
export class LineDatetimeComponent implements OnInit {

  @ViewChild('startLine', {static: false}) startLine: ElementRef;


  private subscription: Subscription;

  public currentData;
  public dates = [];

  public dateFromSelector: HeaderDate;

  public positionEndLine = 1;
  public positionStartLine = 1;

  public widthBlock;

  public check = false;

  constructor(
    private renderer: Renderer2,
    private headerData: HeaderDataService
  ) {
    setInterval(() => {
      this.currentData = Date.now();
    }, 1000);

    this.subscription = this.headerData.date$.subscribe(data => {
      this.dateFromSelector = data;
      if(this.dateFromSelector.status === false && this.check === true){
        this.searchDate(this.dateFromSelector, this.startLine);
      }
    })
  }

  ngOnInit() {
    this.datesFill();
  }

  ngAfterViewInit(){
    this.check = true;
    if(this.dateFromSelector.status === false){
      this.searchDate(this.dateFromSelector, this.startLine);
    }
  }
  

  datesFill() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const daysCount = new Date(year, month, 0).getDate();
    for (let i = 0; i < daysCount; i++) {
      let active: boolean = false;
      let last: boolean = false;
      let future: boolean = false;
      if (i === day - 1) {
        active = true;
      } else if (i < day - 1) {
        last = true;
      } else {
        future = true;
      }
      const el = {
        day: i + 1,
        isActive: active,
        isLast: last,
        isFuture: future
      };
      this.dates.push(el);
    }
  }

/*
  public widthBlockDataLine(){
    let widthBlock = document.getElementById("widthBlock");
    return widthBlock.offsetWidth;
  }
*/
  public searchDate(data, elStart){
    debugger
    let count = this.dates.length/100;
    let count2 = this.dates.length/10;
    let countLine = data.start - data.end + 1;

    this.positionStartLine = (data.start-1)/count;
    debugger
   let width = countLine*count2 + count;
    this.renderer.setStyle(elStart.nativeElement, 'left', `${this.positionStartLine}%`);
    this.renderer.setStyle(elStart.nativeElement, 'width', `${width}%`);
  }

}

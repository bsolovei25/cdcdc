import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { HeaderDataService } from '../../services/header-data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'evj-line-datetime',
  templateUrl: './line-datetime.component.html',
  styleUrls: ['./line-datetime.component.scss']
})
export class LineDatetimeComponent implements OnInit, AfterViewInit {

  @ViewChild('startLine', {static: false}) startLine: ElementRef;
  @ViewChild('middleLine', {static: false}) middleLine: ElementRef;

  public currentData;
  public dates = [];

  public dateFromSelector = {};

  public positionEndLine = 1;
  public positionStartLine = 1;

  public widthBlock;

  constructor(
    private renderer: Renderer2,
    private headerData: HeaderDataService
  ) {
    setInterval(() => {
      this.currentData = Date.now();
    }, 1000);
  }



  ngOnInit() {
    this.datesFill();
    this.dateFromSelector = this.headerData.getDate();
    
  }

  ngAfterViewInit() { 
    this.widthBlock = this.widthBlockDataLine();
    this.searchDate(this.dateFromSelector, this.startLine, this.middleLine);
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

  public addBorderLine(){

  }

  public widthBlockDataLine(){
    let widthBlock = document.getElementById("widthBlock");
    return widthBlock.offsetWidth;
  }

  public searchDate(data, elStart, elMiddle){
    this.positionStartLine = ((data.start-1)*this.widthBlock);
    debugger
    let width = (data.start - data.end + 1) * this.widthBlock;
    this.renderer.setStyle(elStart.nativeElement, 'left', `${this.positionStartLine}px`);
    this.renderer.setStyle(elMiddle.nativeElement, 'width', `${width}px`);
    return 1;
   /* let search;
    let mass = [];
    search = document.getElementsByClassName("calendar-column_date");
    for(let i of this.dates){
      debugger
      let text = search[i].textContent;
      mass.push(text);
    }
    debugger
    return mass; */
  }

}

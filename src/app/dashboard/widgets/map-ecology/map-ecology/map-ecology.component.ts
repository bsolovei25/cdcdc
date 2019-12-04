import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { NewWidgetService } from 'src/app/dashboard/services/new-widget.service';


declare var d3: any;

@Component({
  selector: 'evj-map-ecology',
  templateUrl: './map-ecology.component.html',
  styleUrls: ['./map-ecology.component.scss']
})
export class MapEcologyComponent implements AfterViewInit {

  static itemCols = 32;
  static itemRows = 12;

  public startY = 55.6611;
  public startX = 37.7726;

  public startImgY = 55.6611;
  public startImgX = 37.7395;

  public clat;
  public clon;

  public namePoint;
  public idPoint;

   public datas = [
    { id:0, name: "TKА-1", lat: 55.6452, lon: 37.8030,
      attributs:[
          {point: "NO3", value: 0.3, pointvalue: 0.4,},
          {point: "NO5", value: 0.5, pointvalue: 0.3,}
      ]},

    { id:1, name: "TKА-2",lat: 55.6538, lon: 37.7981,
      attributs:[
      {point: "NO1", value: 0.3, pointvalue: 0.4,},
      {point: "NO5", value: 0.5, pointvalue: 0.3,}
      ]},

    { id:2, name: "TKА-3", lat: 55.6526, lon: 37.8125,
      attributs:[
      {point: "NO4", value: 0.3, pointvalue: 0.8,},
      {point: "NO5", value: 0.5, pointvalue: 0.5,}
      ]}
  ]

  constructor(
    public widgetService: NewWidgetService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string) 
    {
      this.namePoint = this.datas[0].name;
      this.idPoint = this.datas[0].id;
    }




  @ViewChild('myCircle', {static:false}) myCircle: ElementRef;

  ngAfterViewInit() {
    this.drawMap(this.myCircle.nativeElement, this.datas);
  } 

  public drawMap(el,data){
    const svg = d3.select(el).append("svg")
      .attr("min-width", "200px")
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("viewBox","37.7726 55.6611 0.0000001 0.0554");
     
    svg.append("image")
      .attr("xlink:href", "/assets/img/mapEcology2.jpg")
      .attr("height", "0.0554")
      .attr("width", "0.07225")
      .attr("y", this.startImgY)
      .attr("x", this.startImgX);

    for(let item of data){
      this.clat = 2.15*(this.startImgY-item.lat) + this.startY;
     // this.clon = 37.7495 + item.lon - 37.7726;
     this.clon = this.startImgX + (item.lon - this.startX)*1.2;
      svg.append("image")
        .attr("xlink:href", "/assets/pic/yoba.png")
        .attr("y", this.clat)
        .attr("x", this.clon)
        .attr("height", "0.0022")
        .attr("width", "0.0027");
    }
  }

  public nextPoint(id){
    debugger
    for(let item of this.datas){
      if(id === item.id){
        this.idPoint = this.datas[item.id+1].id;
        this.namePoint = this.datas[id+1].name;
      }
    }
  }

  public backPoint(id){
    debugger
    for(let item of this.datas){
      if(id === item.id){
        this.idPoint = this.datas[item.id-1].id;
        this.namePoint = this.datas[id-1].name;
      }
    }
  }
}

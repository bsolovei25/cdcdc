import { Component, OnInit, Inject, ViewChild, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { NewWidgetService } from '../../services/new-widget.service';
import { Subscription, pipe, VirtualTimeScheduler } from 'rxjs';
import 'leader-line';
import { FORMERR } from 'dns';

declare var LeaderLine: any;

declare var d3: any;

@Component({
  selector: 'evj-oil-control',
  templateUrl: './oil-control.component.html',
  styleUrls: ['./oil-control.component.scss']
})
export class OilControllComponent implements OnInit, AfterViewInit {
  
  @ViewChild('oilIcon', {static:false}) oilIcon: ElementRef;
  @ViewChild('oilBak', {static:false}) oilBak: ElementRef;
  @ViewChild('oilCircle', {static:false}) oilCircle: ElementRef;
  @ViewChild('borders', {static:false}) borders: ElementRef;

  static itemCols = 32;
  static itemRows = 12;

  public isVertical = false;

  private subscriptions: Subscription[] = [];

  private newWidth;

  data = {
    operations: 42,
    criticalOperations: 1,
    product: [
      {
        name: "ДТ сорт F",
        value: 12132,
        criticalValue: 23,
        storage: [
          {
            id: 1,
            nameStorage: "E-1",
            status: "critical",
            valueStorage: 10253,
            tank: {
                  timeStart:"02:03:20",
                  timeEnd:"04:08:38",
                  bakLevel: 10,
                  tankValue: [
                    {
                      name: "Отгружено по резервуару",
                      valueFirst: 1670,
                      valueSecond: 98.73,
                      status: "normal"
                    },
                    {
                      name: "По данным отгрузки",
                      valueFirst: 1700,
                      valueSecond: 103.23,
                      status: "ctitical"
                    },
                    {
                      name: "Дебаланс",
                      valueFirst: 30,
                      valueSecond: 1.27,
                      status: "normal"
                    },
                    {
                      name: "Допустимый дебаланс",
                      valueFirst: 15,
                      valueSecond: 103.23,
                      status: "default"
                    },
                    {
                      name: "Отклонение",
                      valueFirst: 15,
                      valueSecond: 103.23,
                      status: "normal"
                    }
                  ]                  
                },
            tanker: [
              {
                nameTanker: "Tug", shipped: true, value: 528, title: "Авто ( AУТН-2 )"
              },
              {
                nameTanker: "Tube", shipped: true, value: 528, title: "Ж/Д ( AУТН-2 )"
              },
              {
                nameTanker: "Cistern", shipped: true, value: 528, title: "Труба ( AУТН-2 )"
              },
            ]
          },
          {
            id: 2,
            nameStorage: "E-2",
            valueStorage: 10253,
            status: "normal",
            tank: {
                  timeStart:"020320",
                  timeEnd:"040838",
                  bakLevel: 70,
                  tankValue: [
                    {
                      name: "Отгружено по резервуару",
                      valueFirst: 1240,
                      valueSecond: 98.73,
                      status: "normal"
                    },
                    {
                      name: "По данным отгрузки",
                      valueFirst: 1700,
                      valueSecond: 103.23,
                      status: "normal"
                    },
                    {
                      name: "Дебаланс",
                      valueFirst: 30,
                      valueSecond: 1.27,
                      status: "normal"
                    },
                    {
                      name: "Допустимый дебаланс",
                      valueFirst: 15,
                      valueSecond: 103.23,
                      status: "normal"
                    },
                    {
                      name: "Отклонение",
                      valueFirst: 0,
                      valueSecond: 0,
                      status: "normal"
                    }
                  ]                  
                },
            tanker: [
              {
                nameTanker: "Tug", shipped: true, value: 528, title: "Авто ( AУТН-2 )"
              },
              {
                nameTanker: "Tube", shipped: true, value: 528, title: "Ж/Д ( AУТН-2 )"
              },
              {
                nameTanker: "Cistern", shipped: false, value: 528, title: "Труба ( AУТН-2 )"
              },
            ]
          },
          {
            id: 3,
            nameStorage: "E-3",
            valueStorage: 10253,
            status: "normal",
            tank: {
                  timeStart:"020320",
                  timeEnd:"040838",
                  bakLevel: 100,
                  tankValue: [
                    {
                      name: "Отгружено по резервуару",
                      valueFirst: 1670,
                      valueSecond: 98.73,
                      status: "normal"
                    },
                    {
                      name: "По данным отгрузки",
                      valueFirst: 1700,
                      valueSecond: 103.23,
                      status: "normal"
                    },
                    {
                      name: "Дебаланс",
                      valueFirst: 30,
                      valueSecond: 1.27,
                      status: "default"
                    },
                    {
                      name: "Допустимый дебаланс",
                      valueFirst: 15,
                      valueSecond: 103.23,
                      status: "normal"
                    },
                    {
                      name: "Отклонение",
                      valueFirst: 0,
                      valueSecond: 0,
                      status: "normal"
                    }
                  ]                  
                },
            tanker: [
              {
                nameTanker: "bus", shipped: true
              },
              {
                nameTanker: "pipe", shipped: false
              },
              {
                nameTanker: "train", shipped: false
              },
            ]
          },
          {
            id: 4,
            nameStorage: "E-4",
            valueStorage: 10253,
            tank: {
                  timeStart:"020320",
                  timeEnd:"040838",
                  tankValue: [
                    {
                      name: "Отгружено по резервуару",
                      valueFirst: 1670,
                      valueSecond: 98.73,
                      status: "normal"
                    },
                    {
                      name: "По данным отгрузки",
                      valueFirst: 1700,
                      valueSecond: 103.23,
                      status: "normal"
                    },
                    {
                      name: "Дебаланс",
                      valueFirst: 30,
                      valueSecond: 1.27,
                      status: "default"
                    },
                    {
                      name: "Допустимый дебаланс",
                      valueFirst: 15,
                      valueSecond: 103.23,
                      status: "normal"
                    },
                    {
                      name: "Отклонение",
                      valueFirst: 0,
                      valueSecond: 0,
                      status: "normal"
                    }
                  ]                  
                },
            tanker: [
              {
                nameTanker: "bus", shipped: true
              },
              {
                nameTanker: "pipe", shipped: false
              },
              {
                nameTanker: "train", shipped: false
              },
            ]
          },
          { 
            id: 5,
            nameStorage: "E-5",
            valueStorage: 10253,
            tank: {
                  timeStart:"020320",
                  timeEnd:"040838",
                  tankValue: [
                    {
                      name: "Отгружено по резервуару",
                      valueFirst: 1670,
                      valueSecond: 98.73,
                      status: "normal"
                    },
                    {
                      name: "По данным отгрузки",
                      valueFirst: 1700,
                      valueSecond: 103.23,
                      status: "normal"
                    },
                    {
                      name: "Дебаланс",
                      valueFirst: 30,
                      valueSecond: 1.27,
                      status: "default"
                    },
                    {
                      name: "Допустимый дебаланс",
                      valueFirst: 15,
                      valueSecond: 103.23,
                      status: "normal"
                    },
                    {
                      name: "Отклонение",
                      valueFirst: 0,
                      valueSecond: 0,
                      status: "normal"
                    }
                  ]                  
                },
            tanker: [
              {
                nameTanker: "bus", shipped: true
              },
              {
                nameTanker: "pipe", shipped: false
              },
              {
                nameTanker: "train", shipped: false
              },
            ]
          },
        ]
      },

      {
        name: "ДТ сорт C",
        value: 12132,
        
        storage: [
          {
            id: 1,
            nameStorage: "415",
            valueStorage: 10253,
            tank: {
                  timeStart:"020320",
                  timeEnd:"040838",
                  tankValue: [
                    {
                      name: "Отгружено по резервуару",
                      valueFirst: 1670,
                      valueSecond: 98.73,
                      status: "normal"
                    },
                    {
                      name: "По данным отгрузки",
                      valueFirst: 1700,
                      valueSecond: 103.23,
                      status: "ctitical"
                    },
                    {
                      name: "Дебаланс",
                      valueFirst: 30,
                      valueSecond: 1.27,
                      status: "normal"
                    },
                    {
                      name: "Допустимый дебаланс",
                      valueFirst: 15,
                      valueSecond: 103.23,
                      status: "default"
                    },
                    {
                      name: "Отклонение",
                      valueFirst: 0,
                      valueSecond: 0,
                      status: "normal"
                    }
                  ]                  
                },
            tanker: [
              {
                nameTanker: "bus", shipped: false
              },
              {
                nameTanker: "pipe", shipped: true
              },
              {
                nameTanker: "train", shipped: true
              },
            ]
          },
          {
            id: 2,
            nameStorage: "510",
            valueStorage: 10253,
            tank: {
                  timeStart:"020320",
                  timeEnd:"040838",
                  tankValue: [
                    {
                      name: "Отгружено по резервуару",
                      valueFirst: 1670,
                      valueSecond: 98.73,
                      status: "normal"
                    },
                    {
                      name: "По данным отгрузки",
                      valueFirst: 1700,
                      valueSecond: 103.23,
                      status: "normal"
                    },
                    {
                      name: "Дебаланс",
                      valueFirst: 30,
                      valueSecond: 1.27,
                      status: "normal"
                    },
                    {
                      name: "Допустимый дебаланс",
                      valueFirst: 15,
                      valueSecond: 103.23,
                      status: "normal"
                    },
                    {
                      name: "Отклонение",
                      valueFirst: 0,
                      valueSecond: 0,
                      status: "normal"
                    }
                  ]                  
                },
            tanker: [
              {
                nameTanker: "bus", shipped: false
              },
              {
                nameTanker: "pipe", shipped: true
              },
              {
                nameTanker: "train", shipped: false
              },
            ]
          },
          {
            id: 3,
            nameStorage: "519",
            valueStorage: 10253,
            tank: {
                  timeStart:"020320",
                  timeEnd:"040838",
                  tankValue: [
                    {
                      name: "Отгружено по резервуару",
                      valueFirst: 1670,
                      valueSecond: 98.73,
                      status: "normal"
                    },
                    {
                      name: "По данным отгрузки",
                      valueFirst: 1700,
                      valueSecond: 103.23,
                      status: "normal"
                    },
                    {
                      name: "Дебаланс",
                      valueFirst: 30,
                      valueSecond: 1.27,
                      status: "default"
                    },
                    {
                      name: "Допустимый дебаланс",
                      valueFirst: 15,
                      valueSecond: 103.23,
                      status: "normal"
                    },
                    {
                      name: "Отклонение",
                      valueFirst: 0,
                      valueSecond: 0,
                      status: "normal"
                    }
                  ]                  
                },
            tanker: [
              {
                nameTanker: "bus", shipped: true
              },
              {
                nameTanker: "pipe", shipped: false
              },
              {
                nameTanker: "train", shipped: false
              },
            ]
          },
          {
            id: 4,
            nameStorage: "579",
            valueStorage: 10253,
            tank: {
                  timeStart:"020320",
                  timeEnd:"040838",
                  tankValue: [
                    {
                      name: "Отгружено по резервуару",
                      valueFirst: 1670,
                      valueSecond: 98.73,
                      status: "normal"
                    },
                    {
                      name: "По данным отгрузки",
                      valueFirst: 1700,
                      valueSecond: 103.23,
                      status: "normal"
                    },
                    {
                      name: "Дебаланс",
                      valueFirst: 30,
                      valueSecond: 1.27,
                      status: "default"
                    },
                    {
                      name: "Допустимый дебаланс",
                      valueFirst: 15,
                      valueSecond: 103.23,
                      status: "normal"
                    },
                    {
                      name: "Отклонение",
                      valueFirst: 0,
                      valueSecond: 0,
                      status: "normal"
                    }
                  ]                  
                },
            tanker: [
              {
                nameTanker: "bus", shipped: true
              },
              {
                nameTanker: "pipe", shipped: false
              },
              {
                nameTanker: "train", shipped: false
              },
            ]
          },

        ]
      },

      {
        name: "ДТ сорт A",
        value: 12132,
      
        storage: [
          {
            id: 1,
            nameStorage: "415",
            valueStorage: 10253,
            tank: {
                  timeStart:"020320",
                  timeEnd:"040838",
                  tankValue: [
                    {
                      name: "Отгружено по резервуару",
                      valueFirst: 1670,
                      valueSecond: 98.73,
                      status: "normal"
                    },
                    {
                      name: "По данным отгрузки",
                      valueFirst: 1700,
                      valueSecond: 103.23,
                      status: "ctitical"
                    },
                    {
                      name: "Дебаланс",
                      valueFirst: 30,
                      valueSecond: 1.27,
                      status: "normal"
                    },
                    {
                      name: "Допустимый дебаланс",
                      valueFirst: 15,
                      valueSecond: 103.23,
                      status: "default"
                    },
                    {
                      name: "Отклонение",
                      valueFirst: 0,
                      valueSecond: 0,
                      status: "normal"
                    }
                  ]                  
                },
            tanker: [
              {
                nameTanker: "bus", shipped: false
              },
              {
                nameTanker: "pipe", shipped: true
              },
              {
                nameTanker: "train", shipped: true
              },
            ]
          },
          {
            id: 2,
            nameStorage: "510",
            valueStorage: 10253,
            tank: {
                  timeStart:"020320",
                  timeEnd:"040838",
                  tankValue: [
                    {
                      name: "Отгружено по резервуару",
                      valueFirst: 1670,
                      valueSecond: 98.73,
                      status: "normal"
                    },
                    {
                      name: "По данным отгрузки",
                      valueFirst: 1700,
                      valueSecond: 103.23,
                      status: "normal"
                    },
                    {
                      name: "Дебаланс",
                      valueFirst: 30,
                      valueSecond: 1.27,
                      status: "normal"
                    },
                    {
                      name: "Допустимый дебаланс",
                      valueFirst: 15,
                      valueSecond: 103.23,
                      status: "normal"
                    },
                    {
                      name: "Отклонение",
                      valueFirst: 0,
                      valueSecond: 0,
                      status: "normal"
                    }
                  ]                  
                },
            tanker: [
              {
                nameTanker: "bus", shipped: false
              },
              {
                nameTanker: "pipe", shipped: true
              },
              {
                nameTanker: "train", shipped: false
              },
            ]
          },
         
        ]
      },

      {
        name: "ДТ сорт Г",
        value: 12132,
       
        storage: [
          {
            id: 1,
            nameStorage: "415",
            valueStorage: 10253,
            tank: {
                  timeStart:"020320",
                  timeEnd:"040838",
                  tankValue: [
                    {
                      name: "Отгружено по резервуару",
                      valueFirst: 1670,
                      valueSecond: 98.73,
                      status: "normal"
                    },
                    {
                      name: "По данным отгрузки",
                      valueFirst: 1700,
                      valueSecond: 103.23,
                      status: "ctitical"
                    },
                    {
                      name: "Дебаланс",
                      valueFirst: 30,
                      valueSecond: 1.27,
                      status: "normal"
                    },
                    {
                      name: "Допустимый дебаланс",
                      valueFirst: 15,
                      valueSecond: 103.23,
                      status: "default"
                    },
                    {
                      name: "Отклонение",
                      valueFirst: 0,
                      valueSecond: 0,
                      status: "normal"
                    }
                  ]                  
                },
            tanker: [
              {
                nameTanker: "bus", shipped: false
              },
              {
                nameTanker: "pipe", shipped: true
              },
              {
                nameTanker: "train", shipped: true
              },
            ]
          },
          {
            id: 2,
            nameStorage: "510",
            valueStorage: 10253,
            tank: {
                  timeStart:"020320",
                  timeEnd:"040838",
                  tankValue: [
                    {
                      name: "Отгружено по резервуару",
                      valueFirst: 1670,
                      valueSecond: 98.73,
                      status: "normal"
                    },
                    {
                      name: "По данным отгрузки",
                      valueFirst: 1700,
                      valueSecond: 103.23,
                      status: "normal"
                    },
                    {
                      name: "Дебаланс",
                      valueFirst: 30,
                      valueSecond: 1.27,
                      status: "normal"
                    },
                    {
                      name: "Допустимый дебаланс",
                      valueFirst: 15,
                      valueSecond: 103.23,
                      status: "normal"
                    },
                    {
                      name: "Отклонение",
                      valueFirst: 0,
                      valueSecond: 0,
                      status: "normal"
                    }
                  ]                  
                },
            tanker: [
              {
                nameTanker: "bus", shipped: false
              },
              {
                nameTanker: "pipe", shipped: true
              },
              {
                nameTanker: "train", shipped: false
              },
            ]
          },
          {
            id: 3,
            nameStorage: "519",
            valueStorage: 10253,
            tank: {
                  timeStart:"020320",
                  timeEnd:"040838",
                  tankValue: [
                    {
                      name: "Отгружено по резервуару",
                      valueFirst: 1670,
                      valueSecond: 98.73,
                      status: "normal"
                    },
                    {
                      name: "По данным отгрузки",
                      valueFirst: 1700,
                      valueSecond: 103.23,
                      status: "normal"
                    },
                    {
                      name: "Дебаланс",
                      valueFirst: 30,
                      valueSecond: 1.27,
                      status: "default"
                    },
                    {
                      name: "Допустимый дебаланс",
                      valueFirst: 15,
                      valueSecond: 103.23,
                      status: "normal"
                    },
                    {
                      name: "Отклонение",
                      valueFirst: 0,
                      valueSecond: 0,
                      status: "normal"
                    }
                  ]                  
                },
            tanker: [
              {
                nameTanker: "bus", shipped: true
              },
              {
                nameTanker: "pipe", shipped: false
              },
              {
                nameTanker: "train", shipped: false
              },
            ]
          },

        ]
      },
    
    ]
  }

  storageXY = [
    {
      x: 400 , y: 220
    },
    {
      x: 450 , y: 300
    },
    {
      point: 3, x: 510 , y: 420
    },
    {
      x: 450 , y: 620
    },
    {
      x: 400 , y: 690
    },
  ]

  productXY = [
    {
      point: 1, x: 200 , y: 220
    },
    {
      point: 2, x: 260 , y: 300
    },
    {
      point: 3, x: 320 , y: 420
    },
    {
      point: 4, x: 260 , y: 620
    },
    {
      point: 5, x: 200 , y: 700
    },
  ]

  public title;
  public code;
  public units;
  public name;

  public indexProduct = 0;
  public indexStorage = 0;
  public indexPie = 0;

  public pieStart = 3;
  public pieEnd = 3;

  public pieStartStorage = 3;
  public pieEndStorage = 3;

  public rectYHeight = 370;

  public countClickChange = 0;
  public countClickChangeStorage = 0;

  public newArrayProduct = [];
  public newArrayStorage = [];

  public indexTestProduct = 0;
  public indexTestStorage = 0;

  public indexData = 0;

  public maxPage;
  public currentPage = 3;

  public activeStorage;
  public activeProduct = [];

  public htmlProduct;
  public htmlStorage;
  public htmlDataStorage = [];


  constructor(
    public widgetService: NewWidgetService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string
  ) { 
    this.subscriptions.push(this.widgetService.getWidgetChannel(this.id).subscribe(data => {
      this.title = data.title;
      this.code = data.code;
      this.units = data.units;
      this.name = data.name;
    }));
    this.maxPage = this.data.product[2].storage.length;
    this.activeProduct = this.data.product;
    if(this.activeProduct[2].storage.length < 3){
      this.activeStorage = this.activeProduct[2].storage[1];
    }else if(this.activeProduct[2].storage.length < 2){
      this.activeStorage = this.activeProduct[2].storage[0];
    }
    else{
      this.activeStorage = this.activeProduct[2].storage[2];
    }

  }
  public test = false;

  ngOnInit() {

  }

  ngAfterViewInit(){
    if(!this.isMock){
      debugger
    //  let test = document.getElementById("test");
    //  this.newWidth = test.clientWidth;
    //  this.drawOilControl();
    }
  }

 

  @HostListener('document:resize', ['$event'])
  private OnResize(event) {
    if(!this.isMock){
      debugger
      let test = document.getElementById("test");
      this.newWidth = test.clientWidth;
      if(this.test){
        this.clearOilControl();
      }
      this.drawOilControl();
      this.test = true;
    }
   
    //подумтаь над изменениемм ширины блока...
  }

  public drawOilControl(){
    debugger
    this.drawPicture(this.oilIcon.nativeElement);
    this.drawBak(this.oilBak.nativeElement);
    this.FilterCircle(this.indexTestProduct);
  }

  public clearOilControl(){
    this.oilIcon.nativeElement.remove();
    this.oilBak.nativeElement.remove();
  }

  componentDidMount() {

    new LeaderLine(document.getElementById('start'),
                   document.getElementById('end'));
  }

  public drawPicture(el){
    let canvas = d3.select(el).append("svg")
        .attr("min-width", "100px")
        .attr("height", "100%")
        .attr("width","100%")
        .attr("class", "textProduct")
        .attr("viewBox", "0 0 350 140");

    let x1 = -100;
    let x2 = -80;
    let x3 = -48;
    let x4 = -48;

    let tug = "./assets/pic/Icons3D/Tug.png";
    let tube = "./assets/pic/Icons3D/Tube.png";
    let cis = "./assets/pic/Icons3D/Cistern.png";

    for(let item of this.activeStorage.tanker){
     
      if(item.shipped === true){

        let pictureContainer = canvas.append("image")
          .attr("xlink:href", "./assets/pic/OilControl/oil_icon.svg")
          .attr("height", "140px")
          .attr("width", "105px")
          .attr("class", "textProduct")
          .attr("x", x1+110)
          .attr("y", "10");

        let pictureIcon= canvas.append("image")
            .attr("xlink:href", (item.nameTanker === "Tug") ? tug : (item.nameTanker === "Tube") ? tube : cis)
            .attr("height", "60px")
            .attr("width", "60px")
            .attr("class", "textProduct")
            .attr("x", x2+110)
            .attr("y", "65");

        let planText1 = canvas.append("text")
            .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
            .attr("font-size", "10px")
            .attr("x", x3+110)
            .attr("class", "textProduct")
            .attr("y", "40")
            .attr("text-anchor","middle")
            .attr("fill", "#8c99b2")
            .text(item.title);
    
        let valueText1 = canvas.append("text")
            .attr("font-family","Tahoma bold")
            .attr("font-size", "14px")
            .attr("x", x4+110)
            .attr("y", "60")
            .attr("class", "textProduct")
            .attr("text-anchor","middle")
            .attr("fill", "#a2e2ff")
            .text(item.value);

        x1+=110;
        x2+=110;
        x3+=110;
        x4+=110;
      }
    }

  }

  public drawOnCircle(el, pieStart, pieEnd, pieStartStorage, pieEndStorage, data, dataStorage){
    let svg = d3.select(el.firstElementChild);

    this.activeProduct = data;

    if(dataStorage.length < 3){
      this.activeStorage = dataStorage[1];
    }else if(dataStorage.length < 2){
      this.activeStorage = dataStorage[0];
    }
    else{
      this.activeStorage = dataStorage[2];
    }
    
    const leftBorder:any = el.querySelectorAll('.st5');
    const Circle:any = el.querySelectorAll('.st6');
    const rightBorder:any = el.querySelectorAll('.st7');

    const leftBorderC:any = el.querySelectorAll('.st5-critical');
    const CircleC:any = el.querySelectorAll('.st6-critical');
    const rightBorderC:any = el.querySelectorAll('.st7-critical');

  
    if(this.activeStorage.status === "critical"){
      let operations = svg.append("text")
      .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "31px")
      .attr("x", "100")
      .attr("y", "390")
      .attr("text-anchor","middle")
      .attr("fill", "#a2e2ff")
      .attr("class", "textProduct")
      .text("Операций");

    let operationsValues = svg.append("text")
      .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "31px")
      .attr("x", "100")
      .attr("y", "430")
      .attr("text-anchor","middle")
      .attr("class", "textProduct")
      .attr("fill", "#a2e2ff")
      .text(this.data.operations);

    let critical = svg.append("text")
      .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "31px")
      .attr("x", "100")
      .attr("y", "480")
      .attr("text-anchor","middle")
      .attr("fill", "orange")
      .attr("class", "textProduct")
      .text("Отклонений");

      let ctiticalValuues = svg.append("text")
      .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "31px")
      .attr("x", "100")
      .attr("y", "520")
      .attr("text-anchor","middle")
      .attr("class", "textProduct")
      .attr("fill", "orange")
      .text(this.data.criticalOperations);

      for(let item of leftBorder){
     
        item.classList.remove("st5");
        item.classList.add("st5-critical");
      }
      for(let item of Circle){
    
        item.classList.remove("st6");
        item.classList.add("st6-critical");
      }
      for(let item of rightBorder){
        
        item.classList.remove("st7");
        item.classList.add("st7-critical");
      }
    }else{
      let middleText3 = svg.append("text")
      .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "32px")
      .attr("x", "100")
      .attr("y", "420")
      .attr("text-anchor","middle")
      .attr("fill", "#a2e2ff")
      .attr("class", "textProduct")
      .text("Операций");

    let middleText4 = svg.append("text")
      .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "42px")
      .attr("x", "100")
      .attr("y", "500")
      .attr("text-anchor","middle")
      .attr("class", "textProduct")
      .attr("fill", "#a2e2ff")
      .text(this.data.operations);

      for(let item of leftBorderC){
    
        item.classList.remove("st5-critical");
        item.classList.add("st5");
      }
      for(let item of CircleC){
  
        item.classList.remove("st6-critical");
        item.classList.add("st6");
      }
      for(let item of rightBorderC){

        item.classList.remove("st7-critical");
        item.classList.add("st7");
      }
    }

    this.maxPage = dataStorage.length;
  

    let indexPies = this.indexPie;
    let indexPies1 = this.indexPie;

    let newProductXY = [];
    let newStorageXY = [];

    

   
    for(let i = pieStartStorage; i <= pieEndStorage; i++){
      newStorageXY.push(this.storageXY[i]);
    }
    
    for(let i = pieStart; i <= pieEnd; i++){
      newProductXY.push(this.productXY[i]);
    }

    for(let pie of newProductXY){

      let indexProducts = this.indexProduct;

      for(let textProduct of data){
        
        if(indexPies === indexProducts){
          if(pie.point === 3){
            if(textProduct.criticalValue){
                let valueBadText = svg.append("text")
              .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
              .attr("font-size", "36px")
              .attr("x", pie.x)
              .attr("y", pie.y-20)
              .attr("text-anchor","middle")
              .attr("fill", "white")
              .attr("class", "textProduct")
              .text(textProduct.name);

                let middleText2 = svg.append("text")
              .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
              .attr("font-size", "36px")
              .attr("x", pie.x)
              .attr("y", pie.y + 40)
              .attr("text-anchor","middle")
              .attr("fill", "white")
              .attr("class", "textProduct")
              .text(textProduct.value);

              let middleText3 = svg.append("text")
              .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
              .attr("font-size", "28px")
              .attr("x", pie.x)
              .attr("y", pie.y + 100)
              .attr("text-anchor","middle")
              .attr("fill", "orange")
              .attr("class", "textProduct")
              .text(textProduct.criticalValue);


              this.indexData = indexProducts;
            }else{
              let valueBadText = svg.append("text")
              .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
              .attr("font-size", "32px")
              .attr("x", pie.x)
              .attr("y", pie.y)
              .attr("text-anchor","middle")
              .attr("fill", "white")
              .attr("class", "textProduct")
              .text(textProduct.name);
  
                let middleText2 = svg.append("text")
              .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
              .attr("font-size", "40px")
              .attr("x", pie.x)
              .attr("y", pie.y + 80)
              .attr("text-anchor","middle")
              .attr("fill", "#a2e2ff")
              .attr("class", "textProduct")
              .text(textProduct.value);
              this.indexData = indexProducts;
            }
          }else{
            let valueGoodText = svg.append("text")
            .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
            .attr("font-size", "32px")
            .attr("x", pie.x)
            .attr("y", pie.y)
            .attr("text-anchor","middle")
            .attr("fill", "#a2e2ff")
            .attr("cursor","pointer")
            .attr("class", "textProduct")
            .text(textProduct.name)
            .on("click", ()=>{
              this.onButtonChangeProduct(textProduct.name);
            });
            this.htmlProduct = textProduct.name;
          }
        }
        indexProducts++;
      }
        indexPies++;
    }

    
    for(let pie of newStorageXY){
      let indexStorage = this.indexStorage;
      for(let textStorage of dataStorage){
        if(indexPies1 === indexStorage){
          if(pie.point === 3){
            let valueBadText = svg.append("text")
            .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
            .attr("font-size", "32px")
            .attr("x", pie.x)
            .attr("y", pie.y)
            .attr("text-anchor","middle")
            .attr("fill", "white")
            .attr("class", "textValues")
            .text(textStorage.nameStorage);

            let middleText2 = svg.append("text")
          .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
          .attr("font-size", "40px")
          .attr("x", pie.x)
          .attr("y", pie.y + 80)
          .attr("text-anchor","middle")
          .attr("fill", "#a2e2ff")
          .attr("class", "textValues")
          .text(textStorage.valueStorage);
           
          }else{
            let valueGoodText = svg.append("text")
            .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
            .attr("font-size", "32px")
            .attr("x", pie.x)
            .attr("y", pie.y)
            .attr("text-anchor","middle")
            .attr("fill", "#a2e2ff")
            .attr("cursor","pointer")
            .attr("class", "textValues")
            .attr("id", indexStorage)
            .text(textStorage.nameStorage)
            .on("click", ()=>{
              this.onButtonChangeStorage(textStorage.id, dataStorage);
            });
           this.htmlDataStorage = dataStorage;
           this.htmlStorage = textStorage.nameStorage;
          }
        }
        indexStorage++;
      }
      indexPies1++;
    }


   
  }

  public drawBak(el){
   let canvas = d3.select(el).append("svg")
        .attr("min-width", "100px")
        .attr("height", "100%")
        .attr("width","100%")
        .attr("class", "textProduct")
        .attr("viewBox", "0 0 350 450");

    let pictureContainer = canvas.append("image")
        .attr("xlink:href", "./assets/pic/OilControl/Bak.png")
        .attr("height", "450px")
        .attr("width", "350px")
        .attr("x", "0")
        .attr("class", "textProduct")
        .attr("y", "0");
    let rect = canvas.append("rect")
        .attr("fill","#a2e2ff")
        .attr("opacity","0.5")
        .attr("height", this.activeStorage.tank.bakLevel*2.2)
        .attr("width", "260px")
        .attr("x", "63")
        .attr("class", "textProduct")
        .attr("y", this.rectYHeight-this.activeStorage.tank.bakLevel*2.2+10);

    let bakValue = canvas.append("text")
        .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
        .attr("font-size", "38px")
        .attr("x", "190")
        .attr("y", "100")
        .attr("text-anchor","middle")
        .attr("class", "textProduct")
        .attr("fill", "white")
        .text(this.activeStorage.tank.tankValue[0].valueFirst); 

  }


  public onButtonChangeProduct(index){
    this.clearProduct();
    let dataStorages;
    if(this.countClickChange === 0 ){
      this.changeMassiv(index, this.data.product );
      this.FilterStorageCircle(this.newArrayProduct[2], this.indexTestStorage = 0);
      this.countClickChange++;
    }else{
      this.changeMassiv(index, this.newArrayProduct);
      this.FilterStorageCircle(this.newArrayProduct[2], this.indexTestStorage = 0);
    }
    
    for(let item of this.newArrayProduct[2].storage){
      if(this.newArrayProduct[2].storage.length < 4){
        this.currentPage = 2;
      }else {  this.currentPage = 3; }
    }
  
    this.drawOnCircle(this.oilCircle.nativeElement, this.pieStart, this.pieEnd, this.pieStartStorage, this.pieEndStorage, this.newArrayProduct, this.newArrayProduct[2].storage);
    this.drawBak(this.oilBak.nativeElement);
    this.drawPicture(this.oilIcon.nativeElement);
  }

  public onNextStorage(event){

    if(this.countClickChange === 0){
      for(let item of this.data.product[2].storage){
        
        if(item.id === event){
          if(this.countClickChangeStorage === 0){
            this.onButtonChangeStorage(item.id,  this.data.product[2].storage);
         
          }else{
            this.onButtonChangeStorage(item.id,  this.htmlDataStorage);
           
          }
        }
      }
    }else{
      for(let item of this.htmlDataStorage){

        if(item.id === event){
            this.onButtonChangeStorage(item.id,  this.htmlDataStorage);
        }
      }
    }
   
   
  }

  public onButtonChangeStorage(index, data){

    this.currentPage = index;
    this.clearProduct();
   
    if(this.countClickChange === 0){
      if(this.countClickChangeStorage === 0 ){
        this.changeMassivStorage(index, data);
        this.countClickChangeStorage++;
      }else{
        this.changeMassivStorage(index, data);
      }
      this.drawOnCircle(this.oilCircle.nativeElement, this.pieStart, this.pieEnd, this.pieStartStorage, this.pieEndStorage, this.data.product, this.newArrayStorage);
    }else{
      if(this.countClickChangeStorage === 0 ){
        this.changeMassivStorage(index, data);
        this.countClickChangeStorage++;
      }else{
        this.changeMassivStorage(index, data);
      }
      this.drawOnCircle(this.oilCircle.nativeElement, this.pieStart, this.pieEnd, this.pieStartStorage, this.pieEndStorage, this.newArrayProduct, this.newArrayStorage);
    }
    this.drawBak(this.oilBak.nativeElement);
    this.drawPicture(this.oilIcon.nativeElement);
  }
  
  public clearStorage(){
    let clears = document.querySelectorAll('.textValues');
    clears.forEach(el => el.remove());
  }

  public clearProduct(){
    this.clearStorage();
    let clears = document.querySelectorAll('.textProduct');
    clears.forEach(el => el.remove());
  }

  public changeMassiv(el, data){
    let lengthData = data.length;
    let move;
    let indexProduct = 0;
    let newIndexProduct = 0;
    for(let item of data){
      indexProduct++;
        if(item.name === el){
          if(indexProduct > 2){
            move = "next";
            if(data.length === 5){
              lengthData = lengthData - 1;
            }
            newIndexProduct = lengthData - indexProduct;
            if(indexProduct === 1){
              newIndexProduct = 2;
              this.shiftMassiv( newIndexProduct, move);
            }else{
              newIndexProduct = 1;
              this.shiftMassiv( newIndexProduct, move);
            }
          }
          else{
            move = "prev";
            if(data.length === 5){
              lengthData = lengthData - 1;
            }
            newIndexProduct = lengthData - indexProduct;
            if( newIndexProduct < 3){
              newIndexProduct = 1;
              this.shiftMassiv( newIndexProduct, move);
            }else{
              newIndexProduct = 2;
              this.shiftMassiv( newIndexProduct, move);
            }
          }
  
        }
      }
  }

  public changeMassivStorage(el, data){
    let move;
    let lengthData = data.length;
    let indexProduct = 0;
    let newIndexProduct = 0;
    for(let item of data){
      indexProduct++;
        if(item.id === el){
   
          if(indexProduct > 2){
            move = "next";
            if(data.length === 5){
              lengthData = lengthData - 1;
            }
            newIndexProduct = lengthData - indexProduct;
            if(newIndexProduct === 0){
              newIndexProduct = 1;
              this.shiftMassivStorage( newIndexProduct, move, data);
            }else{
              newIndexProduct = 2;
              this.shiftMassivStorage( newIndexProduct, move, data);
            }
          }
          else{
            move = "prev";
            if(data.length === 5){
              lengthData = lengthData - 1;
            }
            newIndexProduct = lengthData - indexProduct;
            if( newIndexProduct < 3){
              newIndexProduct = 1;
              this.shiftMassivStorage( newIndexProduct, move, data);
            }else{
              newIndexProduct = 2;
              this.shiftMassivStorage( newIndexProduct, move, data);
            }
          }
  
        }
      }
  }

  public shiftMassiv(el, move){
    if(this.countClickChange === 0){
      this.newArrayProduct = [...this.data.product];
    }else{
      this.newArrayProduct = [...this.newArrayProduct];
    }
    if(move === "prev"){
      for(let i=0; i < el; i++){
        this.newArrayProduct.unshift(this.newArrayProduct.pop());
      }
    }else{
      for(let i=0; i < el; i++){
        this.newArrayProduct.push(this.newArrayProduct.shift());
      }
    }
  } 

  public shiftMassivStorage(el, move, data){


    if(this.countClickChangeStorage === 0){
      this.newArrayStorage = [...data];
    }else{
      this.newArrayStorage = [...data];
    }
    if(move === "prev"){
      for(let i=0; i < el; i++){
        this.newArrayStorage.unshift(this.newArrayStorage.pop());
      }
    }else{
      for(let i=0; i < el; i++){
        this.newArrayStorage.push(this.newArrayStorage.shift());
      }
    }
  } 

  public FilterCircle(el){
    if(this.data.product[el+1] === undefined && el === 0){
     this.pieEnd = 2;
    this.pieStart = 2;
    this.FilterStorageCircle(this.data.product[el], this.indexTestStorage)
      return this.drawOnCircle(this.oilCircle.nativeElement, this.pieStart,  this.pieEnd, this.pieStartStorage, this.pieEndStorage, this.data.product, this.data.product[2].storage);
    }else if(this.data.product[el+1] !== undefined && el < 3){
     this.pieStart =  this.pieStart - 1;
      this.indexTestProduct++;
      return this.FilterCircle(this.indexTestProduct);
    }else if(this.data.product[el+1] === undefined && el === 3){
      this.pieStart = 0;
      this.pieEnd = 3;
      this.FilterStorageCircle(this.data.product[el-1], this.indexTestStorage)
      return this.drawOnCircle(this.oilCircle.nativeElement, this.pieStart,  this.pieEnd, this.pieStartStorage, this.pieEndStorage, this.data.product, this.data.product[2].storage);
    }else if(this.data.product[el+1] === undefined){
      this.FilterStorageCircle(this.data.product[el-1], this.indexTestStorage)
      return this.drawOnCircle(this.oilCircle.nativeElement,  this.pieStart,  this.pieEnd, this.pieStartStorage, this.pieEndStorage, this.data.product, this.data.product[2].storage);
    }
    else{
      this.pieStart = 0;
      this.pieEnd = 4;
      this.FilterStorageCircle(this.data.product[el-2], this.indexTestStorage)
      return this.drawOnCircle(this.oilCircle.nativeElement, this.pieStart,  this.pieEnd, this.pieStartStorage, this.pieEndStorage, this.data.product, this.data.product[2].storage);
    }
  }

  public FilterStorageCircle(data, el){

    this.pieStartStorage = 2;
    if(data.storage[el+1] === undefined && el === 0){
      this.pieEndStorage = 2;
      this.pieStartStorage = 2;
    }
    else if(data.storage[el+1] !== undefined && el < 3){
      this.pieStartStorage =  this.pieStartStorage - 1;
       this.indexTestStorage++;
       return this.FilterStorageCircle(data, this.indexTestStorage);
     }
     else if(data.storage[el+1] === undefined && el === 3){
      this.pieStartStorage = 0;
      this.pieEndStorage = 3;
    }else if(data.storage[el+1] === undefined){
      this.pieStartStorage =  this.pieStartStorage - 1;
      this.pieEndStorage = 3;
    }
    else{
      this.pieStartStorage = 0;
      this.pieEndStorage = 4;
    }
  }

}

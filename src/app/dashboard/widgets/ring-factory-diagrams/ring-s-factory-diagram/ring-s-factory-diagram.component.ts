import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewUserSettingsService } from 'src/app/dashboard/services/new-user-settings.service';
import { NewWidgetService } from 'src/app/dashboard/services/new-widget.service';



@Component({
  selector: 'evj-ring-s-factory-diagram',
  templateUrl: './ring-s-factory-diagram.component.html',
  styleUrls: ['./ring-s-factory-diagram.component.scss']
})
export class RingSFactoryDiagramComponent implements OnInit {

  static itemCols = 34;
  static itemRows = 16;

  datas = [
    { 
      id:1, title:'Комплекс атмосферно-вакуумной переработки нефти и газофракционирования', typeFabric: 0,
            value: [
              { name:'ЭЛОУ-АВТ-6', valueOne: 100, valueTwo: 100 },
              { name:'ГФУ-2', valueOne: 100, valueTwo: 100 },
            ],
            buttons: [ ]
  },
  { 
    id:2, title:'Комплекс атмосферно-вакуумной переработки нефти, висбрекинга и стабилизации бензина', typeFabric: 1,
          value: [
            { name:'АВТ-3', valueOne: 89, valueTwo: 100 },
            { name:'ЭЛОУ-2', valueOne: 100, valueTwo: 100 },
            { name:'Висбрекинг', valueOne: 79, valueTwo: 92 },
            { name:'Л-22/4', valueOne: 100, valueTwo: 100 },
          ],
          buttons: [
            {typeButton:1, critical:1, notcritical:2},
            {typeButton:4, critical:3, notcritical:7},
          ]
  },
  { 
    id:3, title:'Комплекс гидроочистки дизельного топлива и каталитического риформирования', typeFabric: 2,
          value: [
            { name:'ЭЛОУ-АВТ-6', valueOne: 100, valueTwo: 100 },
            { name:'ГФУ-2', valueOne: 100, valueTwo: 100 },
            { name:'Висбрекинг', valueOne: 79, valueTwo: 92 },
            { name:'Л-22/4', valueOne: 100, valueTwo: 100 },
          ],
          buttons: [
            {typeButton:1, critical:2, notcritical:2},
            {typeButton:2, critical:2, notcritical:2},
            {typeButton:4, critical:3, notcritical:7},
            {typeButton:5, critical:3, notcritical:7},
           ]
  },
  { 
    id:4, title:'Комплекс атмосферно-вакуумной переработки нефти и газофракционирования', typeFabric: 3,
          value: [
            { name:'ЭЛОУ-АВТ-6', valueOne: 100, valueTwo: 100 },
            { name:'ГФУ-2', valueOne: 100, valueTwo: 100 },
            { name:'Висбрекинг', valueOne: 100, valueTwo: 100 },
            { name:'Л-22/4', valueOne: 100, valueTwo: 100 },
          ],
          buttons: [ ]
},
{ 
  id:5, title:'Комплекс атмосферно-вакуумной переработки нефти и газофракционирования', typeFabric: 4,
        value: [
          { name:'ЭЛОУ-АВТ-6', valueOne: 100, valueTwo: 100 },
          { name:'ГФУ-2', valueOne: 100, valueTwo: 100 },
        ],
        buttons: [ ]
},
{ 
  id:6, title:'Комплекс гидроочистки дизельного топлива и каталитического риформирования', typeFabric: 5,
        value: [
          { name:'ЭЛОУ-АВТ-6', valueOne: 100, valueTwo: 100 },
          { name:'ГФУ-2', valueOne: 100, valueTwo: 100 },
          { name:'Висбрекинг', valueOne: 79, valueTwo: 92 },
          { name:'Л-22/4', valueOne: 100, valueTwo: 100 },
        ],
        buttons: [
          {typeButton:1, critical:2, notcritical:2},
          {typeButton:5, critical:3, notcritical:7},
         ]
},
];


  private subscription: Subscription;

  public title="test";
  public code;
  public units;
  public name;

  constructor(
    public widgetService: NewWidgetService,
    public serice: NewUserSettingsService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string
  ) { 
    this.subscription = this.widgetService.getWidgetChannel(this.id).subscribe(data => {
      this.title = data.title;
      this.code = data.code;
      this.units = data.units;
      this.name = data.name;

    }); 
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

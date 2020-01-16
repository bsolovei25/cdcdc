import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewUserSettingsService } from 'src/app/dashboard/services/new-user-settings.service';
import { NewWidgetService } from 'src/app/dashboard/services/new-widget.service';
import { RingFactoryWidget } from '../../../models/widget.model';



@Component({
  selector: 'evj-ring-s-factory-diagram',
  templateUrl: './ring-s-factory-diagram.component.html',
  styleUrls: ['./ring-s-factory-diagram.component.scss']
})
export class RingSFactoryDiagramComponent implements OnInit {

  static itemCols = 34;
  static itemRows = 16;

  datas: RingFactoryWidget[] = [{
    id: '1',
    title: 'Комплекс атмосферно-вакуумной переработки нефти и газофракционирования', typeFabric: 0,
    values: [
      { name: 'ЭЛОУ-АВТ-6', plan: 100, fact: 100 },
      { name: 'ГФУ-2', plan: 100, fact: 100 },
    ],
    buttons: []
  },
  {
    id: '2',
    title: 'Комплекс атмосферно-вакуумной переработки нефти, висбрекинга и стабилизации бензина', typeFabric: 1,
    values: [
      { name: 'АВТ-3', plan: 89, fact: 100 },
      { name: 'ЭЛОУ-2', plan: 100, fact: 100 },
      { name: 'Висбрекинг', plan: 79, fact: 92 },
      { name: 'Л-22/4', plan: 100, fact: 100 },
    ],
    buttons: [
      { typeButton: 1, critical: 1, notCritical: 2 },
      { typeButton: 4, critical: 3, notCritical: 7 },
    ]
  },
  {
    id: '3',
    title: 'Комплекс гидроочистки дизельного топлива и каталитического риформирования', typeFabric: 2,
    values: [
      { name: 'ЭЛОУ-АВТ-6', plan: 100, fact: 100 },
      { name: 'ГФУ-2', plan: 100, fact: 100 },
      { name: 'Висбрекинг', plan: 79, fact: 92 },
      { name: 'Л-22/4', plan: 100, fact: 100 },
    ],
    buttons: [
      { typeButton: 1, critical: 2, notCritical: 2 },
      { typeButton: 2, critical: 2, notCritical: 2 },
      { typeButton: 4, critical: 3, notCritical: 7 },
      { typeButton: 5, critical: 3, notCritical: 7 },
    ]
  },
  {
    id: '4',
    title: 'Комплекс атмосферно-вакуумной переработки нефти и газофракционирования', typeFabric: 3,
    values: [
      { name: 'ЭЛОУ-АВТ-6', plan: 100, fact: 100 },
      { name: 'ГФУ-2', plan: 100, fact: 100 },
      { name: 'Висбрекинг', plan: 100, fact: 100 },
      { name: 'Л-22/4', plan: 100, fact: 100 },
    ],
    buttons: []
  },
  {
    id: '5',
    title: 'Комплекс атмосферно-вакуумной переработки нефти и газофракционирования', typeFabric: 4,
    values: [
      { name: 'ЭЛОУ-АВТ-6', plan: 100, fact: 100 },
      { name: 'ГФУ-2', plan: 100, fact: 100 },
    ],
    buttons: []
  },
  {
    id: '6',
    title: 'Комплекс гидроочистки дизельного топлива и каталитического риформирования', typeFabric: 5,
    values: [
      { name: 'ЭЛОУ-АВТ-6', plan: 100, fact: 100 },
      { name: 'ГФУ-2', plan: 100, fact: 100 },
      { name: 'Висбрекинг', plan: 79, fact: 92 },
      { name: 'Л-22/4', plan: 100, fact: 100 },
    ],
    buttons: [
      { typeButton: 1, critical: 2, notCritical: 2 },
      { typeButton: 5, critical: 3, notCritical: 7 },
    ]
  },
  ];

  private subscriptions: Subscription[] = [];

  public title;
  public code;
  public units;
  public name;

  constructor(
    public widgetService: NewWidgetService,
    public service: NewUserSettingsService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string,
    @Inject('uniqId') public uniqId: string
  ) {
    this.subscriptions.push(this.widgetService.getWidgetChannel(this.id).subscribe(data => {
      if (data) {
        this.title = data.title;
        this.code = data.code;
        this.units = data.units;
        this.name = data.name;
      }
    }));
  }

  ngOnInit() {
    if (!this.isMock) {
      this.subscriptions.push(this.widgetService.getWidgetLiveDataFromWS(this.id, 'ring-factory-diagram')
        .subscribe((ref) => {
          this.datas = ref.items;
        }));
    }
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      for (const subscription of this.subscriptions) {
        subscription.unsubscribe();
      }
    }
  }

}

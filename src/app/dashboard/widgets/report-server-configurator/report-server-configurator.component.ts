import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { IReferenceTypes } from '../../models/references';
import { NewWidgetService } from '../../services/new-widget.service';

@Component({
  selector: 'evj-report-server-configurator',
  templateUrl: './report-server-configurator.component.html',
  styleUrls: ['./report-server-configurator.component.scss']
})
export class ReportServerConfiguratorComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  static itemCols = 18;
  static itemRows = 14;

  public code: string;
  public title: string;
  public units: string = ' ';
  public previewTitle: string = 'default';
  public options;

  public valueCheck: boolean;
  public valueUniqCheck: boolean;

  public clickFio: boolean = true;
  public clickDate: boolean = false;

  isLongBlock: boolean = true;

  indexColumn: number = 0;

  public data: IReferenceTypes[] = [
      {
          id: 1,
          createdAt: new Date(),
          createdBy: new Date(),
          name: 'Професии',
          columns: [
              {
                  id: 1,
                  createdAt: new Date(),
                  createdBy: new Date(),
                  referenceTypeId: 1,
                  name: 'ФИО',
                  columnTypeId: 1,
                  columnName: 'ФИО',
                  isRequred: true,
                  isUnique: false,
              },
              {
                  id: 2,
                  createdAt: new Date(),
                  createdBy: new Date(),
                  referenceTypeId: 1,
                  name: 'Дата рождения',
                  columnTypeId: 1,
                  columnName: 'Дата рождения',
                  isRequred: false,
                  isUnique: true,
              },
          ],
      },
      {
          id: 2,
          createdAt: new Date(),
          createdBy: new Date(),
          name: 'Установки',
          columns: [
              {
                  id: 1,
                  createdAt: new Date(),
                  createdBy: new Date(),
                  referenceTypeId: 1,
                  name: 'Дата рождения',
                  columnTypeId: 1,
                  columnName: 'Дата рождения',
                  isRequred: false,
                  isUnique: false,
              },
          ],
      },
  ];

  public id: any = [];

  constructor(
      public widgetService: NewWidgetService,
      @Inject('isMock') public isMock: boolean,
      @Inject('widgetId') public id: string,
      @Inject('uniqId') public uniqId: string
  ) {
      this.subscriptions.push(
          this.widgetService.getWidgetChannel(id).subscribe((data) => {
              (this.code = data.code),
                  (this.title = data.title),
                  (this.options = data.widgetOptions);
          })
      );
  }

  ngOnInit(): void {
    for(let item of this.data){
      this.id.push(item.id);
    }
  }

  ngOnDestroy() {
      if (this.subscriptions) {
          for (const subscribe of this.subscriptions) {
              subscribe.unsubscribe();
          }
      }
  }

  onClickReference(data, index) {
      for (let item of this.data) {
          item.open = false;
      }

      data.open = true;
      this.indexColumn = index;
  }

  onClickItemReference(data) {
      data.open = !data.open;

      this.isLongBlock = true;
      for (let item of this.data[this.indexColumn].columns) {
          if (item.open) {
              this.isLongBlock = false;
          }
      }
  }

  changeSwap() {
      let check = <HTMLInputElement>document.getElementById('checkBoxValue');
      if (check.checked) {
          this.valueCheck = false;
      } else {
          this.valueCheck = true;
      }
  }

  changeUniqSwap() {
      let check = <HTMLInputElement>document.getElementById('checkBoxUniqValue');
      if (check.checked) {
          this.valueUniqCheck = false;
      } else {
          this.valueUniqCheck = true;
      }
  }

  onClickTitle(item: string): void {
      if (item === 'fio') {
          this.clickFio = true;
          this.clickDate = false;
      } else if (item === 'date') {
          this.clickFio = false;
          this.clickDate = true;
      }
  }

}

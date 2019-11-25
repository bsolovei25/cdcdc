import { Component, OnInit, Injector, Inject } from '@angular/core';
import {WIDGETS} from '../new-widgets-grid/widget-map';
import { NewWidgetService } from '../../services/new-widget.service';
import { WidgetModel } from '../../models/widget.model';
import { GridsterConfig, GridType, GridsterItem, GridsterItemComponentInterface } from 'angular-gridster2';
import { Subscription } from 'rxjs';
import { NewUserSettingsService } from '../../services/new-user-settings.service';

@Component({
  selector: 'evj-new-widgets-grid',
  templateUrl: './new-widgets-grid.component.html',
  styleUrls: ['./new-widgets-grid.component.scss']
})
export class NewWidgetsGridComponent implements OnInit {

  public readonly WIDGETS = WIDGETS;

  public options:GridsterConfig;

  model:WidgetModel;

  public indexWidget;

  public nameWidget;

  _injector: Injector;

  private subscription: Subscription;

  constructor(
    public widgetService: NewWidgetService, 
    public injector: Injector,
    public userSettings: NewUserSettingsService
   // @Inject('widgetId') public id: string
    ){
  //    this.subscription = this.widgetService.getWidgetChannel(id).subscribe(data => {
  //      this.nameWidget = data.widgetType;
   //   }); 
  }

  ngOnInit() {  
    
     this.userSettings.getUserData();
     debugger
  /*  this._injector = Injector.create({
      providers: [
        { provide: 'isMock', useValue: false},
        { provide: 'widgetId', useValue: "fdf9c372-06ce-11ea-98c5-d8d09033e35e"},
      ],
      parent: this.injector
    });
*/
    this.options = {
      gridType: GridType.Fixed,
      displayGrid: 'none',
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: true,
      enableEmptyCellDrag: false,
      enableOccupiedCellDrop: false,
      emptyCellClickCallback: this.emptyCellClick.bind(this),
      emptyCellContextMenuCallback: this.emptyCellMenuClick.bind(this),
      emptyCellDragCallback: this.emptyCellDragClick.bind(this),
      emptyCellDropCallback: this.emptyCellDropClick.bind(this),
      emptyCellDragMaxCols: 100000,
      emptyCellDragMaxRows: 100000,
      fixedColWidth: 20,
      fixedRowHeight: 20,
      maxItemCols:10000,
      maxItemRows:10000,
     // minRows:50,
    //  minCols:50,
   //   minItemRows: 2,
   //   minItemCols: 2,
      maxRows: 100000,
      maxCols: 100000,
      pushItems: true,
      draggable: {
        enabled: true,
        stop: this.eventStop.bind(this),
        start: this.eventStart.bind(this)
      },
      resizable: {
        delayStart: 0,
        enabled: true,
        start: this.eventStart.bind(this),
        stop: this.eventStop.bind(this),
        handles: {
          s: true,
          e: true,
          n: true,
          w: true,
          se: true,
          ne: true,
          sw: true,
          nw: true
        }
      }
    };
  }

  public getInjector = (idWidget: string): Injector => {
    return Injector.create({
      providers: [
        { provide: 'widgetId', useValue: idWidget},
        { provide: 'isMock', useValue: false},
      ],
      parent: this.injector
    });
  }

  public eventStart(item: GridsterItem, itemComponent: GridsterItemComponentInterface, e: MouseEvent) {
    if (!e) return;

    const dataTrasfer = new DataTransfer();
    e.currentTarget.dispatchEvent(new DragEvent('dragstart', { dataTransfer: dataTrasfer }));
 //   console.info('eventStart', item, itemComponent, event);
  }

  public dragStart(e: DragEvent, item: GridsterItem): void {
   // console.log(e);
    
    e.dataTransfer.setData('text/plain', item.toString());
    e.dataTransfer.dropEffect = 'copy';
    this.widgetService.draggingItem  = item;
  }

  public eventStop(item: GridsterItem, itemComponent: GridsterItemComponentInterface, e: MouseEvent) {
    if (!e) return;
    console.log(e);
    const dataTrasfer = new DataTransfer();
    e.currentTarget.dispatchEvent(new DragEvent('dragstop', { dataTransfer: dataTrasfer }));
    this.widgetService.draggingItem = null;
    this.userSettings.updateByPosition(item);
    
  }


  dragStartHandler(ev, i) {
    
    ev.dataTransfer.setData('text/plain', i);
    ev.dataTransfer.dropEffect = 'move';
  }

  changedOptions() {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  emptyCellClick(event: MouseEvent, item: GridsterItem) {
   // console.info('empty cell click', event, item);
    this.widgetService.dashboard.push(item);
  }

  emptyCellMenuClick(){
  //  console.log('emptyCellMenuClick');
  }

  emptyCellDragClick(){
   // console.log('this.emptyCellDragClick');
  }

  emptyCellDropClick(event: DragEvent, param){

    let idWidget = event.dataTransfer.getData("text");
   
    this.nameWidget = this.widgetService.getName(idWidget);

/*
    this.widgetService.dashboard.push({
      x: param.x, 
      y: param.y, 
      cols: WIDGETS[this.nameWidget].itemCols, 
      rows: WIDGETS[this.nameWidget].itemRows, 
      id: idWidget, 
      nameWidget: this.nameWidget 
    });
*/

this.userSettings.addCellByPosition(idWidget, this.nameWidget, param);
    
console.log('dash', this.widgetService.dashboard);
  }
}
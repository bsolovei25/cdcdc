import { Component, OnInit, Injector, Inject } from '@angular/core';
import {WIDGETS} from '../new-widgets-grid/widget-map';
import { NewWidgetService } from '../../services/new-widget.service';
import { WidgetModel } from '../../models/widget.model';
import { GridsterConfig, GridType, GridsterItem, GridsterItemComponentInterface, DisplayGrid } from 'angular-gridster2';
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
    ){ }

  ngOnInit() {
    this.userSettings.GetScreen();


    this.options = {

      gridType: GridType.Fixed,
      displayGrid: 'none',
      //swap: true,
      //swapWhileDragging: false,
      itemChangeCallback: this.itemChange.bind(this),
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
      itemResizeCallback: this.resizeGridsterElement.bind(this),
      fixedColWidth: 20,
      fixedRowHeight: 20,
      maxItemCols:10000,
      maxItemRows:10000,
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

  public resizeGridsterElement() {

    const event = new CustomEvent(
      'resize'
    );
    document.dispatchEvent(event);
  }

  public itemChange(item: GridsterItem, itemComponent: GridsterItemComponentInterface) {
   this.userSettings.updateByPosition(item, itemComponent.$item);

  // console.info('itemChanged', this.widgetService.dashboard);
  }

  

  public onSwap(swap:any){
    swap === true?this.options.swap=true:this.options.swap=false;
    swap === true?this.options.pushItems=true:this.options.pushItems=false;
    this.changedOptions();
  }

  public onGrid(grid:any){
   grid === true?this.options.displayGrid='none':this.options.displayGrid=DisplayGrid.Always;
    this.changedOptions();
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
  }

  public dragStart(e: DragEvent, item: GridsterItem): void {

    e.dataTransfer.setData('text/plain', item.toString());
    e.dataTransfer.dropEffect = 'copy';
    this.widgetService.draggingItem  = item;

  }

  public eventStop(item: GridsterItem, itemComponent: GridsterItemComponentInterface, e: MouseEvent) {
    if (!e) return;
    const dataTrasfer = new DataTransfer();
    e.currentTarget.dispatchEvent(new DragEvent('dragstop', { dataTransfer: dataTrasfer }));
    this.widgetService.draggingItem = null;
 //   this.userSettings.updateByPosition(item, itemComponent.$item);
  //  console.log("stop", this.widgetService.dashboard);
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
    this.widgetService.dashboard.push(item);
  }

  emptyCellMenuClick() {
  }

  emptyCellDragClick() {
  }

  emptyCellDropClick(event: DragEvent, param) {

    const idWidget = event.dataTransfer.getData("text");

    this.nameWidget = this.widgetService.getName(idWidget);

    this.userSettings.addCellByPosition(idWidget, this.nameWidget, param);

  }
}

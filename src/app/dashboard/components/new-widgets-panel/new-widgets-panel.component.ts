import { Component, OnInit, Injector, ChangeDetectionStrategy } from '@angular/core';
import { GridsterItem, GridsterConfig, GridType } from 'angular-gridster2';
import { NewWidgetService } from '../../services/new-widget.service';
import { Observable, Subscription } from 'rxjs';
import {WIDGETS} from '../new-widgets-grid/widget-map';
import { WidgetModel } from '../../models/widget.model';
import { Widgets } from '../../models/widget.model';
import { tick } from '@angular/core/testing';
import { NewUserSettingsService } from '../../services/new-user-settings.service';

@Component({
  selector: 'evj-new-widgets-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './new-widgets-panel.component.html',
  styleUrls: ['./new-widgets-panel.component.scss']
})
export class NewWidgetsPanelComponent implements OnInit {

  private subscription: Subscription;
 
  public event;
  public item;

  active = false;

  public readonly WIDGETS = WIDGETS;

  public options:GridsterConfig;

  dataW: Widgets;

  widgets: Widgets[];

  model:WidgetModel;

  _injector: Injector;

  massWidg = [WIDGETS];


  public test = [];
  constructor(
    public widgetService: NewWidgetService, 
    public injector: Injector,
    public userSettings: NewUserSettingsService
    ) {
    this.subscription = this.widgetService.getAvailableWidgets().subscribe(dataW => {
      this.widgets = dataW;
    });
   }

  ngOnInit() {
    this.options = {
      gridType: GridType.Fit,
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
      emptyCellDragMaxCols: 5000,
      emptyCellDragMaxRows: 1000,
   
      pushItems: true,
      draggable: {
        enabled: true
      },
      resizable: {
        enabled: true
      }
    };
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onToggleClick() {
    this.active = !this.active;
  }

  dragStartHandler(ev, item) {

    ev.dataTransfer.setData('text/plain', item);
   
    ev.dataTransfer.dropEffect = 'copy';

    this.onToggleClick();
  }

  public dataById(index, item): string {
    return item.id;
  }

  changedOptions() {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  emptyCellClick(event: MouseEvent, item: GridsterItem) {}

  emptyCellMenuClick(){ }

  emptyCellDragClick(){ }

  emptyCellDropClick(event: DragEvent, item: GridsterItem){ }

  isLeavePanel(e){
    this.widgetService.isOver = false;
  }
  isOverPanel(e) {
    if(e){
      this.widgetService.isOver = true;
      this.removeItem();
    }
  }

  public getInjector = (idWidget: string): Injector => {
    return Injector.create({
      providers: [
        { provide: 'widgetId', useValue: idWidget},
        { provide: 'isMock', useValue: true},
      ],
      parent: this.injector
    });
  }

  removeItem(){
    this.userSettings.removeItem();
  } 
}

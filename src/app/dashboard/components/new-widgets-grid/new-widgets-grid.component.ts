import { Component, OnInit, Injector, Inject } from '@angular/core';
import { WIDGETS } from '../new-widgets-grid/widget-map';
import { NewWidgetService } from '../../services/new-widget.service';
import { WidgetModel } from '../../models/widget.model';
import {
    GridsterConfig,
    GridType,
    GridsterItem,
    GridsterItemComponentInterface,
    DisplayGrid,
} from 'angular-gridster2';
import { Subscription } from 'rxjs';
import { NewUserSettingsService } from '../../services/new-user-settings.service';
import { EventEmitter } from '@angular/core';
import { Time } from '@angular/common';

@Component({
    selector: 'evj-new-widgets-grid',
    templateUrl: './new-widgets-grid.component.html',
    styleUrls: ['./new-widgets-grid.component.scss'],
})
export class NewWidgetsGridComponent implements OnInit {
    public readonly WIDGETS = WIDGETS;

    fullscreen: boolean = false;

    public options: GridsterConfig;

    model: WidgetModel;

    public indexWidget;

    public nameWidget;

    public resizeWidget = new EventEmitter<any>();

    private sizeTimeout: any;

    _injector: Injector;

    private subscription: Subscription;

    public ColWidth;
    public RowHeight;

    constructor(
        public widgetService: NewWidgetService,
        public injector: Injector,
        public userSettings: NewUserSettingsService
    ) {}

    ngOnInit(): void {
        document.addEventListener('fullscreenchange', () => {
            this.fullscreen = document.fullscreenElement ? true : false;
        });

        // document.getElementById('gridSize').onresize = console.log('resize');

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
            fixedColWidth: this.ColWidth,
            fixedRowHeight: this.RowHeight,
            maxItemCols: 10000,
            maxItemRows: 10000,
            minItemCols: 1,
            minItemRows: 1,
            maxRows: 100000,
            maxCols: 100000,
            pushItems: true,
            draggable: {
                enabled: true,
                stop: this.dragStop.bind(this),
                start: this.eventStart.bind(this),
            },
            resizable: {
                delayStart: 0,
                enabled: true,
                start: this.eventStart.bind(this),
                stop: this.resizeStop.bind(this),
                handles: {
                    s: true,
                    e: true,
                    n: true,
                    w: true,
                    se: true,
                    ne: true,
                    sw: true,
                    nw: true,
                },
            },
        };

        this.sizeGrid();
    }

    public onResize(event: any): void {
        clearTimeout(this.sizeTimeout);
        this.sizeTimeout = setTimeout(() => this.sizeGrid(), 1000);
        this.resizeGridsterElement();
    }

    public sizeGrid(): void {
        const widthScreen = document.getElementById('gridSize').clientWidth;
        const heigthScreen = document.getElementById('gridSize').clientHeight;
        const widthScreenDefault = 1920;
        const heigthScreenDefault = 909;
        this.ColWidth = 20;
        this.RowHeight = 20;
        this.ColWidth *= (widthScreen - 660) / (widthScreenDefault - 660);
        this.RowHeight *= (heigthScreen - 329) / (heigthScreenDefault - 329);

        this.options.fixedColWidth = this.ColWidth;
        this.options.fixedRowHeight = this.RowHeight;

        this.changedOptions();

        console.log(heigthScreen + ' ' + widthScreen);
        console.log(this.RowHeight + ' ' + this.ColWidth);
    }

    public resizeGridsterElement() {
        const event = new CustomEvent('resize');
        document.dispatchEvent(event);
    }

    public itemChange(item: GridsterItem, itemComponent: GridsterItemComponentInterface) {
        this.userSettings.updateByPosition(item, itemComponent.$item);
    }

    public onSwap(swap: any) {
        swap === true ? (this.options.swap = true) : (this.options.swap = false);
        swap === true ? (this.options.pushItems = true) : (this.options.pushItems = false);
        this.changedOptions();
    }

    public onGrid(grid: any) {
        grid === true
            ? (this.options.displayGrid = 'none')
            : (this.options.displayGrid = DisplayGrid.Always);
        this.changedOptions();
    }

    public getInjector = (idWidget: string, uniqId: string): Injector => {
        return Injector.create({
            providers: [
                { provide: 'widgetId', useValue: idWidget },
                { provide: 'uniqId', useValue: uniqId },
                { provide: 'isMock', useValue: false },
                { provide: 'resizeWidget', useValue: this.resizeWidget },
            ],
            parent: this.injector,
        });
    };

    public eventStart(
        item: GridsterItem,
        itemComponent: GridsterItemComponentInterface,
        e: MouseEvent
    ) {
        if (!e) return;
        const dataTrasfer = new DataTransfer();
        e.currentTarget.dispatchEvent(new DragEvent('dragstart', { dataTransfer: dataTrasfer }));
    }

    public resizeStop(
        item: GridsterItem,
        itemComponent: GridsterItemComponentInterface,
        event: MouseEvent
    ) {
        let widget: any = { item, event };
        this.resizeWidget.emit(widget);
    }

    public dragStart(e: DragEvent, item: GridsterItem): void {
        e.dataTransfer.setData('text/plain', item.toString());
        e.dataTransfer.dropEffect = 'copy';
        this.widgetService.draggingItem = item;
    }

    public dragStop(item: GridsterItem, e: MouseEvent) {
        /*  if (!e) return;
    const dataTrasfer = new DataTransfer();
    e.currentTarget.dispatchEvent(new DragEvent('dragstop', { dataTransfer: dataTrasfer }));
    this.widgetService.draggingItem = null; */
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

    emptyCellMenuClick() {}

    emptyCellDragClick() {}

    emptyCellDropClick(event: DragEvent, param) {
        const idWidget = event.dataTransfer.getData('text');

        this.nameWidget = this.widgetService.getName(idWidget);

        this.userSettings.addCellByPosition(idWidget, this.nameWidget, param);
    }
}

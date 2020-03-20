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
import { NewUserSettingsService } from '../../services/new-user-settings.service';
import { EventEmitter } from '@angular/core';
import { ClaimService, EnumClaimWidgets } from '../../services/claim.service';

export interface IParamWidgetsGrid {
    cols: number;
    rows: number;
    x: number;
    y: number;
}

@Component({
    selector: 'evj-new-widgets-grid',
    templateUrl: './new-widgets-grid.component.html',
    styleUrls: ['./new-widgets-grid.component.scss'],
})
export class NewWidgetsGridComponent implements OnInit {
    public readonly WIDGETS = WIDGETS;

    public fullscreen: boolean = false;

    public isVisiblePanel: boolean = true;

    public options: GridsterConfig;

    public model: WidgetModel;

    public indexWidget;
    public nameWidget: string;

    public resizeWidget: EventEmitter<{
        item: GridsterItem;
        event: MouseEvent;
    }> = new EventEmitter<{ item: GridsterItem; event: MouseEvent }>();

    private sizeTimeout: any;

    public ColWidth: number;
    public RowHeight: number;

    private claimSettings: EnumClaimWidgets[] = [];

    constructor(
        public widgetService: NewWidgetService,
        public injector: Injector,
        public userSettings: NewUserSettingsService,
        private claimService: ClaimService
    ) {}

    public ngOnInit(): void {
        document.addEventListener('fullscreenchange', () => {
            console.log(document.fullscreenElement);
            this.fullscreen = document.fullscreenElement ? true : false;
        });
        this.claimService.claimWidgets$.subscribe((value) => {
            if (value) {
                this.claimSettings = value;
                this.isVisiblePanel = this.claimSettings.includes(EnumClaimWidgets.add);
                this.options = null;
                this.loaditem();
            }
        });
        this.loaditem();
    }

    private loaditem(): void {
        this.userSettings.GetScreen();
        this.options = {
            gridType: GridType.Fixed,
            displayGrid: 'none',
            itemChangeCallback: this.itemChange.bind(this),
            enableEmptyCellClick: false,
            enableEmptyCellContextMenu: false,
            enableEmptyCellDrop: this.claimSettings.includes(EnumClaimWidgets.add),
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
            maxItemArea: 1000000, // FIX максимальный размер виджета
            minItemCols: 1,
            minItemRows: 1,
            maxRows: 100000,
            maxCols: 100000,
            pushItems: true,
            draggable: {
                enabled: this.claimSettings.includes(EnumClaimWidgets.move),
                stop: this.dragStop.bind(this),
                start: this.eventStart.bind(this),
            },
            resizable: {
                delayStart: 0,
                enabled: this.claimSettings.includes(EnumClaimWidgets.resize),
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

    public onResize(): void {
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

    public resizeGridsterElement(): void {
        const event = new CustomEvent('resize');
        document.dispatchEvent(event);
    }

    public itemChange(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {
        this.userSettings.updateByPosition(item, itemComponent.$item);
    }

    public onSwap(swap: any): void {
        swap === true ? (this.options.swap = true) : (this.options.swap = false);
        swap === true ? (this.options.pushItems = true) : (this.options.pushItems = false);
        this.changedOptions();
    }

    public onGrid(grid: any): void {
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
    ): void {
        if (!e) {
            return;
        }
        const dataTrasfer = new DataTransfer();
        e.currentTarget.dispatchEvent(new DragEvent('dragstart', { dataTransfer: dataTrasfer }));
    }

    public resizeStop(
        item: GridsterItem,
        itemComponent: GridsterItemComponentInterface,
        event: MouseEvent
    ): void {
        const widget: { item: GridsterItem; event: MouseEvent } = { item, event };
        this.resizeWidget.emit(widget);
    }

    public dragStart(e: DragEvent, item: GridsterItem): void {
        e.dataTransfer.setData('text/plain', item.toString());
        e.dataTransfer.dropEffect = 'copy';
        this.widgetService.draggingItem = item;
    }

    public dragStop(item: GridsterItem, e: MouseEvent): void {
        /*  if (!e) return;
    const dataTrasfer = new DataTransfer();
    e.currentTarget.dispatchEvent(new DragEvent('dragstop', { dataTransfer: dataTrasfer }));
    this.widgetService.draggingItem = null; */
    }

    public dragStartHandler(ev, i): void {
        ev.dataTransfer.setData('text/plain', i);
        ev.dataTransfer.dropEffect = 'move';
    }

    public changedOptions(): void {
        if (this.options.api && this.options.api.optionsChanged) {
            this.options.api.optionsChanged();
        }
    }

    public emptyCellClick(event: MouseEvent, item: GridsterItem): void {
        this.widgetService.dashboard.push(item);
    }

    public emptyCellMenuClick(): void {}

    public emptyCellDragClick(): void {}

    public emptyCellDropClick(event: DragEvent, param: IParamWidgetsGrid): void {
        const idWidget: string = event.dataTransfer.getData('text');

        this.nameWidget = this.widgetService.getName(idWidget);

        this.userSettings.addCellByPosition(idWidget, this.nameWidget, param);
    }
}

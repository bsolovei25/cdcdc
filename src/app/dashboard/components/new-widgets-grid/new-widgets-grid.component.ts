import { Component, OnInit, Injector, Inject, OnDestroy } from '@angular/core';
import { WIDGETS } from '../new-widgets-grid/widget-map';
import { WidgetModel } from '../../models/widget.model';
import {
    GridsterConfig,
    GridType,
    GridsterItem,
    GridsterItemComponentInterface,
    DisplayGrid,
} from 'angular-gridster2';
import { UserSettingsService } from '../../services/user-settings.service';
import { EventEmitter } from '@angular/core';
import { ClaimService, EnumClaimWidgets } from '../../services/claim.service';
import { WidgetService } from '../../services/widget.service';
import { Subscription } from 'rxjs';

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
export class NewWidgetsGridComponent implements OnInit, OnDestroy {
    public readonly WIDGETS = WIDGETS;

    private subscriptions: Subscription[] = [];

    public fullscreen: boolean = false;

    public options: GridsterConfig;

    public model: WidgetModel;

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
        public widgetService: WidgetService,
        public injector: Injector,
        public userSettings: UserSettingsService,
        private claimService: ClaimService
    ) { }

    public ngOnInit(): void {
        document.addEventListener('fullscreenchange', () => {
            this.fullscreen = !!document.fullscreenElement;
        });
        this.subscriptions.push(
            this.claimService.claimWidgets$.subscribe((value) => {
                console.log('widget-grid sub init');
                if (value) {
                    this.claimSettings = value;
                    this.options = null;
                    this.loaditem();
                }
            }));
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }

    private loaditem(): void {
        this.options = {
            gridType: GridType.Fixed,
            displayGrid: DisplayGrid.None,
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
            maxItemArea: 1000000,
            minItemCols: 1,
            minItemRows: 1,
            maxRows: 100000,
            maxCols: 100000,
            pushItems: true,
            swap: false,
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
        itemComponent.item = itemComponent.$item;
    }

    public onSwap(swap: boolean): void {
        this.options.pushItems = swap;
        this.changedOptions();
    }

    public onGrid(grid: any): void {
        grid === true
            ? (this.options.displayGrid = DisplayGrid.None)
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
        // if (!e) return;
        // const dataTrasfer = new DataTransfer();
        // e.currentTarget.dispatchEvent(new DragEvent('dragstop', { dataTransfer: dataTrasfer }));
        // this.widgetService.draggingItem = null;
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

    public emptyCellMenuClick(): void { }

    public emptyCellDragClick(): void { }

    public emptyCellDropClick(event: DragEvent, param: IParamWidgetsGrid): void {
        const idWidget: string = event.dataTransfer.getData('text');
        this.nameWidget = this.widgetService.getName(idWidget);
        this.userSettings.addCellByPosition(idWidget, this.nameWidget, param);
    }
}

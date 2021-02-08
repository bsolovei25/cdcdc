import { Component, OnInit, Injector, Inject, OnDestroy } from '@angular/core';
import { WIDGETS } from '../../../widgets/widget-map';
import { WidgetModel } from '../../models/widget.model';
import { GridsterConfig, GridType, GridsterItem, GridsterItemComponentInterface, DisplayGrid } from 'angular-gridster2';
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
    selector: 'evj-widgets-grid',
    templateUrl: './widgets-grid.component.html',
    styleUrls: ['./widgets-grid.component.scss'],
})
export class WidgetsGridComponent implements OnInit, OnDestroy {
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

    // To fix template errors;
    private isUserAction: boolean = false;

    private sizeTimeout: ReturnType<typeof setTimeout>;

    public ColWidth: number;
    public RowHeight: number;

    private claimSettings: EnumClaimWidgets[] = [];

    constructor(
        public widgetService: WidgetService,
        public injector: Injector,
        public userSettings: UserSettingsService,
        private claimService: ClaimService
    ) {}

    public ngOnInit(): void {
        console.log('widget-grid start');
        document.addEventListener('fullscreenchange', () => {
            this.fullscreen = !!document.fullscreenElement;
        });
        this.subscriptions.push(
            this.claimService.claimWidgets$.subscribe((value) => {
                if (value) {
                    this.claimSettings = value;
                    this.options = null;
                    this.loadItem();
                }
            })
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }

    private loadItem(): void {
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
        this.sizeTimeout = setTimeout(() => this.sizeGrid(), 1500);
    }

    public sizeGrid(): void {
        const widthScreen = document.getElementById('gridSize').clientWidth;
        const heightScreen = document.getElementById('gridSize').clientHeight;
        // TODO костыль
        if (heightScreen < 10 || widthScreen < 10) {
            return;
        }
        const widthScreenDefault = 1920;
        const heightScreenDefault = 909;
        this.ColWidth = 19.85;
        this.RowHeight = 19.9;
        this.ColWidth *= (widthScreen - 660) / (widthScreenDefault - 660);
        this.RowHeight *= (heightScreen - 329) / (heightScreenDefault - 329);

        this.options.fixedColWidth = this.ColWidth;
        this.options.fixedRowHeight = this.RowHeight;

        this.changedOptions();

        const event = new Event('resizeGrid');
        document.dispatchEvent(event);
        setTimeout(() => this.resizeGridsterElement(), 1500);
    }

    public resizeGridsterElement(): void {
        const event = new CustomEvent('resize');
        document.dispatchEvent(event);
    }

    public itemChange(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {
        if (!this.isUserAction) {
            return;
        }
        item = itemComponent.item;
        this.userSettings.updateByPosition(item, itemComponent.item);
    }

    public onSwap(swap: boolean): void {
        this.options.pushItems = swap;
        this.changedOptions();
    }

    public onGrid(grid: any): void {
        grid === true ? (this.options.displayGrid = DisplayGrid.None) : (this.options.displayGrid = DisplayGrid.Always);
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

    public eventStart(item: GridsterItem, itemComponent: GridsterItemComponentInterface, e: MouseEvent): void {
        if (!e) {
            return;
        }
        this.isUserAction = true;
        e.currentTarget.dispatchEvent(new DragEvent('dragstart', { dataTransfer: new DataTransfer() }));
    }

    public resizeStop(item: GridsterItem, itemComponent: GridsterItemComponentInterface, event: MouseEvent): void {
        const widget: { item: GridsterItem; event: MouseEvent } = { item, event };
        this.resizeWidget.emit(widget);
    }

    public dragStart(e: DragEvent, item: GridsterItem): void {
        e.dataTransfer.setData('text/plain', item.toString());
        e.dataTransfer.dropEffect = 'copy';
        this.widgetService.draggingItem = item;
    }

    public dragStop(item: GridsterItem, e: MouseEvent): void {
        setTimeout(() => (this.isUserAction = false), 1000);
    }

    public dragStartHandler(e: DragEvent, i): void {
        e.dataTransfer.setData('text/plain', i);
        e.dataTransfer.dropEffect = 'move';
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

    // SMP widgets
    public isSmpHeader(widgetType: string): boolean {
        switch (widgetType) {
            case 'cd-critical':
                return true;
        }
        return false;
    }
}

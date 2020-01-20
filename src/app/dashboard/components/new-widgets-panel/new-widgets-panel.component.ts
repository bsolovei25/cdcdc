import {
    Component,
    OnInit,
    Injector,
    ChangeDetectionStrategy,
    Output,
    EventEmitter,
} from '@angular/core';
import { GridsterItem, GridsterConfig, GridType } from 'angular-gridster2';
import { NewWidgetService } from '../../services/new-widget.service';
import { Observable, Subscription } from 'rxjs';
import { WIDGETS } from '../new-widgets-grid/widget-map';
import { WidgetModel } from '../../models/widget.model';
import { IWidgets } from '../../models/widget.model';
import { tick } from '@angular/core/testing';
import { NewUserSettingsService } from '../../services/new-user-settings.service';

@Component({
    selector: 'evj-new-widgets-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './new-widgets-panel.component.html',
    styleUrls: ['./new-widgets-panel.component.scss'],
})
export class NewWidgetsPanelComponent implements OnInit {
    private subscriptions: Subscription[] = [];

    public event;
    public item;

    active = false;

    public readonly WIDGETS = WIDGETS;

    public options: GridsterConfig;

    dataW: IWidgets;

    widgets: IWidgets[];

    model: WidgetModel;

    _injector: Injector;

    public gridWidget = true;
    public fixWidget = true;

    massWidg = [WIDGETS];

    public test = [];
    constructor(
        public widgetService: NewWidgetService,
        public injector: Injector,
        public userSettings: NewUserSettingsService
    ) {
        this.subscriptions.push(
            this.widgetService.getAvailableWidgets().subscribe((dataW) => {
                this.widgets = dataW;
            })
        );
    }

    ngOnInit() {
        this.subscriptions.push(
            this.widgetService.searchWidgetT.subscribe((data) => {
                this.widgets = data;
            })
        );
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
                enabled: true,
            },
            resizable: {
                enabled: true,
            },
        };
    }

    ngAfterViewInit() {}

    @Output() onSwap = new EventEmitter<boolean>();
    @Output() onGrid = new EventEmitter<boolean>();
    @Output() onViewSise = new EventEmitter<boolean>();

    changeSwap() {
        let check = <HTMLInputElement>document.getElementById('checkBoxFix');
        if (check.checked) {
            this.fixWidget = false;
            this.onSwap.emit(this.fixWidget);
        } else {
            this.fixWidget = true;
            this.onSwap.emit(this.fixWidget);
        }
    }

    getGridView() {
        let check = <HTMLInputElement>document.getElementById('checkBoxGrid');
        if (check.checked) {
            this.gridWidget = false;
            this.onGrid.emit(this.gridWidget);
        } else {
            this.gridWidget = true;
            this.onGrid.emit(this.gridWidget);
        }
    }

    /* bigSize() {
        let check = <HTMLInputElement>document.getElementById('checkBoxView');
        if (check.checked) {
            this.swapWidget = false;
            this.onGrid.emit(this.swapWidget);
        } else {
            this.swapWidget = true;
            this.onGrid.emit(this.swapWidget);
        }
    } */

    ngOnDestroy(): void {
        if (this.subscriptions) {
            for (const subscribe of this.subscriptions) {
                subscribe.unsubscribe();
            }
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

    emptyCellMenuClick() {}

    emptyCellDragClick() {}

    emptyCellDropClick(event: DragEvent, item: GridsterItem) {}

    public getInjector = (idWidget: string): Injector => {
        return Injector.create({
            providers: [
                { provide: 'widgetId', useValue: idWidget },
                { provide: 'uniqId', useValue: null }, // uniqId is null when isMock
                { provide: 'isMock', useValue: true },
                { provide: 'resizeWidget', useValue: null },
            ],
            parent: this.injector,
        });
    };

    removeItem(widgetId: string) {
        this.userSettings.removeItem(widgetId);
    }
}

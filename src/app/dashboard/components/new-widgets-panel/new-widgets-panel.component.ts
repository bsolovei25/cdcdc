import {
    Component,
    OnInit,
    Injector,
    ChangeDetectionStrategy,
    Output,
    EventEmitter,
    OnDestroy,
} from '@angular/core';
import { GridsterConfig, GridType } from 'angular-gridster2';
import { NewWidgetService } from '../../services/new-widget.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { WIDGETS } from '../new-widgets-grid/widget-map';
import { WidgetModel } from '../../models/widget.model';
import { IWidgets } from '../../models/widget.model';
import { NewUserSettingsService } from '../../services/new-user-settings.service';
import { ClaimService, EnumClaimWidgets } from '../../services/claim.service';

@Component({
    selector: 'evj-new-widgets-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './new-widgets-panel.component.html',
    styleUrls: ['./new-widgets-panel.component.scss'],
})
export class NewWidgetsPanelComponent implements OnInit, OnDestroy {
    public readonly WIDGETS = WIDGETS;
    private subscriptions: Subscription[] = [];

    public active: boolean = false;
    public options: GridsterConfig;

    public widgets$: BehaviorSubject<IWidgets[]> = new BehaviorSubject<IWidgets[]>([]);
    private claimSettingsWidgets: EnumClaimWidgets[] = [];

    _injector: Injector; // TOFIX   Если не нужно то удалить

    public gridWidget: boolean = true;
    public fixWidget: boolean = true;

    constructor(
        public widgetService: NewWidgetService,
        public injector: Injector,
        public userSettings: NewUserSettingsService,
        private claimService: ClaimService
    ) {}

    public ngOnInit(): void {
        this.subscriptions.push(
            this.widgetService.widgets$.subscribe((dataW) => {
                this.widgets$.next(dataW);
            }),
            this.widgetService.searchWidgetT.subscribe((dataW) => {
                this.widgets$.next(dataW);
            }),
            this.claimService.claimWidgets$.subscribe((set) => {
                this.claimSettingsWidgets = set;
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
            // emptyCellClickCallback: this.emptyCellClick.bind(this),
            // emptyCellContextMenuCallback: this.emptyCellMenuClick.bind(this),
            // emptyCellDragCallback: this.emptyCellDragClick.bind(this),
            // emptyCellDropCallback: this.emptyCellDropClick.bind(this),
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

    @Output() swap: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() grid: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() viewSise: EventEmitter<boolean> = new EventEmitter<boolean>();

    changeSwap(): void {
        const check = document.getElementById('checkBoxFix') as HTMLInputElement;
        if (check.checked) {
            this.fixWidget = false;
            this.swap.emit(this.fixWidget);
        } else {
            this.fixWidget = true;
            this.swap.emit(this.fixWidget);
        }
    }

    getGridView(): void {
        const check = document.getElementById('checkBoxGrid') as HTMLInputElement;
        if (check.checked) {
            this.gridWidget = false;
            this.grid.emit(this.gridWidget);
        } else {
            this.gridWidget = true;
            this.grid.emit(this.gridWidget);
        }
    }

    ngOnDestroy(): void {
        if (this.subscriptions) {
            for (const subscribe of this.subscriptions) {
                subscribe.unsubscribe();
            }
        }
    }

    onToggleClick(): void {
        this.active = !this.active;
    }

    dragStartHandler(event: DragEvent, item: string): void {
        event.dataTransfer.setData('text/plain', item);

        event.dataTransfer.dropEffect = 'copy';

        this.onToggleClick();
    }

    public dataById(item): string {
        return item.id;
    }

    changedOptions(): void {
        if (this.options.api && this.options.api.optionsChanged) {
            this.options.api.optionsChanged();
        }
    }

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

    removeItem(widgetId: string): void {
        this.userSettings.removeItem(widgetId);
    }
}

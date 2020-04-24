import {
    Component,
    OnInit,
    Injector,
    Output,
    EventEmitter,
    OnDestroy,
} from '@angular/core';
import { GridsterConfig, GridType } from 'angular-gridster2';
import { WidgetService } from '../../services/widget.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { WIDGETS } from '../new-widgets-grid/widget-map';
import { IWidgets } from '../../models/widget.model';
import { UserSettingsService } from '../../services/user-settings.service';
import { ClaimService, EnumClaimScreens, EnumClaimWidgets } from '../../services/claim.service';
import { trigger, state, style, transition, animate, group } from '@angular/animations';

type isChoosePanel = 'widgets' | 'reports';

export const fadeAnimation = trigger('fadeAnimation', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
    ]),
    transition(':leave', [
        style({ opacity: 1 }),
        animate('100ms', style({ opacity: 0 }))
    ])
]);

@Component({
    selector: 'evj-new-widgets-panel',
    templateUrl: './new-widgets-panel.component.html',
    styleUrls: ['./new-widgets-panel.component.scss'],
    animations: [fadeAnimation],
})
export class NewWidgetsPanelComponent implements OnInit, OnDestroy {
    public readonly WIDGETS = WIDGETS;
    private subscriptions: Subscription[] = [];

    public active: boolean = false;
    public options: GridsterConfig;

    public widgets$: BehaviorSubject<IWidgets[]> = new BehaviorSubject<IWidgets[]>([]);
    private claimSettingsWidgets: EnumClaimWidgets[] = [];
    public claimSettingsScreens: EnumClaimScreens[] = [];
    EnumClaimScreens = EnumClaimScreens;

    isWidgets: isChoosePanel;

    _injector: Injector; // TOFIX   Если не нужно то удалить

    public gridWidget: boolean = true;
    public fixWidget: boolean = true;

    constructor(
        public widgetService: WidgetService,
        public injector: Injector,
        public userSettings: UserSettingsService,
        private claimService: ClaimService
    ) { }

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
            }),
            this.claimService.claimScreens$.subscribe((claims) => {
                this.claimSettingsScreens = claims;
            })
        );
    }

    @Output() swap: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() grid: EventEmitter<boolean> = new EventEmitter<boolean>();

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
        for (const subscribe of this.subscriptions) {
            subscribe.unsubscribe();
        }
    }

    onToggleClick(buttonName: isChoosePanel): void {
        if (this.active && buttonName !== this.isWidgets) {
            this.isWidgets = buttonName;
        } else {
            this.active = !this.active;
            this.isWidgets = buttonName;
        }
    }

    dragStartHandler(event: DragEvent, item: string): void {
        event.dataTransfer.setData('text/plain', item);
        event.dataTransfer.dropEffect = 'copy';
        this.onToggleClick(this.isWidgets);
    }

    public dataById(item): string {
        return item.id;
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
}

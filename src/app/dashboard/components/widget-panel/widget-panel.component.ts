import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { UserSettingsService } from '../../services/user-settings.service';
import { ClaimService, EnumClaimWidgets, EnumClaimScreens } from '../../services/claim.service';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { WIDGETS } from '../widgets-grid/widget-map';
import { IWidgets } from '../../models/widget.model';
import { map } from 'rxjs/operators';

@Component({
    selector: 'evj-widget-panel',
    templateUrl: './widget-panel.component.html',
    styleUrls: ['./widget-panel.component.scss'],
})
export class WidgetPanelComponent implements OnInit {
    public readonly WIDGETS = WIDGETS;
    public gridWidget: boolean = true;
    public fixWidget: boolean = true;

    private subscriptions: Subscription[] = [];

    public widgets$: BehaviorSubject<IWidgets[]> = new BehaviorSubject<IWidgets[]>([]);
    public filterWidgets$: Observable<IWidgets[]> = this.widgets$
        .asObservable()
        .pipe(map((widgets) => widgets.filter((widget) => WIDGETS[widget.widgetType])));

    private claimSettingsWidgets: EnumClaimWidgets[] = [];
    public claimSettingsScreens: EnumClaimScreens[] = [];
    EnumClaimScreens = EnumClaimScreens;

    search: string = '';

    private timerHwnd: number;

    @Output() toggleClick: EventEmitter<string> = new EventEmitter<string>();

    @Output() swap: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() grid: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        public widgetService: WidgetService,
        public injector: Injector,
        public userSettings: UserSettingsService,
        private claimService: ClaimService
    ) {}

    ngOnInit(): void {
        this.subscriptions.push(
            this.widgetService.widgets$.subscribe((dataW) => {
                console.log('start filter');
                const filterWidgets: IWidgets[] = [];
                dataW.forEach((widget) => {
                    if (WIDGETS[widget.widgetType]) {
                        filterWidgets.push(widget);
                    }
                });
                this.widgets$.next(filterWidgets);
            }),
            this.widgetService.searchWidgetT.subscribe((dataW) => {
                console.log('start filter');
                const filterWidgets: IWidgets[] = [];
                dataW.forEach((widget) => {
                    if (WIDGETS[widget.widgetType]) {
                        filterWidgets.push(widget);
                    }
                });
                // this.widgets$.next(filterWidgets);
            }),
            this.claimService.claimWidgets$.subscribe((set) => {
                this.claimSettingsWidgets = set;
            }),
            this.claimService.claimScreens$.subscribe((claims) => {
                this.claimSettingsScreens = claims;
            })
        );
    }

    async loadItem(): Promise<void> {}

    dragStartHandler(event: DragEvent, item: string): void {
        event.dataTransfer.setData('text/plain', item);
        event.dataTransfer.dropEffect = 'copy';
        this.toggleClick.emit('widgets');
    }

    public dataById(item: IWidgets): string {
        return item.id;
    }

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

    searchWidgetsInput(event: KeyboardEvent): void {
        this.search = (event?.target as HTMLInputElement)?.value.toLowerCase();
        if (this.search === '') {
        } else {
            if (!this.timerHwnd) {
                this.timerHwnd = window.setTimeout(() => {
                    this.timerHwnd = 0;
                }, 100);
            }
        }
    }

    searchWidgetsFilter(data: string[]): void {}

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

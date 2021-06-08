import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    Injector,
    Input,
    ChangeDetectorRef,
    AfterContentChecked,
    OnDestroy,
} from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { ClaimService, EnumClaimWidgets, EnumClaimScreens } from '../../services/claim.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { IWidget } from '../../models/widget.model';
import { trigger, transition, animate, style } from '@angular/animations';
import { WidgetContainerComponent } from '../../widget-container/widget-container.component';
import { WIDGETS_LAZY } from '../../../widgets/widget-map';

@Component({
    selector: 'evj-widget-panel',
    templateUrl: './widget-panel.component.html',
    styleUrls: ['./widget-panel.component.scss'],
    animations: [
        trigger('items', [
            transition('void => *', [
                style({ opacity: 0 }),
                animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)', style({ opacity: 1 })),
            ]),
        ]),
    ],
})
export class WidgetPanelComponent implements OnInit, AfterContentChecked, OnDestroy {
    public readonly widgetContainerComponent: typeof WidgetContainerComponent = WidgetContainerComponent;
    public gridWidget: boolean = true;
    public fixWidget: boolean = true;

    private subscriptions: Subscription[] = [];

    public widgets$: BehaviorSubject<IWidget[]> = new BehaviorSubject<IWidget[]>([]);
    public filterWidgets$: BehaviorSubject<IWidget[]> = new BehaviorSubject<IWidget[]>([]);

    private claimSettingsWidgets: EnumClaimWidgets[] = [];
    public claimSettingsScreens: EnumClaimScreens[] = [];
    EnumClaimScreens: typeof EnumClaimScreens = EnumClaimScreens;

    search: string = '';
    filters: string[] = [];

    @Input()
    public panelActive: boolean = false;

    @Input() set SearchInput(input: KeyboardEvent) {
        this.searchWidgetsInput(input);
    }

    @Output() toggleClick: EventEmitter<string> = new EventEmitter<string>();
    @Output() swap: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() grid: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        private widgetService: WidgetService,
        private injector: Injector,
        private claimService: ClaimService,
        private cdRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.subscriptions.push(
            this.widgetService.widgetsPanel$.subscribe((dataW) => {
                const filterWidgets: IWidget[] = [];
                dataW.forEach((widget) => {
                    if (!!WIDGETS_LAZY[widget.widgetType] && !widget.isHidden) {
                        filterWidgets.push(widget);
                    }
                });
                this.widgets$.next(filterWidgets);
                this.filterWidgets$.next(filterWidgets);
                this.cdRef.detectChanges();
            }),
            this.claimService.claimWidgets$.subscribe((set) => {
                this.claimSettingsWidgets = set;
            }),
            this.claimService.claimScreens$.subscribe((claims) => {
                this.claimSettingsScreens = claims;
            }),
            this.widgetService.filterWidgets$.subscribe((dataW) => {
                this.filters = dataW;
                this.searchWidgetsFilter();
            })
        );
    }

    ngAfterContentChecked(): void {
        this.cdRef.detectChanges();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((x) => x.unsubscribe());
        this.subscriptions = null;
    }

    dragStartHandler(event: DragEvent, item: string): void {
        event.dataTransfer.setData('text/plain', item);
        setTimeout(() => this.toggleClick.emit('widgets'), 0);
    }

    public dataById(item: IWidget): string {
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

    searchWidgetsInput(event?: KeyboardEvent | string): void {
        if (typeof event !== 'string') {
            this.search = (event?.target as HTMLInputElement)?.value?.toLowerCase();
        } else {
            this.search = event;
        }
        if (this.search === '') {
            if (this.filters.length > 0) {
                this.searchWidgetsFilter();
            } else {
                this.filterWidgets$.next(this.widgets$.getValue());
            }
        } else {
            if (this.filters.length > 0) {
                let widgets = this.widgets$
                    .getValue()
                    .filter((value) => value?.title?.toLowerCase().includes(this.search?.trim()?.toLowerCase()));
                widgets = widgets.filter((value) => {
                    return this.filters.find((val) => value.categories.includes(val));
                });
                this.filterWidgets$.next(widgets);
            } else {
                this.filterWidgets$.next(
                    this.widgets$
                        .getValue()
                        .filter((value) => value?.title?.toLowerCase().includes(this.search?.trim()?.toLowerCase()))
                );
            }
        }
    }

    searchWidgetsFilter(): void {
        if (this.filters?.length > 0) {
            let widgets = this.widgets$.getValue();
            if (this.search !== '') {
                widgets = widgets.filter((value) => {
                    return this.filters.find((val) => value.categories.includes(val));
                });
                this.filterWidgets$.next(
                    widgets.filter((value) => value.title.toLowerCase().includes(this.search.trim().toLowerCase()))
                );
            } else {
                this.filterWidgets$.next(
                    widgets.filter((value) => {
                        return this.filters.find((val) => value.categories.includes(val));
                    })
                );
            }
        } else {
            if (this.search === '') {
                this.filterWidgets$.next(this.widgets$.getValue());
            } else {
                this.searchWidgetsInput(this.search);
            }
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
}

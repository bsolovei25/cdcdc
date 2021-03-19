import { ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { IDatesInterval, WidgetService } from '../../../dashboard/services/widget.service';
import { IMultiChartLine } from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-multi-chart.model';
import { UserSettingsService } from '../../../dashboard/services/user-settings.service';
import { AstueOnpzService } from '../astue-onpz-shared/astue-onpz.service';
import { IMultiChartOptions } from './components/astue-onpz-multi-chart/astue-onpz-multi-chart.component';
import { IChartMini } from '@shared/models/smart-scroll.model';
import {
    AstueOnpzConventionalFuelService,
    IAstueOnpzConventionalFuelTransfer,
    IAstueOnpzReferenceModel,
} from './astue-onpz-conventional-fuel.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ScreenshotMaker } from '@core/classes/screenshot.class';
import { ReportsService } from '../../../dashboard/services/widgets/admin-panel/reports.service';

@Component({
    selector: 'evj-astue-onpz-conventional-fuel',
    templateUrl: './astue-onpz-conventional-fuel.component.html',
    styleUrls: ['./astue-onpz-conventional-fuel.component.scss'],
})
export class AstueOnpzConventionalFuelComponent extends WidgetPlatform implements OnInit, OnDestroy {
    @ViewChild('chart') chartComponent: ElementRef;

    public data: IMultiChartLine[] = [];
    public colors: Map<string, number>;
    public unitName: string = '';
    public showCurrent: boolean = true;

    public isPredictors: boolean = false;
    public options: IMultiChartOptions = {
        isIconsShowing: false,
    };

    public currentValues: {
        plan: number,
        fact: number
    }

    public sbWidth: number = 100;
    public sbLeft: number = 0;
    public scrollLimits: IDatesInterval = null;

    public selectFuel: FormControl = new FormControl({
        value: '',
        disabled: false,
    });

    get planningChart(): boolean {
        return !!this.astueOnpzService.sharedPlanningGraph$.getValue();
    }

    get scrollData(): IChartMini[] {
        return this.data?.find((x) => x.graphType === 'plan')?.graph ?? [];
    }

    public paddingLeft$: BehaviorSubject<number> = this.astueOnpzConventionalFuelService.paddingLegend$;

    public predictors$: BehaviorSubject<IAstueOnpzConventionalFuelTransfer> = new BehaviorSubject<IAstueOnpzConventionalFuelTransfer>(
        null
    );

    selectionForm: FormGroup = new FormGroup({
        manufacture: new FormControl(),
        unit: new FormControl(),
        resource: new FormControl(),
    });

    public manufacturesReference$: Observable<
        IAstueOnpzReferenceModel[]
    > = this.astueOnpzConventionalFuelService.selectReferences$.pipe(map((x) => x.manufacturies));
    public unitsReference$: Observable<IAstueOnpzReferenceModel[]> = combineLatest([
        this.astueOnpzConventionalFuelService.selectReferences$.pipe(map((x) => x.units)),
        this.selectionForm.get('manufacture').valueChanges,
    ]).pipe(map(([units, manufacture]) => units.filter((u) => u.parentId === manufacture)));

    public resourcesReference$: Observable<IAstueOnpzReferenceModel[]> = combineLatest([
        this.astueOnpzConventionalFuelService.selectReferences$.pipe(map((x) => x.energyResources)),
        this.selectionForm.get('unit').valueChanges,
    ]).pipe(map(([resources, unit]) => resources.filter((r) => r.parentId === unit)));

    constructor(
        private reportService: ReportsService,
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private astueOnpzService: AstueOnpzService,
        private userSettingsService: UserSettingsService,
        public astueOnpzConventionalFuelService: AstueOnpzConventionalFuelService,
        private changeDetection: ChangeDetectorRef
    ) {
        super(widgetService, isMock, id, uniqId);
        astueOnpzConventionalFuelService.selectedOptions = this.selectFuel.valueChanges.pipe(
            map((x) => ({ ...astueOnpzConventionalFuelService.defaultSelectOptions, resource: x }))
        );
    }

    public ngOnInit(): void {
        this.widgetInit();
        this.subscriptions.push(
            this.widgetService.currentDates$.subscribe((ref) => (this.scrollLimits = ref)),
            this.astueOnpzConventionalFuelService.predictorsInfo$.subscribe((x) => {
                setTimeout(() => {
                    this.predictors$.next(x);
                    this.changeDetection.detectChanges();
                });
            }),
            // this.selectFuel.valueChanges.subscribe((x) => {
            //     this.astueOnpzConventionalFuelService.setSelectedOptions({
            //         ...this.astueOnpzConventionalFuelService.defaultSelectOptions,
            //         resource: x,
            //     });
            // }),
            this.astueOnpzConventionalFuelService.predictorsId$.subscribe(this.loadReferences.bind(this)),
            this.selectionForm.get('manufacture').valueChanges.subscribe((x) => {
                this.selectionForm.get('unit').setValue(null);
                this.selectionForm.get('resource').setValue(null);
            }),
            this.selectionForm.get('unit').valueChanges.subscribe((x) => {
                this.selectionForm.get('resource').setValue(null);
            }),
            this.selectionForm.valueChanges
                .pipe(debounceTime(100), distinctUntilChanged())
                .subscribe((x) => this.astueOnpzConventionalFuelService.changeSelectedForm(x))
        );
        // this.selectFuel.setValue(this.astueOnpzConventionalFuelService.selectFuelReference[0]);
    }

    private async loadReferences(widgetId: string): Promise<void> {
        if (!widgetId) {
            return;
        }
        const ref = await this.astueOnpzConventionalFuelService.getSelectionReferences(widgetId);
        console.log(ref);
        this.astueOnpzConventionalFuelService.selectReferences$.next(ref);
    }

    async takeScreenshot(): Promise<void> {
        const screenshotHelper = new ScreenshotMaker();
        const screenshot = await screenshotHelper.takeScreenshot(this.chartComponent.nativeElement);
        await this.reportService.sendScreenshot(screenshot);
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.isPredictors = this.widgetType === 'astue-onpz-conventional-fuel-predictors';
        this.options.isIconsShowing = !this.isPredictors;
        this.subscriptions.push(
            this.astueOnpzService.multilineChartIndicatorTitle$.subscribe((title) => {
                if (this.isPredictors) {
                    return;
                }
                this.widgetTitle = title;
            }),
            this.astueOnpzService.sharedIndicatorOptions.subscribe((options) => {
                if (this.isPredictors) {
                    return;
                }
                this.unitName = options.unitName;
                this.widgetService.setChannelLiveDataFromWsOptions(this.widgetId, options);
            }),
            this.astueOnpzService.multiLinePredictors.subscribe((data) => {
                if (!this.isPredictors) {
                    return;
                }
                this.data = !!data ? this.multilineDataMapper(data) : [];
                this.currentValues = {
                    plan: this.data.find(item => item.graphType === 'plan')?.currentValue,
                    fact: this.data.find(item => item.graphType === 'fact')?.currentValue
                }
                console.log(this.data);
            }),
            this.astueOnpzService.colors$.subscribe((value) => {
                this.colors = value;
            })
        );
    }

    get nextHourPlan(): number {
        return this.data?.find((x) => x.graphType === 'plan')?.nextPlanValue ?? null;
    }

    get nextPlanValue(): number {
        return this.data?.find((x) => x.graphType === 'factModel')?.nextPlanValue ?? null;
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        this.astueOnpzService.dropDataStream();
        this.astueOnpzService.sharedPlanningGraph$.next(null);
        this.astueOnpzService.multilineChartIndicatorTitle$.next('');
        this.astueOnpzService.multilineChartTransfer.next(null);
    }

    protected dataHandler(ref: { graphs: IMultiChartLine[] }): void {
        if (!this.isPredictors) {
            if (ref?.graphs) {
                this.data = this.multilineDataMapper(ref.graphs);
                return;
            }
            this.data = [];
        }
    }

    public goToMainScreen(): void {
        this.userSettingsService.loadScreenByWidget('astue-onpz-menu-structure');
    }

    private multilineDataMapper(ref: IMultiChartLine[]): IMultiChartLine[] {
        ref?.forEach((graph) => {
            const _ = graph as any;
            graph.graphType = graph.graphType ?? _.multiChartTypes;
            graph.graph?.forEach((item) => {
                item.timeStamp = new Date(item.timeStamp);
            });
        });
        return ref;
    }

    public mouseOnGraph(): void {
        this.onMouseEnter();
        this.showCurrent = false;
    }

    public mouseLeaveGraph(): void {
        this.onMouseExit();
        this.showCurrent = true;
    }
}

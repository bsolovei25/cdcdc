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
} from './astue-onpz-conventional-fuel.service';
import { BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
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

    public isPredictors: boolean = false;
    public options: IMultiChartOptions = {
        isIconsShowing: false,
    };

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
            map((x) => ({ ...astueOnpzConventionalFuelService.defaultSelectOptions, fuel: x }))
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
            this.selectFuel.valueChanges.subscribe((x) => {
                this.astueOnpzConventionalFuelService.setSelectedOptions({
                    ...this.astueOnpzConventionalFuelService.defaultSelectOptions,
                    fuel: x,
                });
            })
        );
        this.selectFuel.setValue(this.astueOnpzConventionalFuelService.selectFuelReference[0]);
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
}

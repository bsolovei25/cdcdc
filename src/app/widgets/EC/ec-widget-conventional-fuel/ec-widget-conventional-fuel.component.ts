import { ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { IDatesInterval, WidgetService } from '@dashboard/services/widget.service';
import { IMultiChartLine } from '@dashboard/models/ASTUE-ONPZ/astue-onpz-multi-chart.model';
import { UserSettingsService } from '@dashboard/services/user-settings.service';
import { EcWidgetService, IPredictorsLabelsData } from '../ec-widget-shared/ec-widget.service';
import { IMultiChartOptions } from './components/ec-widget-multi-chart/ec-widget-multi-chart.component';
import { IChartMini } from '@shared/interfaces/smart-scroll.model';
import {
    EcWidgetConventionalFuelService,
    IAstueOnpzConventionalFuelTransfer,
    IAstueOnpzReferences,
} from './ec-widget-conventional-fuel.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { ScreenshotMaker } from '@core/classes/screenshot.class';
import { ReportsService } from '@dashboard/services/widgets/admin-panel/reports.service';
import { VirtualChannel } from '@shared/classes/virtual-channel.class';
import { IAstueOnpzReferenceModel } from '@widgets/ASTUE-ONPZ/astue-onpz-conventional-fuel/astue-onpz-conventional-fuel.service';

type MenuStructure = { menu: IAstueOnpzReferences };
type GraphStructure = { graphs: IMultiChartLine[] };

@Component({
    selector: 'evj-ec-widget-conventional-fuel',
    templateUrl: './ec-widget-conventional-fuel.component.html',
    styleUrls: ['./ec-widget-conventional-fuel.component.scss'],
})
export class EcWidgetConventionalFuelComponent extends WidgetPlatform implements OnInit, OnDestroy {
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
        plan: number;
        fact: number;
    };

    public sbWidth: number = 100;
    public sbLeft: number = 0;
    public scrollLimits: IDatesInterval = null;

    get planningChart(): boolean {
        return !!this.ecWidgetService.sharedPlanningGraph$.getValue();
    }

    get scrollData(): IChartMini[] {
        return this.data?.find((x) => x.graphType === 'plan')?.graph ?? [];
    }

    public paddingLeft$: BehaviorSubject<number> = this.ecWidgetConventionalFuelService.paddingLegend$;

    public predictors$: BehaviorSubject<IAstueOnpzConventionalFuelTransfer> = new BehaviorSubject<IAstueOnpzConventionalFuelTransfer>(
        null
    );

    selectionForm: FormGroup = new FormGroup({
        manufacture: new FormControl(null),
        unit: new FormControl(null),
        resource: new FormControl(null),
    });

    public newStructureMenuData: MenuStructure | null = null;
    private virtualChannels: { subchannelId: string; virtualChannel: VirtualChannel<GraphStructure> }[] = [];
    private virtualChannelSubscriptions: { subchannelId: string; subscription: Subscription }[] = [];

    public predictorsCurrentValue$: BehaviorSubject<IPredictorsLabelsData> = new BehaviorSubject<IPredictorsLabelsData>(
        null
    );

    constructor(
        private reportService: ReportsService,
        protected widgetService: WidgetService,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private ecWidgetService: EcWidgetService,
        private userSettingsService: UserSettingsService,
        public ecWidgetConventionalFuelService: EcWidgetConventionalFuelService,
        private changeDetection: ChangeDetectorRef
    ) {
        super(widgetService, id, uniqId);
    }

    public ngOnInit(): void {
        this.widgetInit();

        this.subscriptions.push(
            this.widgetService.currentDates$.subscribe((ref) => (this.scrollLimits = ref)),
            this.ecWidgetConventionalFuelService.predictorsInfo$.subscribe((x) => {
                this.predictors$.next(x);
                this.changeDetection.detectChanges();
            }),
            this.ecWidgetConventionalFuelService.predictorsId$.subscribe(this.loadReferences.bind(this)),
            this.selectionForm.get('manufacture').valueChanges.subscribe((x) => {
                this.selectionForm.get('unit').setValue(null);
                this.selectionForm.get('resource').setValue(null);
            }),
            this.selectionForm.get('unit').valueChanges.subscribe((x) => {
                this.selectionForm.get('resource').setValue(null);
            }),
            this.selectionForm.valueChanges.pipe(debounceTime(100), distinctUntilChanged()).subscribe((x) => {
                this.ecWidgetService.setSelectedEnergyResource(x.resource);
                return this.ecWidgetConventionalFuelService.changeSelectedForm(x);
            })
        );
    }

    private async loadReferences(widgetId: string): Promise<void> {
        if (!widgetId) {
            return;
        }
        const ref = await this.ecWidgetConventionalFuelService.getSelectionReferences(widgetId);

        const manufactureId = ref?.manufacturies.find(
            (item) => item.name === this.ecWidgetConventionalFuelService.defaultSelectOptions.manufacture
        )?.id;
        const unitId = ref?.units.find(
            (item) =>
                item.name === this.ecWidgetConventionalFuelService.defaultSelectOptions.unit &&
                item.parentId === manufactureId
        )?.id;
        const resId = ref?.energyResources.find(
            (item) =>
                item.name === this.ecWidgetConventionalFuelService.defaultSelectOptions.resource &&
                item.parentId === unitId
        )?.id;

        this.selectionForm.get('manufacture').setValue(this.selectionForm.value.manufacture ?? manufactureId);
        this.selectionForm.get('unit').setValue(this.selectionForm.value.unit ?? unitId);
        this.selectionForm.get('resource').setValue(this.selectionForm.value.resource ?? resId);

        this.ecWidgetConventionalFuelService.selectReferences$.next(ref);
    }

    async takeScreenshot(): Promise<void> {
        const screenshotHelper = new ScreenshotMaker();
        const screenshot = await screenshotHelper.takeScreenshot(this.chartComponent.nativeElement);
        await this.reportService.sendScreenshot(screenshot);
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.isPredictors =
            this.widgetType === 'astue-onpz-conventional-fuel-predictors' ||
            this.widgetType === 'ec-widget-conventional-fuel';
        this.options.isIconsShowing = !this.isPredictors;

        this.subscriptions.push(
            this.ecWidgetService.multilineChartIndicatorTitle$.subscribe((title) => {
                if (this.isPredictors) {
                    return;
                }
                this.widgetTitle = title;
            }),
            this.ecWidgetService.sharedIndicatorOptions.subscribe((options) => {
                if (this.isPredictors) {
                    return;
                }
                this.unitName = options.unitName;
                this.widgetService.setChannelLiveDataFromWsOptions(this.widgetId, options);
            }),

            this.ecWidgetService.colors$.subscribe((value) => {
                this.colors = value;
            }),

            this.ecWidgetService.selectedPredictor$.pipe(filter((data) => Boolean(data))).subscribe((predictorId) => {
                const isDeletePredictor = this.data.findIndex((ref) => ref.subchannelId === predictorId) !== -1;

                if (isDeletePredictor) {
                    this.unSubscribeVirtualChannel(predictorId);
                } else {
                    this.setGraphsData(predictorId);
                }
            }),

            this.ecWidgetService.selectedEnergyResource$.subscribe((energyResourceId) => {
                this.data = [];
                this.predictors$.next(null);
                this.paddingLeft$.next(0);
                this.unSubscribeVirtualChannels();

                if (energyResourceId) {
                    this.setGraphsData(energyResourceId);
                }
            })
        );
    }

    private setGraphsData(id: string): void {
        this.virtualChannelSubscriptions.push({
            subchannelId: id,
            subscription: this.createVirtualChannel(id).data$.subscribe((res) => {
                const halfChartsData = res.graphs.map((item) => {
                    item.graph = item.graph.filter((ref, index) => index % 2 === 0);
                    return item;
                });

                const data = this.multilineDataMapper(halfChartsData);

                data.map((item) => {
                    item.subchannelId = id;
                    return item;
                });
                this.data = this.data.filter((ref) => ref.subchannelId !== id);
                this.data = [...this.data, ...data];
                this.currentValues = {
                    plan: this.data.find((item) => item.graphType === 'plan')?.currentValue,
                    fact: this.data.find((item) => item.graphType === 'fact')?.currentValue,
                };
            }),
        });
    }

    private createVirtualChannel(subchannelId: string): VirtualChannel<GraphStructure> {
        const virtualChannel = new VirtualChannel<GraphStructure>(this.widgetService, {
            subchannelId,
            channelId: this.widgetId,
        });

        this.virtualChannels.push({
            subchannelId,
            virtualChannel,
        });

        return virtualChannel;
    }

    private unSubscribeVirtualChannel(predictorId: string): void {
        this.data = this.data.filter((ref) => ref.subchannelId !== predictorId);
        this.virtualChannelSubscriptions = this.virtualChannelSubscriptions.filter((ref) => {
            if (ref.subchannelId === predictorId) {
                ref.subscription.unsubscribe();
            }
            return ref.subchannelId !== predictorId;
        });
        this.virtualChannels = this.virtualChannels.filter((ref) => {
            if (ref.subchannelId === predictorId) {
                ref.virtualChannel.dispose();
            }
            return ref.subchannelId !== predictorId;
        });
    }

    private unSubscribeVirtualChannels(): void {
        this.virtualChannelSubscriptions.forEach((ref) => ref.subscription.unsubscribe());
        this.virtualChannels.forEach((sub) => sub.virtualChannel.dispose());
        this.virtualChannelSubscriptions = [];
        this.virtualChannels = [];
    }

    public get nextHourPlan(): number {
        return this.data?.find((x) => x.multiChartTypes === 'plan')?.currentValue ?? null;
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        this.ecWidgetService.dropDataStream();
        this.ecWidgetService.sharedPlanningGraph$.next(null);
        this.ecWidgetService.multilineChartIndicatorTitle$.next('');
        this.ecWidgetService.multilineChartTransfer.next(null);
        this.unSubscribeVirtualChannels();
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

    protected dataHandler(ref): void {
        if (!this.newStructureMenuData) {
            this.newStructureMenuData = ref;
            this.setFormValues(this.newStructureMenuData);
        }
    }

    private setFormValues(ref: { menu: IAstueOnpzReferences }): void {
        const menu = ref?.menu;

        const manufactureId = menu?.manufacturies.find(
            (item) => item.name === this.ecWidgetConventionalFuelService.defaultSelectOptionsNewScheme.manufacture
        )?.id;
        const unitId = menu?.units.find(
            (item) =>
                item.name === this.ecWidgetConventionalFuelService.defaultSelectOptionsNewScheme.unit &&
                item.parentId === manufactureId
        )?.id;
        const resourceId = menu?.energyResources.find(
            (item) =>
                item.name === this.ecWidgetConventionalFuelService.defaultSelectOptionsNewScheme.resource &&
                item.parentId === unitId
        )?.id;

        this.ecWidgetConventionalFuelService.selectReferences$.next(menu);

        this.selectionForm.get('manufacture').setValue(this.selectionForm.value.manufacture ?? manufactureId);
        this.selectionForm.get('unit').setValue(this.selectionForm.value.unit ?? unitId);
        this.selectionForm.get('resource').setValue(this.selectionForm.value.resource ?? resourceId);
    }

    public getMenuUnits(): IAstueOnpzReferenceModel[] {
        return this.newStructureMenuData?.menu.units.filter(
            (item) => item.parentId === this.selectionForm.get('manufacture').value
        );
    }

    public getEnergyResource(): IAstueOnpzReferenceModel[] {
        return this.newStructureMenuData?.menu.energyResources.filter(
            (item) => item.parentId === this.selectionForm.get('unit').value
        );
    }

    public goToMainScreen(): void {
        this.userSettingsService.loadScreenByWidget('astue-onpz-menu-structure');
    }

    public mouseOnGraph(): void {
        this.onMouseEnter();
        this.showCurrent = false;
        this.predictorsCurrentValue$ = this.predictors$;
    }

    public mouseLeaveGraph(): void {
        this.onMouseExit();
        this.showCurrent = true;
        this.predictorsCurrentValue$ = this.ecWidgetService.predictorsCurrentValue$;
    }
}

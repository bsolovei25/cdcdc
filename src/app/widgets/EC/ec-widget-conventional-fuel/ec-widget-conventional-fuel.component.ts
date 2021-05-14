import { ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { IDatesInterval, WidgetService } from '@dashboard/services/widget.service';
import { IMultiChartLine } from '@dashboard/models/ASTUE-ONPZ/astue-onpz-multi-chart.model';
import { UserSettingsService } from '@dashboard/services/user-settings.service';
import { EcWidgetService } from '../ec-widget-shared/ec-widget.service';
import { IMultiChartOptions } from './components/ec-widget-multi-chart/ec-widget-multi-chart.component';
import { IChartMini } from '@shared/interfaces/smart-scroll.model';
import {
    EcWidgetConventionalFuelService,
    IAstueOnpzConventionalFuelTransfer,
    IAstueOnpzReferenceModel, IAstueOnpzReferences
} from './ec-widget-conventional-fuel.service';
import { BehaviorSubject, combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { ScreenshotMaker } from '@core/classes/screenshot.class';
import { ReportsService } from '@dashboard/services/widgets/admin-panel/reports.service';
import { VirtualChannel } from '@shared/classes/virtual-channel.class';

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
    public isNewStructure: boolean = false;
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

    // public selectFuel: FormControl = new FormControl({
    //     value: '',
    //     disabled: false,
    // });

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
        manufacture: new FormControl(null),
        unit: new FormControl(null),
        resource: new FormControl(null),
    });

    public manufacturesReference$: Observable<
        IAstueOnpzReferenceModel[]
    > = this.astueOnpzConventionalFuelService.selectReferences$.pipe(map((x) => x?.manufacturies));
    public unitsReference$: Observable<IAstueOnpzReferenceModel[]> = combineLatest([
        this.astueOnpzConventionalFuelService.selectReferences$.pipe(map((x) => x?.units)),
        this.selectionForm.get('manufacture').valueChanges,
    ]).pipe(map(([units, manufacture]) => units?.filter((u) => u.parentId === manufacture)));
    public resourcesReference$: Observable<IAstueOnpzReferenceModel[]> = combineLatest([
        this.astueOnpzConventionalFuelService.selectReferences$.pipe(map((x) => x?.energyResources)),
        this.selectionForm.get('unit').valueChanges,
    ]).pipe(map(([resources, unit]) => resources?.filter((r) => r.parentId === unit)));

    private virtualChannel: VirtualChannel<GraphStructure>;

    private virtualChannelSubscription: Subscription[] = [];

    private newStructureMenuData: MenuStructure | null = null;

    private virtualChannels: VirtualChannel<GraphStructure>[] = []

    constructor(
        private reportService: ReportsService,
        protected widgetService: WidgetService,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private astueOnpzService: EcWidgetService,
        private userSettingsService: UserSettingsService,
        public astueOnpzConventionalFuelService: EcWidgetConventionalFuelService,
        private changeDetection: ChangeDetectorRef
    ) {
        super(widgetService, id, uniqId);
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
                .subscribe((x) => {
                    this.astueOnpzService.setSelectedEnergyResource(x.resource);
                    return this.astueOnpzConventionalFuelService.changeSelectedForm(x);
                })
        );
    }

    private async loadReferences(widgetId: string): Promise<void> {
        if (!widgetId) {
            return;
        }
        const ref = await this.astueOnpzConventionalFuelService.getSelectionReferences(widgetId);

        const manufactureId = ref?.manufacturies.find(
            (item) => item.name === this.astueOnpzConventionalFuelService.defaultSelectOptions.manufacture
        )?.id;
        const unitId = ref?.units.find(
            (item) =>
                item.name === this.astueOnpzConventionalFuelService.defaultSelectOptions.unit &&
                item.parentId === manufactureId
        )?.id;
        const resId = ref?.energyResources.find(
            (item) =>
                item.name === this.astueOnpzConventionalFuelService.defaultSelectOptions.resource &&
                item.parentId === unitId
        )?.id;

        this.selectionForm.get('manufacture').setValue(this.selectionForm.value.manufacture ?? manufactureId);
        this.selectionForm.get('unit').setValue(this.selectionForm.value.unit ?? unitId);
        this.selectionForm.get('resource').setValue(this.selectionForm.value.resource ?? resId);

        this.astueOnpzConventionalFuelService.selectReferences$.next(ref);
    }

    async takeScreenshot(): Promise<void> {
        const screenshotHelper = new ScreenshotMaker();
        const screenshot = await screenshotHelper.takeScreenshot(this.chartComponent.nativeElement);
        await this.reportService.sendScreenshot(screenshot);
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.isPredictors = this.widgetType === 'astue-onpz-conventional-fuel-predictors' || this.widgetType === 'ec-widget-conventional-fuel';
        this.isNewStructure = this.widgetType === 'ec-widget-conventional-fuel';
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
            // this.astueOnpzService.multiLinePredictors.subscribe((data) => {
            //     if (!this.isPredictors) {
            //         return;
            //     }
            //     console.log(data)
            //     // this.data = !!data ? this.multilineDataMapper(data) : this.isNewStructure ? this.data : [];
            //     this.currentValues = {
            //         plan: this.data.find((item) => item.graphType === 'plan')?.currentValue,
            //         fact: this.data.find((item) => item.graphType === 'fact')?.currentValue,
            //     };
            // }),

            this.astueOnpzService.colors$.subscribe((value) => {
                this.colors = value;
                // this.colors.set('avt-10-fuel-consumption-PlanValue', 2)
            }),
        );

        // if (this.isNewStructure) {
        //     this.subscriptions.push(
        //         this.connectVirtualChannel().subscribe(res => {
        //             console.log('-------------------------------')
        //             this.setGraphData(res);
        //         }),
        //     );
        // }

        this.astueOnpzService.predictorsOptions$.subscribe(predictors => {
            const predictorsId = predictors?.predictors.map(predictor => predictor?.id);
            if (predictorsId?.length) {
                this.unSubscribeVirtualChannels();

                predictorsId.forEach(id => {
                    this.virtualChannels.push(
                        new VirtualChannel <GraphStructure>(this.widgetService, {
                            channelId: this.widgetId,
                            subchannelId: id,
                        })
                    )
                });

                const virtualChannelsSubj = this.virtualChannels.map(item => item.data$);

                this.virtualChannelSubscription.push(
                    combineLatest([...virtualChannelsSubj, this.connectConventionFuelChannel()])
                        .subscribe((ref) => {
                        this.data = ref.map(item => this.multilineDataMapper(item.graphs)).flat(1);
                    })
                )
            } else {
                this.unSubscribeVirtualChannels();
                this.virtualChannelSubscription.push(
                    this.connectConventionFuelChannel().subscribe(res => {
                        this.data = this.multilineDataMapper(res.graphs)
                    })
                )
            }
        })
    }

    private  unSubscribeVirtualChannels(): void {
        this.virtualChannelSubscription.forEach(sub => sub.unsubscribe())
        this.virtualChannels.forEach(sub => sub?.dispose())
        this.virtualChannels = [];
        this.virtualChannelSubscription = [];
        this.data = [];
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
        // this.virtualChannelSubscription?.unsubscribe();
        this.virtualChannel?.dispose();
        this.unSubscribeVirtualChannels();
    }

    private setGraphData(ref: { graphs: IMultiChartLine[] }): void {
        if (!this.isPredictors || this.isNewStructure) {
            if (ref?.graphs) {
                this.data = this.multilineDataMapper(ref.graphs);
                return;
            }
            this.data = [];
        }
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
        // if (this.isNewStructure) {
            if (!this.newStructureMenuData) {
                this.newStructureMenuData = ref;
                this.setFormValues(this.newStructureMenuData);
            }
        // } else {
        //     if (!this.isPredictors) {
        //         if (ref?.graphs) {
        //             this.data = this.multilineDataMapper(ref.graphs);
        //             return;
        //         }
        //         this.data = [];
        //     }
        // }
    }

    private setFormValues(ref: {menu: IAstueOnpzReferences}): void {
        const menu = ref?.menu;

        const manufactureId = menu?.manufacturies.find(
            (item) => item.name === this.astueOnpzConventionalFuelService.defaultSelectOptionsNewScheme.manufacture
        )?.id;
        const unitId = menu?.units.find(
            (item) =>
                item.name === this.astueOnpzConventionalFuelService.defaultSelectOptionsNewScheme.unit &&
                item.parentId === manufactureId
        )?.id;
        const resourceId = menu?.energyResources.find(
            (item) =>
                item.name === this.astueOnpzConventionalFuelService.defaultSelectOptionsNewScheme.resource &&
                item.parentId === unitId
        )?.id;

        this.astueOnpzConventionalFuelService.selectReferences$.next(menu);

        this.selectionForm.get('manufacture').setValue(this.selectionForm.value.manufacture ?? manufactureId);
        this.selectionForm.get('unit').setValue(this.selectionForm.value.unit ?? unitId);
        this.selectionForm.get('resource').setValue(this.selectionForm.value.resource ?? resourceId);
    }

    public goToMainScreen(): void {
        this.userSettingsService.loadScreenByWidget('astue-onpz-menu-structure');
    }

    public mouseOnGraph(): void {
        this.onMouseEnter();
        this.showCurrent = false;
    }

    public mouseLeaveGraph(): void {
        this.onMouseExit();
        this.showCurrent = true;
    }

    private connectConventionFuelChannel(): Observable<GraphStructure> {
        return this.astueOnpzService.selectedEnergyResource$
            .pipe(
                switchMap((id: string): Subject<GraphStructure> => {
                    this.virtualChannel = new VirtualChannel<GraphStructure>(this.widgetService, {
                        channelId: this.widgetId,
                        subchannelId: id,
                    });
                    return this.virtualChannel.data$
                })
            )
    }
}

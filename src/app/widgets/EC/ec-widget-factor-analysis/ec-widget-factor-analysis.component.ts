import { Component, ElementRef, Inject, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { astueOnpzFactoryAnalysisBarMapper } from './functions/ec-widget-factor-analysis.function';
import {
    IAstueOnpzFactoryAnalysis,
    IAstueOnpzFactoryAnalysisBarResponse,
    IAstueOnpzFactoryAnalysisBarResponseSection,
    IAstueOnpzFactoryAnalysisDiagram,
    IAstueOnpzFactoryAnalysisWsOptions,
} from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-factory-analysis.model';
import { EcWidgetFactorAnalysisChartPageComponent } from './components/ec-widget-factor-analysis-chart-page/ec-widget-factor-analysis-chart-page.component';
import { AstueOnpzMnemonicFurnaceService } from '../astue-onpz-mnemonic-furnace/astue-onpz-mnemonic-furnace.service';
import { IAstueOnpzMnemonicFurnaceOptions } from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-mnemonic-furnace.model';
import { EcWidgetConventionalFuelService } from '../ec-widget-conventional-fuel/ec-widget-conventional-fuel.service';
import { HttpClient } from '@angular/common/http';
import { ScreenshotMaker } from '@core/classes/screenshot.class';
import { ReportsService } from '../../../dashboard/services/widgets/admin-panel/reports.service';
import { EcWidgetService } from "@widgets/EC/ec-widget-shared/ec-widget.service";
import { switchMap } from "rxjs/operators";
import { VirtualChannel } from "@shared/classes/virtual-channel.class";
// import { IAstueOnpzMainIndicatorsRaw } from "@widgets/EC/ec-widget-main-indicators/ec-widget-main-indicators.interface";

type AstueOnpzFactoryAnalysisType = 'Unit' | 'Furnace';

@Component({
    selector: 'evj-ec-widget-factor-analysis',
    templateUrl: './ec-widget-factor-analysis.component.html',
    styleUrls: ['./ec-widget-factor-analysis.component.scss'],
    animations: [
        trigger('leftTrigger', [
            transition('void => *', [
                style({ position: 'absolute', opacity: 0.5, transform: 'translateX(100%)' }),
                animate(
                    '300ms',
                    style({
                        opacity: 1,
                        transform: 'translateX(0%)',
                    })
                ),
            ]),
            transition('* => void', [
                style({ opacity: 1 }),
                animate('300ms', style({ position: 'absolute', opacity: 0.5, transform: 'translateX(100%)' })),
            ]),
        ]),
        trigger('rightTrigger', [
            transition('void => *', [
                style({ position: 'absolute', opacity: 0.5, transform: 'translateX(-100%)' }),
                animate(
                    '300ms',
                    style({
                        opacity: 1,
                        transform: 'translateX(0%)',
                    })
                ),
            ]),
            transition('* => void', [
                style({ opacity: 1 }),
                animate('300ms', style({ position: 'absolute', opacity: 0.5, transform: 'translateX(-100%)' })),
            ]),
        ]),
    ],
})
export class EcWidgetFactorAnalysisComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    @ViewChild('chart') chartContainer: ElementRef;

    public pageType$: BehaviorSubject<'chart' | 'bar'> = new BehaviorSubject<'chart' | 'bar'>('bar');
    public viewType$: BehaviorSubject<AstueOnpzFactoryAnalysisType> = new BehaviorSubject<AstueOnpzFactoryAnalysisType>(
        null
    );
    public subchannelId$: BehaviorSubject<string | null>;

    public data: IAstueOnpzFactoryAnalysis | null = null;

    // public selectedChannelId: string | null = null;

    // public readonly chartPageComponent: typeof EcWidgetFactorAnalysisChartPageComponent = EcWidgetFactorAnalysisChartPageComponent;

    public barData: IAstueOnpzFactoryAnalysisDiagram = null;

    // public selectionReference: { id: string; name: string }[] = [];

    private virtualChannel: VirtualChannel<IAstueOnpzFactoryAnalysisBarResponse>;

    constructor(
        private http: HttpClient,
        private reportService: ReportsService,
        private conventionalFuelService: EcWidgetConventionalFuelService,
        private mnemonicFurnaceService: AstueOnpzMnemonicFurnaceService,
        protected widgetService: WidgetService,
        private astueOnpzService: EcWidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        // private injector: Injector
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
        // this.subscriptions.push(
        //     this.mnemonicFurnaceService.selectedItem$.subscribe((item) => {
        //         this.selectedChannelId = item;
        //         if (!!item) {
        //             this.changePage('chart');
        //         }
        //     })
        // );

        this.subchannelId$ = this.astueOnpzService.selectedEnergyResource$;
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.virtualChannel?.dispose();
    }

    // public changePage(type: 'chart' | 'bar'): void {
    //     if (this.pageType$.getValue() === type) {
    //         return;
    //     }
    //     this.pageType$.next(type);
    // }

    // public getInjector = (widgetId: string): Injector => {
    //     return Injector.create({
    //         providers: [
    //             { provide: 'widgetId', useValue: widgetId },
    //             { provide: 'channelId', useValue: '' },
    //         ],
    //         parent: this.injector,
    //     });
    // };

    protected dataConnect(): void {
        // super.dataConnect();
        // this.viewType$.next((this.attributes as any)?.Type === 'Unit' ? 'Unit' : 'Furnace');
        // // this.getMockData((this.attributes as any)?.Type === 'Unit' ? 'unit' : 'oven').then();
        // if (this.viewType$.value === 'Unit') {
        //     this.setWsOptions({
        //         manufactureName: 'Производство №1',
        //         unitName: 'АВТ-10',
        //         ovenName: '',
        //         resourceName: 'Топливо',
        //     });
        //     this.conventionalFuelService.selectedOptions$.subscribe((ref) => {
        //         this.setWsOptions({
        //             manufactureName: ref.manufacture,
        //             unitName: ref.unit,
        //             ovenName: '',
        //             resourceName: ref.resource,
        //         });
        //     });
        //     return;
        // }
        // this.subscriptions.push(
        //     this.mnemonicFurnaceService.furnaceOptions$
        //         .subscribe((ref) => this.setWsOptions(this.optionsMapper(ref)))
        // );

        this.subscriptions.push(
            this.connectVirtualChannel().subscribe(ref => {
                this.barData = astueOnpzFactoryAnalysisBarMapper(ref);
            }),
        );
    }

    protected dataHandler(ref: IAstueOnpzFactoryAnalysisBarResponse): void {
        // if (!ref.sections) {
        //     this.barData = null;
        //     return;
        // }
        // this.barData = astueOnpzFactoryAnalysisBarMapper(ref);
        // this.selectionReference = ref?.parameters ?? [];
    }

    private async getMockData(route: string): Promise<void> {
        const sourceData = {
            sections: await this.http
                .get<IAstueOnpzFactoryAnalysisBarResponseSection[]>(
                    `assets/mock/ASTUE-ONPZ/factor-analysis/${route}.mock.json`
                )
                .toPromise(),
        } as IAstueOnpzFactoryAnalysisBarResponse;
        this.barData = astueOnpzFactoryAnalysisBarMapper(sourceData);
    }

    private optionsMapper(ref: IAstueOnpzMnemonicFurnaceOptions): IAstueOnpzFactoryAnalysisWsOptions {
        const reference = this.mnemonicFurnaceService.furnaceOptionsReferences.getValue();
        const manufactureName = reference.manufactures.find((x) => x.id === ref.manufactureId)?.title;
        const unitName = reference.manufactures.flatMap((x) => x.units).find((x) => x.id === ref.unitId)?.title;
        const ovenName = reference.manufactures
            .flatMap((x) => x.units)
            .flatMap((x) => x.ovens)
            .find((x) => x.id === ref.ovenId)?.title;
        return {
            manufactureName,
            unitName,
            ovenName,
            manufactureId: ref.manufactureId,
            unitId: ref.unitId,
            ovenId: ref.ovenId,
        };
    }

    public async takeScreenshot(): Promise<void> {
        if (!this.chartContainer?.nativeElement) {
            return;
        }
        const screenshotHelper = new ScreenshotMaker();
        const screenshot = await screenshotHelper.takeScreenshot(this.chartContainer.nativeElement);
        await this.reportService.sendScreenshot(screenshot);
    }

    private connectVirtualChannel(): Observable<IAstueOnpzFactoryAnalysisBarResponse> {
        return this.astueOnpzService.selectedEnergyResource$
            .pipe(
                switchMap((id: string): Subject<IAstueOnpzFactoryAnalysisBarResponse> => {
                    if (!id) {
                        this.barData = null
                    }

                    this.virtualChannel = new VirtualChannel<IAstueOnpzFactoryAnalysisBarResponse>(this.widgetService, {
                        channelId: this.widgetId,
                        subchannelId: id,
                    });

                    return this.virtualChannel.data$;
                })
            )
    }
}

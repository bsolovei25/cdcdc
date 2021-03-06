import { Component, ElementRef, Inject, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { astueOnpzFactoryAnalysisBarMapper } from './functions/astue-onpz-factory-analysis.function';
import {
    IAstueOnpzFactoryAnalysis,
    IAstueOnpzFactoryAnalysisBarResponse,
    IAstueOnpzFactoryAnalysisBarResponseSection,
    IAstueOnpzFactoryAnalysisDiagram,
    IAstueOnpzFactoryAnalysisWsOptions,
} from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-factory-analysis.model';
import { AstueOnpzFactoryAnalysisChartPageComponent } from './components/astue-onpz-factory-analysis-chart-page/astue-onpz-factory-analysis-chart-page.component';
import { AstueOnpzMnemonicFurnaceService } from '../astue-onpz-mnemonic-furnace/astue-onpz-mnemonic-furnace.service';
import { IAstueOnpzMnemonicFurnaceOptions } from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-mnemonic-furnace.model';
import { AstueOnpzConventionalFuelService } from '../astue-onpz-conventional-fuel/astue-onpz-conventional-fuel.service';
import { HttpClient } from '@angular/common/http';
import { ScreenshotMaker } from '@core/classes/screenshot.class';
import { ReportsService } from '../../../dashboard/services/widgets/admin-panel/reports.service';

type AstueOnpzFactoryAnalysisType = 'Unit' | 'Furnace';

@Component({
    selector: 'evj-astue-onpz-factory-analysis',
    templateUrl: './astue-onpz-factory-analysis.component.html',
    styleUrls: ['./astue-onpz-factory-analysis.component.scss'],
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
export class AstueOnpzFactoryAnalysisComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    @ViewChild('chart') chartContainer: ElementRef;

    public pageType$: BehaviorSubject<'chart' | 'bar'> = new BehaviorSubject<'chart' | 'bar'>('bar');
    public viewType$: BehaviorSubject<AstueOnpzFactoryAnalysisType> = new BehaviorSubject<AstueOnpzFactoryAnalysisType>(
        null
    );

    public data: IAstueOnpzFactoryAnalysis | null = null;

    public selectedChannelId: string | null = null;

    public readonly chartPageComponent: typeof AstueOnpzFactoryAnalysisChartPageComponent = AstueOnpzFactoryAnalysisChartPageComponent;

    public barData: IAstueOnpzFactoryAnalysisDiagram = null;

    public selectionReference: { id: string; name: string }[] = [];

    constructor(
        private http: HttpClient,
        private reportService: ReportsService,
        private conventionalFuelService: AstueOnpzConventionalFuelService,
        private mnemonicFurnaceService: AstueOnpzMnemonicFurnaceService,
        protected widgetService: WidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private injector: Injector
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
        this.subscriptions.push(
            this.mnemonicFurnaceService.selectedItem$.subscribe((item) => {
                this.selectedChannelId = item;
                if (!!item) {
                    this.changePage('chart');
                }
            })
        );
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    public changePage(type: 'chart' | 'bar'): void {
        if (this.pageType$.getValue() === type) {
            return;
        }
        this.pageType$.next(type);
    }

    public getInjector = (widgetId: string): Injector => {
        return Injector.create({
            providers: [
                { provide: 'widgetId', useValue: widgetId },
                { provide: 'channelId', useValue: '' },
            ],
            parent: this.injector,
        });
    };

    protected dataConnect(): void {
        super.dataConnect();
        this.viewType$.next((this.attributes as any)?.Type === 'Unit' ? 'Unit' : 'Furnace');
        // this.getMockData((this.attributes as any)?.Type === 'Unit' ? 'unit' : 'oven').then();
        if (this.viewType$.value === 'Unit') {
            this.setWsOptions({
                manufactureName: '???????????????????????? ???1',
                unitName: '??????-10',
                ovenName: '',
                resourceName: '??????????????',
            });
            this.conventionalFuelService.selectedOptions$.subscribe((ref) => {
                console.log('selectedOptions', ref);
                this.setWsOptions({
                    manufactureName: ref.manufacture,
                    unitName: ref.unit,
                    ovenName: '',
                    resourceName: ref.resource,
                });
            });
            return;
        }
        this.subscriptions.push(
            this.mnemonicFurnaceService.furnaceOptions$
                .pipe()
                .subscribe((ref) => this.setWsOptions(this.optionsMapper(ref)))
        );
    }

    protected dataHandler(ref: IAstueOnpzFactoryAnalysisBarResponse): void {
        if (!ref.sections) {
            this.barData = null;
            return;
        }
        this.barData = astueOnpzFactoryAnalysisBarMapper(ref);
        this.selectionReference = ref?.parameters ?? [];
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
}

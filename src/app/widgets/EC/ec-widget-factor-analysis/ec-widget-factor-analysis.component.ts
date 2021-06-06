import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription } from "rxjs";
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '@dashboard/services/widget.service';
import { astueOnpzFactoryAnalysisBarMapper } from './functions/ec-widget-factor-analysis.function';
import {
    IAstueOnpzFactoryAnalysis,
    IAstueOnpzFactoryAnalysisBarResponse,
    IAstueOnpzFactoryAnalysisDiagram,
} from '@dashboard/models/ASTUE-ONPZ/astue-onpz-factory-analysis.model';
import { EcWidgetConventionalFuelService } from '../ec-widget-conventional-fuel/ec-widget-conventional-fuel.service';
import { HttpClient } from '@angular/common/http';
import { ScreenshotMaker } from '@core/classes/screenshot.class';
import { ReportsService } from '@dashboard/services/widgets/admin-panel/reports.service';
import { EcWidgetService } from "@widgets/EC/ec-widget-shared/ec-widget.service";
import { VirtualChannel } from "@shared/classes/virtual-channel.class";

@Component({
    selector: 'evj-ec-widget-factor-analysis',
    templateUrl: './ec-widget-factor-analysis.component.html',
    styleUrls: ['./ec-widget-factor-analysis.component.scss'],
})
export class EcWidgetFactorAnalysisComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    @ViewChild('chart') chartContainer: ElementRef;

    public subchannelId$: BehaviorSubject<string | null>;

    public data: IAstueOnpzFactoryAnalysis | null = null;

    public barData: IAstueOnpzFactoryAnalysisDiagram = null;

    private virtualChannel: VirtualChannel<IAstueOnpzFactoryAnalysisBarResponse>;
    private virtualChannelSubscription: Subscription;

    constructor(
        private http: HttpClient,
        private reportService: ReportsService,
        private conventionalFuelService: EcWidgetConventionalFuelService,
        protected widgetService: WidgetService,
        private ecWidgetService: EcWidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
        this.subchannelId$ = this.ecWidgetService.selectedEnergyResource$;
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.virtualChannelSubscription?.unsubscribe();
    }

    protected dataConnect(): void {
        super.dataConnect();

        this.subscriptions.push(
            this.ecWidgetService.selectedEnergyResource$.subscribe(energyResourceId => {
                this.barData = null;
                this.virtualChannel?.dispose();
                this.virtualChannelSubscription?.unsubscribe();

                if (energyResourceId) {
                    this.virtualChannel = new VirtualChannel<IAstueOnpzFactoryAnalysisBarResponse>(this.widgetService, {
                        channelId: this.widgetId,
                        subchannelId: energyResourceId
                    });

                    this.virtualChannelSubscription = this.virtualChannel.data$.subscribe(res => {
                        this.barData = astueOnpzFactoryAnalysisBarMapper(res);
                    })
                }
            })
        )
    }

    protected dataHandler(ref: IAstueOnpzFactoryAnalysisBarResponse): void {
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

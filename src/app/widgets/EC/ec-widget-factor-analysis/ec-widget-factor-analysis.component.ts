import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '@dashboard/services/widget.service';
import { astueOnpzFactoryAnalysisBarMapper } from './functions/ec-widget-factor-analysis.function';
import {
    IAstueOnpzFactoryAnalysis,
    IAstueOnpzFactoryAnalysisBarResponse,
    IAstueOnpzFactoryAnalysisDiagram,
} from '@dashboard/models/ASTUE-ONPZ/astue-onpz-factory-analysis.model';
import { AstueOnpzMnemonicFurnaceService } from '../astue-onpz-mnemonic-furnace/astue-onpz-mnemonic-furnace.service';
import { EcWidgetConventionalFuelService } from '../ec-widget-conventional-fuel/ec-widget-conventional-fuel.service';
import { HttpClient } from '@angular/common/http';
import { ScreenshotMaker } from '@core/classes/screenshot.class';
import { ReportsService } from '@dashboard/services/widgets/admin-panel/reports.service';
import { EcWidgetService } from "@widgets/EC/ec-widget-shared/ec-widget.service";
import { switchMap } from "rxjs/operators";
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

    constructor(
        private http: HttpClient,
        private reportService: ReportsService,
        private conventionalFuelService: EcWidgetConventionalFuelService,
        private mnemonicFurnaceService: AstueOnpzMnemonicFurnaceService,
        protected widgetService: WidgetService,
        private astueOnpzService: EcWidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
        this.subchannelId$ = this.astueOnpzService.selectedEnergyResource$;
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.virtualChannel?.dispose();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.subscriptions.push(
            this.connectVirtualChannel().subscribe(ref => {
                this.barData = astueOnpzFactoryAnalysisBarMapper(ref);
            }),
        );
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

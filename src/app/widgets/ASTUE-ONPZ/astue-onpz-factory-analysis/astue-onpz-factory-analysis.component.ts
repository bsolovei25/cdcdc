import { Component, Inject, Injector, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { astueOnpzFactoryAnalysisBarMapper } from './functions/astue-onpz-factory-analysis.function';
import {
    IAstueOnpzFactoryAnalysis,
    IAstueOnpzFactoryAnalysisBarResponse,
    IAstueOnpzFactoryAnalysisDiagram,
    IAstueOnpzFactoryAnalysisWsOptions,
} from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-factory-analysis.model';
import { AstueOnpzFactoryAnalysisChartPageComponent } from './components/astue-onpz-factory-analysis-chart-page/astue-onpz-factory-analysis-chart-page.component';
import { AstueOnpzMnemonicFurnaceService } from '../astue-onpz-mnemonic-furnace/astue-onpz-mnemonic-furnace.service';
import { IAstueOnpzMnemonicFurnaceOptions } from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-mnemonic-furnace.model';

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
                animate(
                    '300ms',
                    style({ position: 'absolute', opacity: 0.5, transform: 'translateX(100%)' })
                ),
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
                animate(
                    '300ms',
                    style({ position: 'absolute', opacity: 0.5, transform: 'translateX(-100%)' })
                ),
            ]),
        ]),
    ],
})
export class AstueOnpzFactoryAnalysisComponent extends WidgetPlatform<unknown> implements OnInit {
    public pageType$: BehaviorSubject<'chart' | 'bar'> = new BehaviorSubject<'chart' | 'bar'>(
        'bar'
    );
    public viewType$: BehaviorSubject<AstueOnpzFactoryAnalysisType> = new BehaviorSubject<
        AstueOnpzFactoryAnalysisType
    >(null);

    public data: IAstueOnpzFactoryAnalysis | null = null;

    public selectedChannelId: string | null = null;

    public readonly chartPageComponent: typeof AstueOnpzFactoryAnalysisChartPageComponent = AstueOnpzFactoryAnalysisChartPageComponent;

    public barData: IAstueOnpzFactoryAnalysisDiagram = null;

    constructor(
        private mnemonicFurnaceService: AstueOnpzMnemonicFurnaceService,
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private injector: Injector,
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
        this.mnemonicFurnaceService.selectedItem$.subscribe(item => {
            this.selectedChannelId = item;
        });
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
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.viewType$.next((this.attributes as any)?.Type === 'Unit' ? 'Unit' : 'Furnace');
        if (this.viewType$.value === 'Unit') {
            this.setWsOptions({
                manufactureName: 'Производство №1',
                unitName: 'АВТ-10',
                ovenName: '',
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
        console.log(ref, 'astue-onpz-factory-analysis');
        if (!ref.sections) {
            this.barData = null;
            return;
        }
        this.barData = astueOnpzFactoryAnalysisBarMapper(ref);
    }

    private optionsMapper(
        ref: IAstueOnpzMnemonicFurnaceOptions
    ): IAstueOnpzFactoryAnalysisWsOptions {
        const reference = this.mnemonicFurnaceService.furnaceOptionsReferences.getValue();
        const manufactureName = reference.manufactures.find((x) => x.id === ref.manufactureId)
            ?.title;
        const unitName = reference.manufactures
            .flatMap((x) => x.units)
            .find((x) => x.id === ref.unitId)?.title;
        const ovenName = reference.manufactures
            .flatMap((x) => x.units)
            .flatMap((x) => x.ovens)
            .find((x) => x.id === ref.ovenId)?.title;
        return {
            manufactureName,
            unitName,
            ovenName,
        };
    }
}

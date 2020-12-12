import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { animate, style, transition, trigger } from '@angular/animations';
import {
  IAstueOnpzFactoryAnalysis,
  IAstueOnpzFactoryAnalysisWsOptions
} from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-factory-analysis.model';

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

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.isRealtimeData = true;
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    public changePage(type: 'chart' | 'bar'): void {
        if (this.pageType$.getValue() === type) {
            return;
        }
        this.pageType$.next(type);
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.viewType$.next((this.attributes as any)?.Type === 'Unit' ? 'Unit' : 'Furnace');
        // TODO подписка на сервис получения опций
        this.subscriptions.push();
        const options = {
          ManufactureName: 'Производство №1',
          UnitName: 'АВТ-10',
          OvenName: '',
        };
        this.setWsOptions(options);
    }

    protected dataHandler(ref: IAstueOnpzFactoryAnalysis): void {
        this.data = ref;
        console.log(ref, 'astue-onpz-factory-analysis');
    }

    private setWsOptions(options: IAstueOnpzFactoryAnalysisWsOptions): void {
        this.widgetService.setChannelLiveDataFromWsOptions(this.id, options);
    }
}

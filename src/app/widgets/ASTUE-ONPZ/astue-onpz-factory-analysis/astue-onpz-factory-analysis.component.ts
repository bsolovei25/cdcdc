import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { animate, style, transition, trigger } from '@angular/animations';

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
export class AstueOnpzFactoryAnalysisComponent extends WidgetPlatform implements OnInit {
    public pageType$: BehaviorSubject<'chart' | 'bar'> = new BehaviorSubject<'chart' | 'bar'>(
        'bar'
    );
    public viewType$: BehaviorSubject<AstueOnpzFactoryAnalysisType> = new BehaviorSubject<
        AstueOnpzFactoryAnalysisType
    >(null);

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.isRealtimeData = false;
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.viewType$.next((this.attributes as any)?.Type === 'Unit' ? 'Unit' : 'Furnace');
    }

    public changePage(type: 'chart' | 'bar'): void {
        if (this.pageType$.getValue() === type) {
            return;
        }
        this.pageType$.next(type);
    }

    protected dataHandler(ref: unknown): void {}
}

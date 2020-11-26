import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'evj-astue-onpz-factory-analysis',
    templateUrl: './astue-onpz-factory-analysis.component.html',
    styleUrls: ['./astue-onpz-factory-analysis.component.scss'],
    animations: [
        trigger('leftTrigger', [
            transition('void => *', [
                style({ opacity: 0.5, transform: 'translateX(100%)' }),
                animate(
                    '200ms',
                    style({
                        opacity: 1,
                        transform: 'translateX(0%)',
                    })
                ),
            ]),
            transition('* => void', [
                style({ opacity: 1 }),
                animate('200ms', style({ opacity: 0.5, transform: 'translateX(100%)' })),
            ]),
        ]),
        trigger('rightTrigger', [
            transition('void => *', [
                style({ position: 'absolute', opacity: 0.5, transform: 'translateX(-100%)' }),
                animate(
                    '200ms',
                    style({
                        opacity: 1,
                        transform: 'translateX(0%)',
                    })
                ),
            ]),
            transition('* => void', [
                style({ opacity: 1 }),
                animate(
                    '200ms',
                    style({ position: 'absolute', opacity: 0.5, transform: 'translateX(-100%)' })
                ),
            ]),
        ]),
    ],
})
export class AstueOnpzFactoryAnalysisComponent extends WidgetPlatform implements OnInit {
    public pageType$: BehaviorSubject<'chart' | 'bar'> = new BehaviorSubject<'chart' | 'bar'>(
        'chart'
    );

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

    public changePage(type: 'chart' | 'bar'): void {
        if (this.pageType$.getValue() === type) {
            return;
        }
        this.pageType$.next(type);
    }

    protected dataHandler(ref: unknown): void {}
}

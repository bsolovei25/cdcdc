import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { BehaviorSubject } from 'rxjs';

export interface IKpeTableHeader {
    name: string;
    id: string;
}
export interface IKpeTable {
    unit: { description?: string; name: string };
    parameters: IKpeTableBody[];
}
export interface IKpeTableBody {
    id: number;
    name: string;
    plan: number;
    average: number;
    instant: number;
    accumulation: number;
    percentPlan: string;
    predictPercent: number;
    deviationValue: number;
    deviationPercent: string;
    recommended: number;
    isNotCritical?: number;
    isCritical?: number;
    isDeviation?: number;
}
@Component({
  selector: 'evj-kpe-table',
  templateUrl: './kpe-table.component.html',
  styleUrls: ['./kpe-table.component.scss']
})
export class KpeTableComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public pageType$: BehaviorSubject<'development' | 'loading'> = new BehaviorSubject<'development' | 'loading'>(
        'development'
    );


    constructor(
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    protected dataHandler(ref: any): void {

    }
    public changePage(type: 'development' | 'loading'): void {
        if (this.pageType$.getValue() === type) {
            return;
        }
        this.pageType$.next(type);
    }

}

import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { FormControl, FormGroup } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import {
    IKpeChartsAnalyticEntryStates,
    IKpeChartsAnalyticSharedStates,
} from '../../../dashboard/models/KPE/kpe-charts-analytic.model';
import { debounceTime, distinctUntilChanged, map, withLatestFrom } from 'rxjs/operators';
import { KpeChartsAnalyticService } from '../../../dashboard/services/widgets/KPE/kpe-charts-analytic.service';
import { KpeHelperService } from "../shared/kpe-helper.service";

@Component({
    selector: 'evj-kpe-charts-analytic',
    templateUrl: './kpe-charts-analytic.component.html',
    styleUrls: ['./kpe-charts-analytic.component.scss'],
})
export class KpeChartsAnalyticComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public entryStates: FormGroup = new FormGroup({
        manufacture: new FormControl(),
        unit: new FormControl(),
        element: new FormControl(), // TODO: refactor name
        viewType: new FormControl(),
        chartType: new FormControl(),
        engUnit: new FormControl(),
        dateInterval: new FormControl(),
        isSync: new FormControl(),
    });

    public sharedStates: FormGroup = new FormGroup({
        dateStart: new FormControl(),
        dateEnd: new FormControl(),
    });

    private entryStates$: Observable<IKpeChartsAnalyticEntryStates> = this.entryStates.valueChanges;
    private sharedStates$: Observable<
        IKpeChartsAnalyticSharedStates
    > = this.sharedStates.valueChanges.pipe(distinctUntilChanged(), debounceTime(100));

    constructor(
        private chartsAnalyticService: KpeChartsAnalyticService,
        private kpeHelperService: KpeHelperService,
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
        this.subscriptions.push(
            combineLatest([this.entryStates$, this.sharedStates$])
                .pipe(map((x) => ({ ...x[0], ...x[1] })))
                .subscribe((x) => console.log('form', x)),
            combineLatest([
                this.sharedStates$,
                this.entryStates.get('isSync').valueChanges,
            ]).subscribe((x) => {
                if (!x[1]) {
                    return;
                }
                this.chartsAnalyticService.syncStates$.next({ ...x[0] });
            }),
            this.chartsAnalyticService.syncStates$.subscribe((x) => {
                if (!!this.entryStates.get('isSync').value) {
                    return;
                }
                console.log('sync', x);
                this.sharedStates.get('dateStart').setValue(x.dateStart);
                this.sharedStates.get('dateEnd').setValue(x.dateEnd);
            })
        );
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    syncChange(value: boolean): void {
        this.entryStates.get('isSync').setValue(value);
    }

    protected dataHandler(ref: unknown): void {}
}

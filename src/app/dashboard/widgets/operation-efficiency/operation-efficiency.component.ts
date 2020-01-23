import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';
import { IOperationEfficiency } from '../../models/operation-efficiency';

@Component({
    selector: 'evj-operation-efficiency',
    templateUrl: './operation-efficiency.component.html',
    styleUrls: ['./operation-efficiency.component.scss'],
})
export class OperationEfficiencyComponent implements OnInit, OnDestroy {
    static itemCols: number = 18;
    static itemRows: number = 6;

    public subscriptions: Subscription[] = [];

    /* Приблизительная структура, получаемая с бека */

    public data: IOperationEfficiency = {
        plan: 1000,
        lowerBorder: 0.5,
        higherBorder: 0.5,
        curValue: 300,
        maxValue: 1500,

        /* Вычислить при получении данных */
        // lowerValue = this.data.plan * (1 - this.data.lowerBorder);
        // higherValue = this.data.plan * (1 + this.data.higherBorder);

        lowerValue: 1000 * (1 - 0.5),
        higherValue: 1000 * (1 + 0.5),
    };

    public title: string;
    public previewTitle: string = 'operation-efficiency';

    constructor(
        private widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscriptions.push(this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
            this.title = data.title;
            this.previewTitle = data.widgetType;
        }));
    }

    ngOnInit(): void {
        if (!this.isMock) {
            this.wsConnect();
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(el => el.unsubscribe());
    }

    wsConnect(): void {
        this.subscriptions.push(
            this.widgetService
                .getWidgetLiveDataFromWS(this.id, 'operation-efficiency')
                .subscribe((ref) => {
                    console.log(ref);
                    this.data = ref;
                    this.data.curValue = ref.currentValue;
                    this.data.lowerBorder = Math.abs(this.data.lowerBorder - this.data.plan) / this.data.plan;
                    this.data.higherBorder = (this.data.higherBorder - this.data.plan) / this.data.plan;
                    this.data.lowerValue = this.data.plan * (1 - this.data.lowerBorder);
                    this.data.higherValue = this.data.plan * (1 + this.data.higherBorder);
                    console.log(this.data);
                })
        );
    }
}

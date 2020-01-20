import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';
import { IOperationEfficiency } from '../../models/operation-efficiency';

@Component({
    selector: 'evj-operation-efficiency',
    templateUrl: './operation-efficiency.component.html',
    styleUrls: ['./operation-efficiency.component.scss'],
})
export class OperationEfficiencyComponent implements OnInit {
    static itemCols: number = 18;
    static itemRows: number = 6;

    public subscription: Subscription;

    /* Приблизительная структура, получаемая с бека */

    public data: IOperationEfficiency = {
        plan: 1000,
        lowerBorder: 0.03,
        higherBorder: 0.1,
        curValue: 1200,
        maxValue: 1500,

        /* Вычислить при получении данных */
        // lowerValue = this.data.plan * (1 - this.data.lowerBorder);
        // higherValue = this.data.plan * (1 + this.data.higherBorder);

        lowerValue: 1000 * (1 - 0.03),
        higherValue: 1000 * (1 + 0.1),
    };

    public title: string;
    public previewTitle: string;

    constructor(
        private widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscription = this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
            this.title = data.title;
            this.previewTitle = data.widgetType;
        });
    }

    ngOnInit() {}

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

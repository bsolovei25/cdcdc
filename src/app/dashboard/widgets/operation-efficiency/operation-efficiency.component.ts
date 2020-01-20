import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';

@Component({
    selector: 'evj-operation-efficiency',
    templateUrl: './operation-efficiency.component.html',
    styleUrls: ['./operation-efficiency.component.scss'],
})
export class OperationEfficiencyComponent implements OnInit {
    aboutWidget;

    static itemCols = 18;
    static itemRows = 6;

    subscription: Subscription;

    /* Приблизительная структура, получаемая с бека */

    data = {
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

    constructor(
        private widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscription = this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
            this.aboutWidget = data.title;
        });
    }

    ngOnInit() {}

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

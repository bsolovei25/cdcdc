import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';

@Component({
    selector: 'evj-ecology-safety',
    templateUrl: './ecology-safety.component.html',
    styleUrls: ['./ecology-safety.component.scss'],
})
export class EcologySafetyComponent implements OnInit {
    aboutWidget;

    static itemCols = 18;
    static itemRows = 2;

    subscription: Subscription;

    /* Приблизительная структура, получаемая с бека */

    data = {
        plan: 100, // план
        curValue: 80, // текущее значение
        maxValue: 120, // максимальное значение
    };

    colorNormal = '#FFFFFF';
    colorDeviation = '#F4A321';

    public previewTitle: string;

    constructor(
        private widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscription = this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
            this.aboutWidget = data.title;
            this.previewTitle = data.widgetType;
        });
    }

    ngOnInit() {}

    drawGraph(count: number): string {
        return count.toString() + '%';
    }

    fillGraph(flag: boolean): string {
        return flag ? this.colorNormal : this.colorDeviation;
    }
}

import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';
import { IEcologySafety } from '../../models/ecology-safety';
import { Widgets } from '../../models/widget.model';

@Component({
    selector: 'evj-ecology-safety',
    templateUrl: './ecology-safety.component.html',
    styleUrls: ['./ecology-safety.component.scss'],
})
export class EcologySafetyComponent implements OnInit {
    static itemCols: number = 18;
    static itemRows: number = 2;

    public subscription: Subscription;

    /* Приблизительная структура, получаемая с бека */

    public data: IEcologySafety = {
        plan: 100, // план
        curValue: 80, // текущее значение
        maxValue: 120, // максимальное значение
    };

    public colorNormal: string = '#FFFFFF';
    public colorDeviation: string = '#F4A321';

    public title: string;
    public previewTitle: string;

    constructor(
        private widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscription = this.widgetService.getWidgetChannel(this.id).subscribe((data: Widgets) => {
            this.title = data.title;
            this.previewTitle = data.widgetType;
        });
    }

    ngOnInit(): void {}

    drawGraph(count: number): string {
        return count.toString() + '%';
    }

    fillGraph(flag: boolean): string {
        return flag ? this.colorNormal : this.colorDeviation;
    }
}

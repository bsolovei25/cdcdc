import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { NewWidgetService } from '../../services/new-widget.service';
import { Subscription } from 'rxjs';
import { WidgetPlatform } from '../../models/widget-platform';

@Component({
    selector: 'evj-flame-diagram',
    templateUrl: './flame-diagram.component.html',
    styleUrls: ['./flame-diagram.component.scss'],
})
export class FlameDiagramComponent extends WidgetPlatform implements OnInit, OnDestroy {
    protected static itemCols: number = 20;
    protected static itemRows: number = 16;

    constructor(
        protected widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        // this.data = ref.chartItems;
    }
}

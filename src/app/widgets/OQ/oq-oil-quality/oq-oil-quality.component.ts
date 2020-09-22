import { Component, Inject, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';

@Component({
    selector: 'evj-oq-oil-quality',
    templateUrl: './oq-oil-quality.component.html',
    styleUrls: ['./oq-oil-quality.component.scss']
})
export class OqOilQualityComponent extends WidgetPlatform implements OnInit {

    public readonly defaultUrl: string = 'http://msk25-cvtrdev/';

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
    }

    protected dataHandler(ref: any): void {
    }
}

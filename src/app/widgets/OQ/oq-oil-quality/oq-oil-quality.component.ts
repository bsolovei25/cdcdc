import { Component, Inject, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';

@Component({
    selector: 'evj-oq-oil-quality',
    templateUrl: './oq-oil-quality.component.html',
    styleUrls: ['./oq-oil-quality.component.scss'],
})
export class OqOilQualityComponent extends WidgetPlatform<unknown> implements OnInit {
    public readonly defaultUrl: string = 'http://msk25-cvtrdev/';

    constructor(
        protected widgetService: WidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {}

    protected dataHandler(ref: any): void {}
}

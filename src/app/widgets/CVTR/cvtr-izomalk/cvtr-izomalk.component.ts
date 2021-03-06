import { Component, Inject, OnInit } from '@angular/core';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '@dashboard/services/widget.service';

@Component({
    selector: 'evj-cvtr-izomalk',
    templateUrl: './cvtr-izomalk.component.html',
    styleUrls: ['./cvtr-izomalk.component.scss'],
})
export class CvtrIzomalkComponent extends WidgetPlatform implements OnInit {
    public readonly defaultUrl: string = 'http://msk25-cvtrdev/izomalk';

    constructor(
        protected widgetService: WidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {}

    protected dataHandler(ref: unknown): void {}
}

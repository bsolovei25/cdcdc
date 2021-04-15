import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '@dashboard/services/widget.service';

@Component({
    selector: 'evj-cvtr-home',
    templateUrl: './cvtr-home.component.html',
    styleUrls: ['./cvtr-home.component.scss'],
})
export class CvtrHomeComponent extends WidgetPlatform implements OnInit {
    public readonly defaultUrl: string = 'http://msk25-cvtrdev/home';

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

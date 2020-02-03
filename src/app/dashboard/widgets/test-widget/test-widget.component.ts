import { Component, OnInit, Inject, AfterViewInit, OnDestroy } from '@angular/core';
import { NewWidgetService } from '../../services/new-widget.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'evj-test-widget',
    templateUrl: './test-widget.component.html',
    styleUrls: ['./test-widget.component.scss'],
})
export class TestWidgetComponent implements OnInit, AfterViewInit, OnDestroy {
    static itemCols = 12;
    static itemRows = 8;

    private subscriptions: Subscription[] = [];

    public title: string = 'График отгрузки';
    public code: string;
    public units: string;
    public name: string;
    public previewTitle: string;

    constructor(
        public widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscriptions.push(
            this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
                this.title = data.title;
                this.code = data.code;
                this.units = data.units;
                this.name = data.name;
                this.previewTitle = data.widgetType;
            })
        );
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {}

    ngOnDestroy(): void {
        if (this.subscriptions) {
            for (const subscription of this.subscriptions) {
                subscription.unsubscribe();
            }
        }
    }
}

import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IRawMotion, IRawMotionHeader } from '../../../dashboard/models/APS/raw-motion.model';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'evj-raw-motion',
    templateUrl: './raw-motion.component.html',
    styleUrls: ['./raw-motion.component.scss'],
})
export class RawMotionComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public data: IRawMotion = {
        units: 'т',
        upperLimit: 100,
        lowerLimit: 40,
        cols: [
            {
                date: new Date(2020, 3, 1),
                value: 50,
            },
            {
                date: new Date(2020, 3, 2),
                value: 70,
            },
            {
                date: new Date(2020, 3, 3),
                value: 57,
            },
            {
                date: new Date(2020, 3, 4),
                value: 60,
            },
            {
                date: new Date(2020, 3, 5),
                value: 90,
            },
        ],
    };

    public readonly header: IRawMotionHeader[] = [
        {
            title: 'Движение НС',
            iconName: 'drop',
            svgStyle: {
                'width.px': 11,
                'height.px': 15,
            },
        },
        {
            title: 'Движение КГС',
            iconName: 'scales',
            svgStyle: {
                'width.px': 17,
                'height.px': 21,
            },
        },
    ];
    public headerSelect: SelectionModel<IRawMotionHeader> = new SelectionModel<IRawMotionHeader>();

    private readonly colWidth: number = 37;

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.headerSelect.select(this.header[0]);
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {}
}

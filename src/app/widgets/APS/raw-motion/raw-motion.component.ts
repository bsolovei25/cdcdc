import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IRawMotion, IRawMotionHeader } from '../../../dashboard/models/APS/raw-motion.model';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'evj-raw-motion',
    templateUrl: './raw-motion.component.html',
    styleUrls: ['./raw-motion.component.scss'],
})
export class RawMotionComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public data: IRawMotion = {
        units: 'тн',
        upperLimit: 100,
        lowerLimit: 55,
        maxValue: 120,
        minValue: 0,
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
            {
                date: new Date(2020, 3, 6),
                value: 50,
            },
            {
                date: new Date(2020, 3, 7),
                value: 70,
            },
            {
                date: new Date(2020, 3, 8),
                value: 57,
            },
            {
                date: new Date(2020, 3, 9),
                value: 60,
            },
            {
                date: new Date(2020, 3, 10),
                value: 90,
            },
            {
                date: new Date(2020, 3, 11),
                value: 50,
            },
            {
                date: new Date(2020, 3, 12),
                value: 70,
            },
            {
                date: new Date(2020, 3, 13),
                value: 57,
            },
            {
                date: new Date(2020, 3, 14),
                value: 60,
            },
            {
                date: new Date(2020, 3, 15),
                value: 90,
            },
            {
                date: new Date(2020, 3, 16),
                value: 50,
            },
            {
                date: new Date(2020, 3, 17),
                value: 70,
            },
            {
                date: new Date(2020, 3, 18),
                value: 57,
            },
            {
                date: new Date(2020, 3, 19),
                value: 60,
            },
            {
                date: new Date(2020, 3, 20),
                value: 90,
            },
            {
                date: new Date(2020, 3, 21),
                value: 50,
            },
            {
                date: new Date(2020, 3, 22),
                value: 70,
            },
            {
                date: new Date(2020, 3, 23),
                value: 57,
            },
            {
                date: new Date(2020, 3, 24),
                value: 60,
            },
            {
                date: new Date(2020, 3, 25),
                value: 90,
            },
            {
                date: new Date(2020, 3, 26),
                value: 50,
            },
            {
                date: new Date(2020, 3, 27),
                value: 70,
            },
            {
                date: new Date(2020, 3, 28),
                value: 57,
            },
            {
                date: new Date(2020, 3, 29),
                value: 60,
            },
            {
                date: new Date(2020, 3, 30),
                value: 90,
            },
            {
                date: new Date(2020, 3, 31),
                value: 90,
            },
            {
                date: new Date(2020, 3, 32),
                value: 90,
            },
            {
                date: new Date(2020, 3, 33),
                value: 90,
            },
            {
                date: new Date(2020, 3, 34),
                value: 90,
            },
            {
                date: new Date(2020, 3, 35),
                value: 90,
            },
            {
                date: new Date(2020, 3, 36),
                value: 90,
            },
            {
                date: new Date(2020, 3, 37),
                value: 90,
            },
        ],
    };

    public upperLimit: string = '';
    public lowerLimit: string = '';

    constructor(
        protected widgetService: WidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.defineLimits();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {}

    public defineHeight(value: number): string {
        const height: number = this.data.maxValue - this.data.minValue;
        const newValue: number = value - this.data.minValue;
        return `${(newValue / height) * 100}%`;
    }

    private defineLimits(): void {
        const height: number = this.data.maxValue - this.data.minValue;
        this.upperLimit = `${((this.data.maxValue - this.data.upperLimit) / height) * 100}%`;
        this.lowerLimit = `${((this.data.lowerLimit - this.data.minValue) / height) * 100}%`;
    }
}

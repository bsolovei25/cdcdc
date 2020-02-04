import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { IDailyPlanProduct, IPeriod } from '../../models/daily-plan-product';
import { NewWidgetService } from '../../services/new-widget.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'evj-daily-plan-product',
    templateUrl: './daily-plan-product.component.html',
    styleUrls: ['./daily-plan-product.component.scss'],
})
export class DailyPlanProductComponent implements OnInit, OnDestroy {
    public buttons: string[] = ['Ресурс', 'Запас всего', 'Паспортизация'];
    public buttonActive: number = 0;

    public isGraphShow: boolean = true;

    public title: string;
    public units: string;
    public previewTitle: string;

    public MAXIMUM_COEF: number = 1.3;

    public days: IDailyPlanProduct[] = [
        {
            upperGraph: {
                higherValue: 13000,
                lowerValue: 5000,
                currentValue: 10400,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 1000,
                plan: 1000,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: false,
            date: new Date(2020, 0, 1),
        },
        {
            upperGraph: {
                higherValue: 17000,
                lowerValue: 10000,
                currentValue: 11200,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 800,
                plan: 800,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: false,
            date: new Date(2020, 0, 2),
        },
        {
            upperGraph: {
                higherValue: 15600,
                lowerValue: 9200,
                currentValue: 14200,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 1500,
                plan: 1500,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: false,
            date: new Date(2020, 0, 3),
        },
        {
            upperGraph: {
                higherValue: 12300,
                lowerValue: 7800,
                currentValue: 5200,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 800,
                plan: 1000,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: true,
            date: new Date(2020, 0, 4),
        },
        {
            upperGraph: {
                higherValue: 8000,
                lowerValue: 4250,
                currentValue: 7420,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 1000,
                plan: 1000,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: false,
            date: new Date(2020, 0, 5),
        },
        {
            upperGraph: {
                higherValue: 13000,
                lowerValue: 5000,
                currentValue: 10400,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 1000,
                plan: 1000,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: false,
            date: new Date(2020, 0, 6),
        },
        {
            upperGraph: {
                higherValue: 17000,
                lowerValue: 10000,
                currentValue: 11200,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 800,
                plan: 800,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: false,
            date: new Date(2020, 0, 7),
        },
        {
            upperGraph: {
                higherValue: 15600,
                lowerValue: 9200,
                currentValue: 14200,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 1500,
                plan: 1500,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: false,
            date: new Date(2020, 0, 8),
        },
        {
            upperGraph: {
                higherValue: 12300,
                lowerValue: 7800,
                currentValue: 5200,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 800,
                plan: 1000,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: true,
            date: new Date(2020, 0, 9),
        },
        {
            upperGraph: {
                higherValue: 8000,
                lowerValue: 4250,
                currentValue: 7420,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 1000,
                plan: 1000,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: false,
            date: new Date(2020, 0, 10),
        },
        {
            upperGraph: {
                higherValue: 13000,
                lowerValue: 5000,
                currentValue: 10400,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 1000,
                plan: 1000,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: false,
            date: new Date(2020, 0, 11),
        },
        {
            upperGraph: {
                higherValue: 17000,
                lowerValue: 10000,
                currentValue: 11200,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 800,
                plan: 800,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: false,
            date: new Date(2020, 0, 12),
        },
        {
            upperGraph: {
                higherValue: 15600,
                lowerValue: 9200,
                currentValue: 14200,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 1500,
                plan: 1500,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: false,
            date: new Date(2020, 0, 13),
        },
        {
            upperGraph: {
                higherValue: 12300,
                lowerValue: 7800,
                currentValue: 5200,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 800,
                plan: 1000,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: true,
            date: new Date(2020, 0, 14),
        },
        {
            upperGraph: {
                higherValue: 8000,
                lowerValue: 4250,
                currentValue: 7420,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 1000,
                plan: 1000,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: false,
            date: new Date(2020, 0, 15),
        },
        {
            upperGraph: {
                higherValue: 13000,
                lowerValue: 5000,
                currentValue: 10400,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 1000,
                plan: 1000,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: false,
            date: new Date(2020, 0, 16),
        },
        {
            upperGraph: {
                higherValue: 17000,
                lowerValue: 10000,
                currentValue: 11200,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 800,
                plan: 800,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: false,
            date: new Date(2020, 0, 17),
        },
        {
            upperGraph: {
                higherValue: 15600,
                lowerValue: 9200,
                currentValue: 14200,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 1500,
                plan: 1500,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: false,
            date: new Date(2020, 0, 18),
        },
        {
            upperGraph: {
                higherValue: 12300,
                lowerValue: 7800,
                currentValue: 5200,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 800,
                plan: 1000,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: true,
            date: new Date(2020, 0, 19),
        },
        {
            upperGraph: {
                higherValue: 8000,
                lowerValue: 4250,
                currentValue: 7420,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 1000,
                plan: 1000,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: false,
            date: new Date(2020, 0, 20),
        },
        {
            upperGraph: {
                higherValue: 13000,
                lowerValue: 5000,
                currentValue: 10400,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 1000,
                plan: 1000,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: false,
            date: new Date(2020, 0, 21),
        },
        {
            upperGraph: {
                higherValue: 17000,
                lowerValue: 10000,
                currentValue: 11200,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 800,
                plan: 800,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: false,
            date: new Date(2020, 0, 22),
        },
        {
            upperGraph: {
                higherValue: 15600,
                lowerValue: 9200,
                currentValue: 14200,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 1500,
                plan: 1500,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: false,
            date: new Date(2020, 0, 23),
        },
        {
            upperGraph: {
                higherValue: 12300,
                lowerValue: 7800,
                currentValue: 5200,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 800,
                plan: 1000,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: true,
            date: new Date(2020, 0, 24),
        },
        {
            upperGraph: {
                higherValue: 8000,
                lowerValue: 4250,
                currentValue: 7420,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 1000,
                plan: 1000,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: false,
            date: new Date(2020, 0, 25),
        },
        {
            upperGraph: {
                higherValue: 13000,
                lowerValue: 5000,
                currentValue: 10400,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 1000,
                plan: 1000,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: false,
            date: new Date(2020, 0, 26),
        },
        {
            upperGraph: {
                higherValue: 17000,
                lowerValue: 10000,
                currentValue: 11200,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 800,
                plan: 800,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: false,
            date: new Date(2020, 0, 27),
        },
        {
            upperGraph: {
                higherValue: 15600,
                lowerValue: 9200,
                currentValue: 14200,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 1500,
                plan: 1500,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: false,
            date: new Date(2020, 0, 28),
        },
        {
            upperGraph: {
                higherValue: 12300,
                lowerValue: 7800,
                currentValue: 5200,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 800,
                plan: 1000,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: true,
            date: new Date(2020, 0, 29),
        },
        {
            upperGraph: {
                higherValue: 8000,
                lowerValue: 4250,
                currentValue: 7420,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 1000,
                plan: 1000,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: false,
            date: new Date(2020, 0, 30),
        },
        {
            upperGraph: {
                higherValue: 8000,
                lowerValue: 4250,
                currentValue: 7420,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 1000,
                plan: 1000,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: false,
            date: new Date(2020, 0, 31),
        },
        {
            upperGraph: {
                higherValue: 8000,
                lowerValue: 4250,
                currentValue: 7420,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 1000,
                plan: 1000,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: false,
            date: new Date(2020, 1, 1),
        },
        {
            upperGraph: {
                higherValue: 8000,
                lowerValue: 4250,
                currentValue: 7420,
                maxValue: 17000,
            },
            downerGraph: {
                currentValue: 1000,
                plan: 1000,
                maxValue: 1500,
            },
            isActive: false,
            isWarning: false,
            date: new Date(2020, 1, 2),
        },
    ];

    public periods: IPeriod[] = [
        {
            begin: new Date(2020, 0, 2),
            end: new Date(2020, 0, 6),
            sumResult: 12890,
            isActivePeriod: false,
        },
        {
            begin: new Date(2020, 0, 6),
            end: new Date(2020, 0, 11),
            sumResult: 17820,
            isActivePeriod: true,
        },
        {
            begin: new Date(2020, 0, 11),
            end: new Date(2020, 0, 15),
            sumResult: 15230,
            isActivePeriod: false,
        },
        {
            begin: new Date(2020, 0, 15),
            end: new Date(2020, 0, 24),
            sumResult: 15230,
            isActivePeriod: true,
        },
    ];

    public subscription: Subscription;

    static itemCols: number = 40;
    static itemRows: number = 20;

    constructor(
        private widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscription = this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
            this.title = data.title;
            this.previewTitle = data.widgetType;
            // this.code = data.code;
            // this.units = data.units;
            // this.name = data.name;
        });
    }

    public ngOnInit(): void {
        this.showActivePeriod();
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public showActivePeriod(): void {
        for (const period of this.periods) {
            this.days.forEach((item: IDailyPlanProduct) => {
                if (item.date >= period.begin && item.date < period.end) {
                    item.isActive = period.isActivePeriod;
                }
            });
        }
    }

    public showClass(day: IDailyPlanProduct): string {
        if (day.isWarning) {
            return 'axis__date-card-warning';
        } else if (day.isActive) {
            return 'axis__date-card-active';
        }
        return '';
    }

    public movePeriodLineFromLeft(period: Date): number {
        const milisecInDay: number = 86400000;
        const widthOfColumn: number = 44;
        const countOfDays: number = (period.getTime() - this.days[0].date.getTime()) / milisecInDay;
        return countOfDays * widthOfColumn;
    }

    public addActiveClass(item: string): boolean {
        const index: number = this.buttons.indexOf(item);
        if (this.buttonActive === index) {
            return true;
        }
        return false;
    }

    public changeActiveClass(item: string): void {
        const index: number = this.buttons.indexOf(item);
        this.buttonActive = index;
    }

    public checkTheEndOfPeriod(date: Date): number | false {
        const milisecInDay: number = 86400000;
        for (const period of this.periods) {
            const difference: number = period.end.getTime() - date.getTime() - milisecInDay;
            if (difference === 0) {
                return period.sumResult;
            }
        }
        return false;
    }
}

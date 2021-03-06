import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2, OnDestroy, Input } from '@angular/core';
import { HeaderDataService } from '../../../services/header-data.service';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { IHeaderDate } from '../../../models/i-header-date';

@Component({
    selector: 'evj-line-datetime',
    templateUrl: './line-datetime.component.html',
    styleUrls: ['./line-datetime.component.scss'],
})
export class LineDatetimeComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('lightBlock') lightBlock: ElementRef;
    @Input() set screenWidth(data: number) {
        this.screenWidth$.next(data);
    }

    private subscription: Subscription;

    public firstLineInfo: string;
    public secondLineInfo: string;
    public interval: any;

    public currentData: number;
    public dates: any[] = [];
    public screenWidth$: BehaviorSubject<number> = new BehaviorSubject<number>(1920);

    public dateFromSelector: IHeaderDate = {
        status: true,
        startDatetime: new Date(),
        endDatetime: new Date(),
    };

    public activeStates: {
        isTimeline: boolean;
        isLeftArrow: boolean;
        isRightArrow: boolean;
    } = {
        isTimeline: false,
        isLeftArrow: false,
        isRightArrow: false,
    };

    constructor(private renderer: Renderer2, private headerData: HeaderDataService) {}

    ngOnInit(): void {
        setTimeout(() => this.datesFill(), 0);
        setInterval(() => {
            this.datesFill();
            this.currentData = Date.now();
        }, 10000);
    }

    ngAfterViewInit(): void {
        this.subscription = this.headerData.date$.subscribe((data) => {
            setTimeout(() => this.setData(data));
        });
    }

    private setData(data: IHeaderDate): void {
        this.dateFromSelector = data;
        clearInterval(this.interval);

        if (this.dateFromSelector.status === false) {
            setTimeout(() => {
                this.searchDate(this.dateFromSelector, this.lightBlock);
            }, 1);
        }

        const periodOptions = {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        };

        const baseOptions = {
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        };

        this.interval = setInterval(() => {
            if (this.dateFromSelector.status === false) {
                this.firstLineInfo = `${data.startDatetime.toLocaleString(
                    'ru',
                    periodOptions
                )} - ${data.endDatetime.toLocaleString('ru', periodOptions)}`;

                const date = new Date().toLocaleString('ru', baseOptions).split(',');
                this.secondLineInfo = `${date[0]}${date[1]}`;
            } else {
                const date = new Date().toLocaleString('ru', baseOptions).split(',');
                [this.firstLineInfo, this.secondLineInfo] = date;
            }
        }, 1000);
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    datesFill(): void {
        this.dates = [];
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const daysCount = new Date(year, month, 0).getDate();
        for (let i: number = 0; i < daysCount; i++) {
            let active: boolean = false;
            let last: boolean = false;
            let future: boolean = false;
            if (i === day - 1) {
                active = true;
            } else if (i < day - 1) {
                last = true;
            } else {
                future = true;
            }
            const el = {
                day: Number(i) + 1,
                isActive: active,
                isLast: last,
                isFuture: future,
            };
            this.dates.push(el);
        }
    }

    public get widthBlockDataLine(): number {
        const widthBlock = document.getElementById('widthBlock');
        return widthBlock.offsetWidth;
    }

    private timelinePercent(date: Date, currentDatetime: Date): number {
        const firstDayInMs: number = new Date(currentDatetime.getFullYear(), currentDatetime.getMonth(), 1).getTime();
        const allTimelineInMs = 86400000 * this.dates?.length;
        return ((date.getTime() - firstDayInMs) / allTimelineInMs) * 100;
    }

    public searchDate(data: IHeaderDate, highlightBlock: ElementRef): void {
        const currentDatetime: Date = new Date(Date.now());
        let posLeft: number = 0;
        let posRight: number = 0;

        if (data.startDatetime.getMonth() > currentDatetime.getMonth()) {
            posLeft = 100;
            this.activeStates.isLeftArrow = false;
        } else if (data.startDatetime.getMonth() < currentDatetime.getMonth()) {
            posLeft = 0;
            this.activeStates.isLeftArrow = false;
        } else {
            posLeft = this.timelinePercent(data.startDatetime, currentDatetime);
            this.activeStates.isLeftArrow = true;
        }

        if (data.endDatetime.getMonth() > currentDatetime.getMonth()) {
            posRight = 100;
            this.activeStates.isRightArrow = false;
        } else if (data.endDatetime.getMonth() < currentDatetime.getMonth()) {
            posRight = 0;
            this.activeStates.isRightArrow = false;
        } else {
            posRight = this.timelinePercent(data.endDatetime, currentDatetime);
            this.activeStates.isRightArrow = true;
        }

        if (
            (data.startDatetime.getMonth() < currentDatetime.getMonth() &&
                data.endDatetime.getMonth() < currentDatetime.getMonth()) ||
            (data.startDatetime.getMonth() > currentDatetime.getMonth() &&
                data.endDatetime.getMonth() > currentDatetime.getMonth())
        ) {
            this.activeStates.isTimeline = false;
        } else {
            this.activeStates.isTimeline = true;
        }

        if (highlightBlock) {
            this.renderer.removeStyle(highlightBlock.nativeElement, 'left');
            this.renderer.setStyle(highlightBlock.nativeElement, 'left', `${posLeft}%`);
            this.renderer.setStyle(highlightBlock.nativeElement, 'width', `${posRight - posLeft}%`);
        }
    }
}

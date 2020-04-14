import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChild,
    ElementRef,
    Renderer2,
    OnDestroy,
} from '@angular/core';
import { HeaderDataService } from '../../services/header-data.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { HeaderDate } from '../../models/header-date';

@Component({
    selector: 'evj-line-datetime',
    templateUrl: './line-datetime.component.html',
    styleUrls: ['./line-datetime.component.scss'],
})
export class LineDatetimeComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('startLine') startLine: ElementRef;

    private subscription: Subscription;

    public currentData: number;
    public dates = [];

    public dateFromSelector: HeaderDate = {
        start: 0,
        end: 0,
        status: true,
        otherMonth: '',
    };

    constructor(private renderer: Renderer2, private headerData: HeaderDataService) { }

    ngOnInit(): void {
        this.datesFill();
        setInterval(() => {
            this.datesFill();
            this.currentData = Date.now();
        }, 10000);
    }

    ngAfterViewInit(): void {
        this.subscription = this.headerData.date$.subscribe((data) => {
            this.dateFromSelector = data;
            if (this.dateFromSelector.status === false) {
                setTimeout(() => {
                    this.searchDate(this.dateFromSelector, this.startLine);
                }, 1);
            }
        });
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
        for (let i = 0; i < daysCount; i++) {
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
                day: i + 1,
                isActive: active,
                isLast: last,
                isFuture: future,
            };
            this.dates.push(el);
        }
    }

    public widthBlockDataLine(): number {
        const widthBlock = document.getElementById('widthBlock');
        return widthBlock.offsetWidth;
    }

    public searchDate(data, elStart): void {
        const widthBlock = this.widthBlockDataLine();
        let end: number;
        let onePieLineStart: number;
        let onePieLineEnd: number;
        if (data.end > this.dates.length) {
            end = this.dates.length;
        } else {
            end = data.end;
        }

        if (data.hoursStart > data.hoursEnd && data.start === data.end) {
            data.hoursStart = data.hoursEnd;
        }

        const count = this.dates.length / 100;

        const countLine = end - data.start + 1;

        const lineLength = widthBlock * this.dates.length;
        const pieLine = (widthBlock * 100) / lineLength;
        if (data.hoursStart === '00') {
            onePieLineStart = 0;
        } else {
            onePieLineStart = (pieLine / 24) * +data.hoursStart;
        }

        if (data.hoursEnd === '00') {
            onePieLineEnd = 0;
        } else {
            onePieLineEnd = pieLine - (pieLine / 24) * +data.hoursEnd;
        }

        const start = end > data.start ? data.start : end;

        const positionStartLine = (start - 1) / count - 0.6 + onePieLineStart;

        const width = pieLine * countLine + 1.2 - onePieLineEnd - onePieLineStart;

        this.renderer.removeStyle(elStart.nativeElement, 'left');
        this.renderer.setStyle(elStart.nativeElement, 'left', `${positionStartLine}%`);
        this.renderer.setStyle(elStart.nativeElement, 'width', `${width}%`);
    }
}

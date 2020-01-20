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
    @ViewChild('startLine', { static: false }) startLine: ElementRef;

    private subscription: Subscription;

    public currentData: number;
    public dates = [];

    public dateFromSelector: HeaderDate = { start: 0, end: 0, status: true };

    public positionEndLine: number = 1;
    public positionStartLine: number = 1;

    public widthBlock;

    constructor(private renderer: Renderer2, private headerData: HeaderDataService) {
        setInterval(() => {
            this.datesFill();
            this.currentData = Date.now();
        }, 10000);
    }

    ngOnInit(): void {
        this.datesFill();
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

    public searchDate(data, elStart) {
        let widthBlock = this.widthBlockDataLine();

        let count = this.dates.length / 100;
        let countLine = data.end - data.start + 1;

        let lineLength = widthBlock * this.dates.length;
        let pieLine = (widthBlock * 100) / lineLength;

        let start = data.end > data.start ? data.start : data.end;

        let positionStartLine = (start - 1) / count - 0.45;

        let width = pieLine * countLine + 1.1;

        this.renderer.removeStyle(elStart.nativeElement, 'left');
        this.renderer.setStyle(elStart.nativeElement, 'left', `${positionStartLine}%`);
        this.renderer.setStyle(elStart.nativeElement, 'width', `${width}%`);
    }
}

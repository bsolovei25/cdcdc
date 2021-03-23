import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TimeLineItemInput } from 'src/app/dashboard/models/LCO/time-line-diagram';

@Component({
    selector: 'evj-time-diagram',
    templateUrl: './time-diagram.component.html',
    styleUrls: ['./time-diagram.component.scss'],
})
export class TimeDiagramComponent implements OnInit {
    @Input() data: TimeLineItemInput = {
        dropTimeNext: '0',
        dropTimeLast: '0',
        dropTitle: '',
    };

    public timeLeft: number = 0;

    public colorNormal: string = '#616580';
    public colorNow: string = '#a2e2ff';

    public hours: string;
    public minutes: string;
    public seconds: string;

    constructor() {}

    ngOnInit(): void {
        setInterval(() => {
            this.timeLeft = Date.parse(this.data.dropTimeNext) - Date.now();
            this.timeCounter();
        }, 100);
    }

    timeCounter(): void {
        if (this.timeLeft > 0) {
            const date = new Date(this.timeLeft);
            this.hours = (this.timeLeft / (1000 * 60 * 60)).toFixed(0);
            if (date.getUTCMinutes().toString().length === 1) {
                this.minutes = '0' + date.getUTCMinutes().toString();
            } else {
                this.minutes = date.getUTCMinutes().toString();
            }
            if (date.getUTCSeconds().toString().length === 1) {
                this.seconds = '0' + date.getUTCSeconds().toString();
            } else {
                this.seconds = date.getUTCSeconds().toString();
            }
        } else {
            this.hours = '00';
            this.minutes = '00';
            this.seconds = '00';
        }
    }

    timeLine(): string {
        let percent: number = 0;
        if (this.timeLeft > 0) {
            percent =
                100 - (this.timeLeft / (Date.parse(this.data.dropTimeNext) - Date.parse(this.data.dropTimeLast))) * 100;
        } else if (this.timeLeft === 0) {
            percent = 0;
        } else {
            percent = 100;
        }
        return percent + '%';
    }
}

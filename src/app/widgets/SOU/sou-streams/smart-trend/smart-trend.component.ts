import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'evj-smart-trend',
  templateUrl: './smart-trend.component.html',
  styleUrls: ['./smart-trend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartTrendComponent implements OnInit {

    public isTrendTableOpen: boolean = false;

    // tslint:disable-next-line:typedef
    @Output() public closeSmartTrend = new EventEmitter();

    constructor() { }

    ngOnInit(): void {}

    public openTrendTable(): void {
        this.isTrendTableOpen = true;
    }

    public sendClosingSmartTrend(): void {
        this.closeSmartTrend.emit();
    }

}

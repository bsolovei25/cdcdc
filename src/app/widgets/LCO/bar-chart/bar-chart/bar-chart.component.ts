import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { BarWidget } from 'src/app/dashboard/models/widget.model';

@Component({
    selector: 'evj-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
    @Input() public data: BarWidget;

    public min = 1;
    public max = 100;
    public goodValue;
    public badValue;
    public summ;
    public procsumm;

    constructor() {}

    ngOnInit() {
        this.barIt(this.data);
    }

    public barIt(data) {
        this.summ = data.good + data.bad;
        this.procsumm = (this.summ / this.summ) * 100;
        this.goodValue = (100 * data.good) / this.summ;
        this.badValue = (100 * data.bad) / this.summ;
    }
}

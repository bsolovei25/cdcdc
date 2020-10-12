import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'evj-detailed-line-diagram',
    templateUrl: './detailed-line-diagram.component.html',
    styleUrls: ['./detailed-line-diagram.component.scss'],
})
export class DetailedLineDiagramComponent implements OnInit {
    @Input() data;

    colorFull = '#FFFFFF';
    colorNormal = '#a2e2ff';
    colorDeviation = '#F4A321';

    constructor() {}

    ngOnInit() {}

    drawGraph(data): string {
        return (data.curValue / data.maxValue) * 100 + '%';
    }

    fillGraph(flag: boolean): string {
        return flag ? this.colorNormal : this.colorDeviation;
    }

    limitsGraph(data, limit): string {
        if (limit === 'l') {
            return (this.data.lowerValue / data.maxValue) * 100 + '%';
        }
        if (this.data.higherValue < data.maxValue) {
            return (this.data.higherValue / data.maxValue) * 100 + '%';
        }else{
            return '98%'
        }
    }

    deviationCounter(data, flag) {
        if (flag) {
            if (data.curValue < this.data.planValue) {
                return ((1 - data.curValue / data.planValue) * 100).toFixed(1);
            } else if (data.curValue > this.data.higherValue) {
                return '+' + ((data.curValue / data.planValue - 1) * 100).toFixed(1);
            } else {
                return 0;
            }
        } else {
            if (data.curValue > data.planValue && data.curValue <= this.data.higherValue) {
                return '+' + ((data.curValue / data.planValue) * 100 - 100).toFixed(1);
            } else {
                return 0;
            }
        }
    }

    isPositive(data) {
        return data.curValue > this.data.higherValue;
    }
}

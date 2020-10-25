import { Component, OnInit, Input } from '@angular/core';
import { IPointDiagramElement } from '../../../../dashboard/models/LCO/point-diagram';

@Component({
    selector: 'evj-one-column',
    templateUrl: './one-column.component.html',
    styleUrls: ['./one-column.component.scss'],
})
export class OneColumnComponent implements OnInit {
    @Input() isDiagram: boolean;
    @Input() item: IPointDiagramElement;
    @Input() isMock: boolean = false;

    constructor() {}

    ngOnInit(): void {}

    getGraphHeight(percent: number): string {
        return this.isMock ? '20%' : (100 - percent).toString() + '%';
    }

    getDiameter(percent: number): number {
        return 30 + ((65 - 30) / 100) * percent;
    }

    getColor(percent: number, isCritical: boolean, isPoint: boolean): string {
        if (percent === 0) {
            return isPoint ? 'point__disable' : 'label__disable';
        } else if (!isCritical) {
            return isPoint ? 'point__normal' : 'label__normal';
        }
        return isPoint ? 'point__critical' : 'label__critical';
    }
}

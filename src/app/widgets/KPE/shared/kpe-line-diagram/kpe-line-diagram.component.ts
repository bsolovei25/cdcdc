import { Component, Input } from '@angular/core';

interface IKpeLineDiagram {
    name: string;
    percent: number;
    percentDeviation: number;
}

@Component({
    selector: 'evj-kpe-line-diagram',
    templateUrl: './kpe-line-diagram.component.html',
    styleUrls: ['./kpe-line-diagram.component.scss']
})
export class KpeLineDiagramComponent {

    @Input() isCritical: boolean = false;

    dataP: IKpeLineDiagram = {
        name: 'ДТЛ (2 вариант)',
        percent: 40,
        percentDeviation: 15
    };

    switchBtn: boolean = true;

    constructor() {
    }


}

import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'evj-nk-tank-information-card-info',
    templateUrl: './nk-tank-information-card-info.component.html',
    styleUrls: ['./nk-tank-information-card-info.component.scss'],
})
export class NkTankInformationCardInfoComponent implements OnInit, OnChanges {
    @Input() set volumeMax(data: number) {
        this.nominal = data;
    }
    @Input() set volumeCurrent(data: number) {
        this.current = data;
    }
    @Input() set volumeFreeSpace(data: number) {
        this.freeSpace = data;
    }
    @Input() isRepair: boolean;

    activeIndicatorCount: number;
    nominal: number;
    current: number;
    freeSpace: number;
    fill: number;

    volumeCustomization: number[] = new Array(6);

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(): void {
        this.fill = (this.current / this.nominal) * 100;

        this.activeIndicatorCount = Math.round(this.fill * this.volumeCustomization.length) / 100;
    }
}

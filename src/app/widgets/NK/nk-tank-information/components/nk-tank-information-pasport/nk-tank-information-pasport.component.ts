import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'evj-nk-tank-information-pasport',
    templateUrl: './nk-tank-information-pasport.component.html',
    styleUrls: ['./nk-tank-information-pasport.component.scss'],
})
export class NkTankInformationPasportComponent implements OnInit, OnChanges {
    @Input() isPassportized: boolean;
    @Input() isRepair: boolean;
    indicatorText: string;

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(): void {
        this.indicatorText = this.isPassportized ? 'П' : 'НП';
    }
}

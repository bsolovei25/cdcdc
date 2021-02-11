import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'evj-nk-tank-information-temperature',
    templateUrl: './nk-tank-information-temperature.component.html',
    styleUrls: ['./nk-tank-information-temperature.component.scss'],
})
export class NkTankInformationTemperatureComponent implements OnInit, OnChanges {
    @Input() temperature: number = 0;
    @Input() maxTemperature: number = 1;
    @Input() isRepair: boolean = false;

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(): void {
        this.temperature = this.temperature > 0 ? this.temperature : 0;
        this.maxTemperature = this.maxTemperature > this.temperature ? this.maxTemperature : this.temperature;
        this.maxTemperature = this.maxTemperature > 0 ? this.maxTemperature : 0.0001;
    }
}

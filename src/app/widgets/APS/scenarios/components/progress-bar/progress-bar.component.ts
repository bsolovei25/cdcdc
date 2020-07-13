import { Component, Input, OnInit } from '@angular/core';

export interface IApsProgressBarSettings {
    barColor: string;
    barBackgroundColor: string;
    isGreaterThan100: boolean;
    value: number;
}

@Component({
    selector: 'evj-aps-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {

    @Input()
    public settings: IApsProgressBarSettings;

    public mainValue: number = 0;

    public extensionsValue: number = 0;

    constructor() {
    }

    ngOnInit(): void {
        if (this.settings.isGreaterThan100) {
            this.mainValue = this.settings.value > 100 ? 100 : this.settings.value;
            this.extensionsValue = this.settings.value > 100 ? this.settings.value - 100 : 0;
        }
    }
}

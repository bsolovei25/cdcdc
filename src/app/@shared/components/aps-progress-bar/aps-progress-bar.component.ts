import { Component, Input, OnInit } from '@angular/core';

export interface IApsProgressBarSettings {
    barColor?: string;
    barBackgroundColor?: string;
    isGreaterThan100?: boolean;
    value?: number;
}

@Component({
    selector: 'evj-aps-progress-bar',
    templateUrl: './aps-progress-bar.component.html',
    styleUrls: ['./aps-progress-bar.component.scss'],
})
export class ApsProgressBarComponent implements OnInit {
    @Input()
    public settings: IApsProgressBarSettings;

    public mainValue: number = 0;

    public extensionsValue: number = 0;

    constructor() {}

    ngOnInit(): void {
        if (this.settings) {
            this.settings.barColor = this.settings.barColor || '#FFFFFF';
            this.settings.barBackgroundColor = this.settings.barBackgroundColor || '#FF931E';
            this.settings.isGreaterThan100 = this.settings.isGreaterThan100 || false;
            this.settings.value = this.settings.value || 0;

            if (this.settings.isGreaterThan100) {
                this.mainValue = this.settings.value > 100 ? 100 : this.settings.value;
                this.extensionsValue = this.settings.value > 100 ? this.settings.value - 100 : 0;
            }
        }
    }
}

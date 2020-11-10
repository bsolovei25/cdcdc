import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'evj-events-smotr-icon',
    templateUrl: './evj-events-smotr-icon.component.html',
    styleUrls: ['./evj-events-smotr-icon.component.scss'],
})
export class EvjEventsSmotrIconComponent implements OnInit {
    @Input() public iconType: 'systematic' | 'escalate' | 'repeat' | 'critical' = 'escalate';
    @Input() public counter: number = null;
    @Input() public isCritical: boolean = false;

    public iconSrc: string = 'assets/icons/widgets/workspace/smotr/';

    constructor() {}

    public ngOnInit(): void {
        this.iconSrc = `${this.iconSrc}${this.iconType}-icon.svg`;
    }

    public defineClasses(): string {
        let classes: string = this.iconType;
        if (this.counter && this.iconType === 'escalate') {
            classes += ` ${this.iconType}_${this.counter}`;
        } else if (this.isCritical && this.iconType === 'critical') {
            classes += ` ${this.iconType}_danger`;
        } else if (this.isCritical && this.iconType === 'systematic') {
            classes += ` critical critical__warning`;
        }
        return classes;
    }
}

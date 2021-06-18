import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';

export type CmidEventToogleValue = 'plan' | 'non-plan';

@Component({
    selector: 'evj-cmid-event-toggle',
    templateUrl: './evj-cmid-event-toggle.component.html',
    styleUrls: ['./evj-cmid-event-toggle.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EvjCmidEventToggleComponent implements OnInit {
    @Output()
    private value: EventEmitter<CmidEventToogleValue> = new EventEmitter<CmidEventToogleValue>();

    public toggleValue: CmidEventToogleValue = 'plan';

    constructor() {}

    ngOnInit(): void {}

    public toggleClick(action: CmidEventToogleValue): void {
        this.toggleValue = action;
        this.value.emit(action);
    }
}

import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
    selector: 'evj-events-workspace-claim-checkbox',
    templateUrl: './evj-events-workspace-claim-checkbox.component.html',
    styleUrls: ['./evj-events-workspace-claim-checkbox.component.scss'],
})
export class EvjEventsWorkspaceClaimCheckbox {
    @Input() isVisible: boolean;
    @Output() changeRestriction: EventEmitter = new EventEmitter;

    public emitChangeRestriction(): void {
        this.changeRestriction.emit(null);
    }
}

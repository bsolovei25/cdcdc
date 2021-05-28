import {Component, OnInit} from '@angular/core';
import {PopoverRef} from '@shared/components/popover-overlay/popover-overlay.ref';
import { ICmidEventChip } from "@widgets/EVJ/evj-events-workspace/evj-cmid-event/cmid-event.interface";

@Component({
    selector: 'evj-cmid-event-chip-popover',
    templateUrl: './evj-cmid-event-chip-popover.component.html',
    styleUrls: ['./evj-cmid-event-chip-popover.component.scss'],
})
export class EvjCmidEventChipPopoverComponent implements OnInit {

    public chip: ICmidEventChip;

    constructor(private popoverRef: PopoverRef) {
        this.popoverRef.overlay.backdropClick().subscribe(() => {
            this.close();
        });
        if (this.popoverRef.data) {
            this.chip = this.popoverRef.data;
        }
    }

    ngOnInit(): void {}

    public close(): void {
        this.popoverRef.close('backdropClick', null);
    }
}

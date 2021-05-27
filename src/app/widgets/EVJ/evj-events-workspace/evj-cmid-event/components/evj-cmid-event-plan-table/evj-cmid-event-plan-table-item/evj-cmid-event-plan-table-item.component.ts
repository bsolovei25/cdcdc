import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from "@angular/core";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { IPlanItem } from "@widgets/EVJ/evj-events-workspace/evj-cmid-event/cmid-event.interface";

@Component({
    selector: 'evj-cmid-event-plan-table-item',
    templateUrl: './evj-cmid-event-plan-table-item.component.html',
    styleUrls: ['./evj-cmid-event-plan-table-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EvjCmidEventPlanTableItemComponent implements OnInit {
    @Input() item: IPlanItem;
    @Input() selected: boolean;
    @Output() onSelect: EventEmitter<boolean> = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}

    select(value: MatCheckboxChange): void {
        this.onSelect.emit(value.checked);
    }

}

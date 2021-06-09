import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: 'evj-equipment-state-header-dropdown',
    templateUrl: './evj-equipment-state-header-dropdown.component.html',
    styleUrls: ['./evj-equipment-state-header-dropdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class EquipmentStateHeaderDropdownComponent implements OnInit{
    @Input() isSetDefaultValue: boolean = false;
    @Input() set options(value: string[]) {
        this.optionsList = value;
        this.setValue();
    }
    
    @Output() onSelect: EventEmitter<string> = new EventEmitter();

    public value: string;
    public optionsList: string[] = [];

    public selectionChange(valueChange): void {
        this.value = valueChange.value;
        this.onSelect.emit(valueChange.value);
    }

    ngOnInit(): void {
        this.setValue();
    }

    private setValue(): void {
        if (this.isSetDefaultValue && this.optionsList.length > 0) {
            this.value = this.optionsList[0];
        } else {
            this.value = null;
        }
    }
}

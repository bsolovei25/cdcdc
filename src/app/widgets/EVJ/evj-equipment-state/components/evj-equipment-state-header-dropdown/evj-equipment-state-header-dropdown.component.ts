import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: 'evj-equipment-state-header-dropdown',
    templateUrl: './evj-equipment-state-header-dropdown.component.html',
    styleUrls: ['./evj-equipment-state-header-dropdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class EquipmentStateHeaderDropdownComponent implements OnInit{
    @Input() options: string[] = [];
    @Input() isSetDefaultValue: boolean = false;
    
    @Output() onSelect: EventEmitter<string> = new EventEmitter();

    public value: string;
    public selectedValue: string;

    ngOnInit(): void {
        this.setValue();
    }

    public selectionChange(valueChange): void {
        this.value = valueChange.value;
        this.onSelect.emit(valueChange.value);
    }

    private setValue(): void {
        if (this.isSetDefaultValue && this.options.length != 0) {
            this.value = this.options[0];
        }
    }
}

import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { equipmentStateStatusList } from "../../evj-equipment-state.const";

@Component({
    selector: 'evj-equipment-state-dropdown',
    templateUrl: './evj-equipment-state-dropdown.component.html',
    styleUrls: ['./evj-equipment-state-dropdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EquipmentStateDropdownComponent implements OnInit {
    @Input() private status: string;

    public statusList = [...equipmentStateStatusList];
    public selectedValue: string;
    public statusStyles = {
        work: false,
        repair: false,
        defective: false,
        inactive: false
    };

    public selectChange(): void {
        this.resetStyles();
        this.statusStyles[this.selectedValue] = true;
    }

    ngOnInit(): void {
        this.setStatus();
    }

    private setStatus(): void {
        this.statusList.shift();
        this.selectedValue = this.statusList.find((status) => status.status === this.status)?.status;
        this.statusStyles[this.selectedValue] = true;
    }

    private resetStyles(): void {
        Object.keys(this.statusStyles).forEach(style => this.statusStyles[style] = false);
    }
}

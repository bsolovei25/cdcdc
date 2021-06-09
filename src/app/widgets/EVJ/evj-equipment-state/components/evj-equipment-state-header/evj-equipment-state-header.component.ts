import { ChangeDetectionStrategy, Component, EventEmitter, Output } from "@angular/core";
import { EQUIPMENT_STATE_LIST, EQUIPMENT_STATE_STATUS_LIST } from "../../evj-equipment-state.const";

@Component({
  selector: 'evj-equipment-state-header',
  templateUrl: './evj-equipment-state-header.component.html',
  styleUrls: ['./evj-equipment-state-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentStateHeaderComponent {
    @Output() public stateFilterChange: EventEmitter<string> = new EventEmitter;
    @Output() public statusFilterChange: EventEmitter<string> = new EventEmitter;

    public stateFilter: string[] = EQUIPMENT_STATE_LIST.map(state => state.value);
    public statusFilter: string[] = EQUIPMENT_STATE_STATUS_LIST.map(status => status.value);

    public stateFilterChangeEmit(value: string): void {
      this.stateFilterChange.emit(value);
    }

    public statusFilterChangeEmit(value: string): void {
      this.statusFilterChange.emit(value);
    }
}

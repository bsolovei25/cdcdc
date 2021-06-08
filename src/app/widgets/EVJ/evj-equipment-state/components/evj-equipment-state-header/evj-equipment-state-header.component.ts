import { ChangeDetectionStrategy, Component, EventEmitter, Output } from "@angular/core";
import { equipmentStateList, equipmentStateStatusList } from "../../evj-equipment-state.const";

@Component({
  selector: 'evj-equipment-state-header',
  templateUrl: './evj-equipment-state-header.component.html',
  styleUrls: ['./evj-equipment-state-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentStateHeaderComponent {
    @Output() public stateFilterChange: EventEmitter<string> = new EventEmitter;
    @Output() public statusFilterChange: EventEmitter<string> = new EventEmitter;

    public stateFilter: string[] = equipmentStateList.map(state => state.value);
    public statusFilter: string[] = equipmentStateStatusList.map(status => status.value);

    public stateFilterChangeEmit(value: string): void {
      this.stateFilterChange.emit(value);
    }

    public statusFilterChangeEmit(value: string): void {
      this.statusFilterChange.emit(value);
    }
}

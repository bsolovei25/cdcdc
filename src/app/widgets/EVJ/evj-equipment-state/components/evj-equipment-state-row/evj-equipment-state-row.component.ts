import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IEquipmentState } from "@dashboard/models/EVJ/equipment-state";

@Component({
  selector: 'evj-equipment-state-row',
  templateUrl: './evj-equipment-state-row.component.html',
  styleUrls: ['./evj-equipment-state-row.component.scss'],
})
export class EquipmentStateRowComponent {
  @Input() row: IEquipmentState;

  @Output() onSelect: EventEmitter<void> = new EventEmitter();
  @Output() onRowSelect: EventEmitter<IEquipmentState> = new EventEmitter();

  public isEditMode: boolean = false;

  public checkboxSelect(): void {
    this.onSelect.emit();
  }

  public rowSelect(): void {
    this.onRowSelect.emit(this.row);
  }
}

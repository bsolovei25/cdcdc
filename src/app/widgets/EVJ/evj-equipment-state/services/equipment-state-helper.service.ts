import { Injectable } from "@angular/core";
import { IEquipmentState } from "@dashboard/models/EVJ/equipment-state";
import { EQUIPMENT_GROUP_DEFAULT_STATE, EQUIPMENT_STATE_LIST, EQUIPMENT_STATE_STATUS_LIST } from "../evj-equipment-state.const";

@Injectable({
  providedIn: 'root',
})
export class EquipmentStateHelperService {
  public stateFilterValue: string = [...EQUIPMENT_STATE_LIST][0].value;
  public statusFilterValue: string = [...EQUIPMENT_STATE_STATUS_LIST][0].value;
  public equipmentGroupValue: string = [...EQUIPMENT_GROUP_DEFAULT_STATE][0];

  public applyFilter(originTableData: IEquipmentState[]): IEquipmentState[] {
    let tableData = [...originTableData];

    if (!(this.equipmentGroupValue === [...EQUIPMENT_GROUP_DEFAULT_STATE][0])) {
      tableData = this.filterByEquipmentGroup(tableData);
    }

    if (!(this.stateFilterValue === EQUIPMENT_STATE_LIST[0].value)) {
      tableData = this.filterByState(tableData);
    }

    if (!(this.statusFilterValue === EQUIPMENT_STATE_STATUS_LIST[0].value)) {
      tableData = this.filterByStatus(tableData);
    }

    return tableData;
  }

  public formDisposition(tableData: IEquipmentState[]): void {
    const selectedRows = tableData.filter(row => row.isSelected);
    throw new Error('Не реализовано');
  }

  private filterByEquipmentGroup(tableData: IEquipmentState[]): IEquipmentState[] {
    return tableData.filter(row => row.equipmentGroup === this.equipmentGroupValue);
  }

  private filterByState(tableData: IEquipmentState[]): IEquipmentState[] {
    return tableData.filter(row => row.state === this.getStateValue());
  }

  private filterByStatus(tableData: IEquipmentState[]): IEquipmentState[] {
    return tableData.filter(row => row.status === this.getStatusValue());
  }

  private getStatusValue(): string {
    return EQUIPMENT_STATE_STATUS_LIST.find(equipmentStatus =>
      equipmentStatus.value === this.statusFilterValue).status;
  }

  private getStateValue(): string {
    return EQUIPMENT_STATE_LIST.find(equipmentState =>
      equipmentState.value === this.stateFilterValue).state;
  }
}

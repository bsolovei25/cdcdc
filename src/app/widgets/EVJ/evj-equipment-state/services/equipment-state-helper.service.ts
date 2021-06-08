import { Injectable } from "@angular/core";
import { IEquipmentState } from "@dashboard/models/EVJ/equipment-state";
import { equipmentStateList, equipmentStateStatusList, equipmentTypeList } from "../evj-equipment-state.const";

@Injectable({
  providedIn: 'root',
})
export class EquipmentStateHelperService {
  public stateFilterValue: string = [...equipmentStateList][0].value;
  public statusFilterValue: string = [...equipmentStateStatusList][0].value;
  public equipmentTypeValue: string = [...equipmentTypeList][0].value;

  public applyFilter(originTableData: IEquipmentState[]): IEquipmentState[] {
    let tableData = [...originTableData];

    tableData = this.filterByEquipmentType(tableData);

    if (!(this.stateFilterValue === equipmentStateList[0].value)) {
      tableData = this.filterByState(tableData);
    }

    if (!(this.statusFilterValue === equipmentStateStatusList[0].value)) {
      tableData = this.filterByStatus(tableData);
    }

    return tableData;
  }

  public formDisposition(tableData: IEquipmentState[]): void {
    const selectedRows = tableData.filter(row => row.isSelected);
    throw new Error('Не реализовано');
  }

  private filterByState(tableData: IEquipmentState[]): IEquipmentState[] {
    return tableData.filter(row => row.state === this.getStateValue());
  }

  private filterByStatus(tableData: IEquipmentState[]): IEquipmentState[] {
    return tableData.filter(row => row.status === this.getStatusValue());
  }

  private filterByEquipmentType(tableData: IEquipmentState[]): IEquipmentState[] {
    return tableData.filter(row => row.equipmentType === this.getEquipmentTypeValue());
  }

  private getStatusValue(): string {
    return equipmentStateStatusList.find(equipmentStatus =>
      equipmentStatus.value === this.statusFilterValue).status;
  }

  private getStateValue(): string {
    return equipmentStateList.find(equipmentState =>
      equipmentState.value === this.stateFilterValue).state;
  }

  private getEquipmentTypeValue(): string {
    return equipmentTypeList.find(equipmentType =>
      equipmentType.value === this.equipmentTypeValue).type;
  }
}

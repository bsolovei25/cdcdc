import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from "@angular/core";

import { IEquipmentStateSelection } from "@dashboard/models/EVJ/equipment-state";
import { EQUIPMENT_GROUP_DEFAULT_STATE, EQUIPMENT_TYPE_LIST } from "../../evj-equipment-state.const";
import { EquipmentStateApiService } from "../../services/equipment-state-api.service";
import { EquipmentStateHelperService } from "../../services/equipment-state-helper.service";
import { DecorateUntilDestroy, takeUntilDestroyed } from "@shared/functions/take-until-destroed.function";

@DecorateUntilDestroy()
@Component({
  selector: 'evj-equipment-state-production-header',
  templateUrl: './evj-equipment-state-production-header.component.html',
  styleUrls: ['./evj-equipment-state-production-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentStateProductionHeaderComponent implements OnInit {
  @Output() public equipmentGroupSelect: EventEmitter<string> = new EventEmitter;
  @Output() public getTableData: EventEmitter<IEquipmentStateSelection> = new EventEmitter;
  @Output() public resetGroupSelectEmit: EventEmitter<null> = new EventEmitter;
  @Output() public resetTableData: EventEmitter<null> = new EventEmitter;

  public productionList: string[] = [];
  public plantList: string[] = [];
  public equipmentTypeList: string[] = EQUIPMENT_TYPE_LIST.map(type => type.value);
  public equipmentGroupList: string[] = [...EQUIPMENT_GROUP_DEFAULT_STATE];

  private selectedEquipmentType: string = this.equipmentTypeList[0];

  private originProductionList: string[] = [];
  private originPlantList: string[] = [];

  constructor(public equipmentStateApiService: EquipmentStateApiService,
              public equipmentStateHelperService: EquipmentStateHelperService,
              public cdRef: ChangeDetectorRef) {}

  public sortPlantList(selectedProduction: string): void {
    if (this.plantList.length) {
      throw new Error('Сортировка не реализована, требуется модель данных установки');
      // this.resetPlantSelect();
      // this.plantListFilter = this.originPlantList.sort(plant => plant.parent === selectedProduction)
    }
  }

  public plantSelection(selectedPlant: string): void {
    this.resetGroupFilter();
    this.getEquipmentGroupList(selectedPlant);
    this.getTableData.emit({
      type: EQUIPMENT_TYPE_LIST.find(type => type.value === this.selectedEquipmentType).type,
      plant: selectedPlant
    });
  }

  public selectEquipmentType(typeValue: string): void {
      if (this.selectedEquipmentType)
      this.selectedEquipmentType = typeValue;
      this.resetTableData.emit(null);
      this.resetGroupFilter();

      this.getSelectionList();
  }

  public getEquipmentGroupList(selectedPlant: string): void {
    this.equipmentStateApiService.getEquipmentGroupList()
      .pipe(takeUntilDestroyed(this))
      .subscribe(equipmentGroupList => this.equipmentGroupList = [...EQUIPMENT_GROUP_DEFAULT_STATE, ...equipmentGroupList]);
  }

  public selectEquipmentGroup(selectedGroup: string): void {
    this.equipmentStateHelperService.equipmentGroupValue = selectedGroup;
    this.equipmentGroupSelect.emit(selectedGroup);
  }

  ngOnInit(): void {
    this.getSelectionList();
  }

  private getSelectionList(): void {
    this.equipmentStateApiService.getSelectionList(this.getEquipmentType(this.selectedEquipmentType))
      .pipe(takeUntilDestroyed(this))
      .subscribe(selectionList => {
        this.originProductionList = selectionList.productionList;
        this.originPlantList = selectionList.plantList;

        this.assignData();
      });
  }

  private assignData(): void {
    this.productionList = [...this.originProductionList];
    this.plantList = [...this.originPlantList];
  }

  private resetGroupFilter(): void {
    this.equipmentGroupList = [...EQUIPMENT_GROUP_DEFAULT_STATE];
    this.equipmentStateHelperService.equipmentGroupValue = [...EQUIPMENT_GROUP_DEFAULT_STATE][0];
  }

  private getEquipmentType(selectedEquipmentValue: string): string {
    return EQUIPMENT_TYPE_LIST.find(type => type.value === selectedEquipmentValue).type;
  }
}

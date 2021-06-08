import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from "@angular/core";
import { equipmentTypeList } from "../../evj-equipment-state.const";
import { EquipmentStateApiService } from "../../services/equipment-state-api.service";

@Component({
  selector: 'evj-equipment-state-production-header',
  templateUrl: './evj-equipment-state-production-header.component.html',
  styleUrls: ['./evj-equipment-state-production-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentStateProductionHeaderComponent implements OnInit {
  @Output() public equipmentTypeChangeEmit: EventEmitter<string> = new EventEmitter;
  @Output() public plantChangeEmit: EventEmitter<string> = new EventEmitter;

  private selectedProduction: string;
  private selectedPlant: string;
  private selectedEquipment: string;
  private selectedEquipmentType: string;

  public productionList: string[] = [];
  public plantList: string[] = [];
  public equipmentTypeFilter: string[] = equipmentTypeList.map(type => type.value);
  public equipmentList: string[] = [];

  constructor(public equipmentStateApiService: EquipmentStateApiService) {}

  public getPlantList(selectedProduction: string): void {
    this.selectedProduction = selectedProduction;
    this.equipmentStateApiService.getPlantList()
      .subscribe(plantList => this.plantList = plantList);

    if (this.selectedEquipment) {
      this.getEquipmentList(this.selectedPlant);
    }
  }

  public selectEquipmentType(type: string): void {
    this.selectedEquipmentType = type;
    this.equipmentTypeChangeEmit.emit(type);

    if (this.selectedProduction && this.selectedPlant) {
      this.getEquipmentList(this.selectedPlant);
    }
  }

  public getEquipmentList(selectedPlant: string): void {
    this.selectedPlant = selectedPlant;

    this.getTableData(selectedPlant);

    this.equipmentStateApiService.getEquipmentList()
      .subscribe(equipmentList => this.equipmentList = equipmentList);
  }

  public selectEquipment(selectedEquipment: string): void {
    this.selectedEquipment = selectedEquipment;
  }

  ngOnInit(): void {
    this.getProductionList();
  }

  private getProductionList(): void {
    this.equipmentStateApiService.getProductionList()
      .subscribe(productionList => this.productionList = productionList);
  }

  private getTableData(selectedPlant: string): void {
    this.plantChangeEmit.emit(selectedPlant);
  }
}

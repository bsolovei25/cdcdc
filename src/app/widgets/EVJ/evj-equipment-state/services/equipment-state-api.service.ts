import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IEquipmentState } from "@dashboard/models/EVJ/equipment-state";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AppConfigService } from "@core/service/app-config.service";

// Mock
import { of } from "rxjs";
import {
  equipmentListMock,
  plantListMock,
  productionListMock,
  tableDataMock
} from "./equipment-state.mock";

@Injectable({
  providedIn: 'root',
})
export class EquipmentStateApiService {
  public restUrl: string;

  constructor(protected http: HttpClient, configService: AppConfigService) {
    this.restUrl = configService.restUrl;
  }

  public getTableData(plant: string): Observable<IEquipmentState[]> {
    // this.http.get<IEquipmentState[]>(`url`${plant})/
    return of(tableDataMock) // Mock
    .pipe(
      map((tableData: IEquipmentState[]) => {
        tableData.forEach(row => {
          row.isSelected = false;
          row.isHighlighted = false;
          row.isEdit = false;
        });
        return tableData;
      })
    );
  }

  public getProductionList(): Observable<string[]> {
    // this.http.get<string[]>('`${this.restUrl}/url')
    return of(productionListMock) // Mock
  }

  public getPlantList(): Observable<string[]> {
    // this.http.get<string[]>('`${this.restUrl}/url')
    return of(plantListMock); // Mock
  }

  public getEquipmentList(): Observable<string[]> {
    // this.http.get<string[]>('`${this.restUrl}/url')
    return of(equipmentListMock); // Mock
  }
}

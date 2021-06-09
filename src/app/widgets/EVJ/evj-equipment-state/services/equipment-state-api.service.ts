import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { AppConfigService } from "@core/service/app-config.service";
import { IEquipmentState, IEquipmentStateSelection, IEquipmentStateSelectionList } from "@dashboard/models/EVJ/equipment-state";

// Mock
import { of } from "rxjs";
import {
  equipmentListMock,
  selectionListDynamic,
  selectionListStatic,
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

  public getTableData(selection: IEquipmentStateSelection): Observable<IEquipmentState[]> {
    // this.http.get<string[]>(`${this.restUrl}/url`, { body: selection})
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

  public getSelectionList(equipmentType: string): Observable<IEquipmentStateSelectionList> {
    // this.http.get<string[]>(`${this.restUrl}/url`)
    if (equipmentType === 'dynamic') {
      return of(selectionListDynamic) // Mock только с динамическим оборудованием
    } else {
      return of(selectionListStatic) // Mock только со статическим оборудованием
    }
    
  }

  public getEquipmentGroupList(): Observable<string[]> {
    // this.http.get<string[]>(`${this.restUrl}/url`)
    return of(equipmentListMock); // Mock
  }

  public saveEquipmentData(saveData: IEquipmentState[]): void {
    // this.http.post<IEquipmentState[]>(`${this.restUrl}/url`)
  }
}

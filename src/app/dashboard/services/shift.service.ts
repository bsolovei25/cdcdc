import { Injectable } from '@angular/core';
import {ShiftPass} from '../models/shift.model';
import {environment} from '../../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../../services/appConfigService";

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  public shiftPass: ShiftPass;

  private restUrl: string;

  constructor(private http: HttpClient, configService: AppConfigService) {
    this.restUrl = configService.restUrl;
  }

  private async getShiftPassAsync(): Promise<any>  {
    return this.http.get(this.restUrl + '/api/shift').toPromise();
  }

  private async changePositionAsync(id): Promise<any>  {
    return this.http.post(this.restUrl + '/api/Employees' + id.toString() + '/setResponsible', null).toPromise();
  }

  private async changeStatusAsync(status, id, idShift): Promise<any>  {
    switch (status) {
      case '':
        return this.http.post(this.restUrl + 'api/shift' + idShift + '/Employee' + id + '/ChangeStatus/InProgress', null).toPromise();
      case '':
        return this.http.post(this.restUrl + 'api/shift' + idShift + '/Employee' + id + '/ChangeStatus/Accepted', null).toPromise();
      case '':
        return this.http.post(this.restUrl + 'api/shift' + idShift + '/Employee' + id + '/ChangeStatus/Passed', null).toPromise();
      case '':
        return this.http.post(this.restUrl + 'api/shift' + idShift + '/Employee' + id + '/ChangeStatus/Absent', null).toPromise();
    }
  }

  public async getShiftPass() {
    this.shiftPass = await this.getShiftPassAsync();
    console.log(this.shiftPass);
  }

  public async changePosition(id) {
    await this.changePositionAsync(id);
    this.getShiftPass();
  }
}

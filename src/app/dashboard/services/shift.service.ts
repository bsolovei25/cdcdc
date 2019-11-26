import { Injectable } from '@angular/core';
import {ShiftPass} from '../models/shift.model';
import {environment} from '../../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../../services/appConfigService";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  public shiftPass: BehaviorSubject<ShiftPass> = new BehaviorSubject<ShiftPass>(null);

  private restUrl: string;

  constructor(private http: HttpClient, configService: AppConfigService) {
    this.restUrl = configService.restUrl;
    this.getShiftPass();
  }

  private async getShiftPassAsync(): Promise<any>  {
    return this.http.get(this.restUrl + '/api/shift').toPromise();
  }

  private async changePositionAsync(id): Promise<any>  {
    return this.http.post(this.restUrl + '/api/employees/' + id.toString() + '/SetResponsible', null).toPromise();
  }

  private async changeStatusAsync(status, id, idShift): Promise<any>  {
    return this.http.post(this.restUrl + 'api/shift' + idShift + '/Employee' + id + '/ChangeStatus/InProgress', null).toPromise();
    switch (status) {
      case '':
    return this.http.post(this.restUrl + 'api/shift' + idShift + '/Employee' + id + '/ChangeStatus/InProgress', null).toPromise();
      case '':
        return this.http.post(this.restUrl + 'api/shift' + idShift + '/Employee' + id + '/ChangeStatus/Accepted', null).toPromise();
      case '':
        return this.http.post(this.restUrl + 'api/shift' + idShift + '/Employee' + id + '/ChangeStatus/Passed', null).toPromise();
      case 'Absent':
        return this.http.post(this.restUrl + 'api/shift' + idShift + '/Employee' + id + '/ChangeStatus/Absent', null).toPromise();
    }
  }

  public async getShiftPass() {
    const tempData = await this.getShiftPassAsync();
    this.shiftPass.next(tempData);
    console.log(this.shiftPass);
  }

  public async changePosition(id) {
    await this.changePositionAsync(id);
    this.getShiftPass();
  }
}

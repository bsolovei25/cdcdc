import { Injectable } from '@angular/core';
import {Employee, ShiftMember, ShiftPass} from '../models/shift.model';
import {environment} from '../../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../../services/appConfigService";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  public shiftPass: BehaviorSubject<ShiftPass> = new BehaviorSubject<ShiftPass>(null);
  public allMembers: Employee[] = null;

  private restUrl: string;

  constructor(private http: HttpClient, configService: AppConfigService) {
    this.restUrl = configService.restUrl;
    this.getShiftInfo();
  }

  private async getShiftPassAsync(): Promise<any>  {
    return this.http.get(this.restUrl + '/api/shift').toPromise();
  }

  private async getAllMembersAsync(): Promise<any>  {
    return this.http.get(this.restUrl + '/api/employees').toPromise();
  }

  private async changePositionAsync(id, idShift): Promise<any>  {
    return this.http.post(this.restUrl + '/api/shift/' + idShift + '/employee/' + id.toString() + '/setresponsible', null).toPromise();
  }

  private async changeStatusAsync(status, id, idShift): Promise<any>  {
    return this.http.post(this.restUrl + '/api/shift/' + idShift + '/Employee/' + id + '/ChangeStatus/' + status, null).toPromise();
  }

  private async addMemberAsync(id, idShift): Promise<any>  {
    return this.http.post(this.restUrl + '/api/shift/' + idShift + '/Employee/' + id, null).toPromise();
  }

  private async delMemberAsync(id, idShift): Promise<any>  {
    return this.http.delete(this.restUrl + '/api/shift/' + idShift + '/Employee/' + id).toPromise();
  }

  private async applyShiftAsync(idShift, type) {
    return this.http.post(this.restUrl + '/api/shift/' + idShift + '/' + type, null).toPromise();
  }

  public async getShiftInfo() {
    const tempData = await this.getShiftPassAsync();
    this.allMembers = await this.getAllMembersAsync();
    this.shiftPass.next(tempData);
    console.log(this.shiftPass);
    console.log(this.allMembers);
  }

  public async applyShift(idShift, type) {
    await this.applyShiftAsync(idShift, type);
    this.getShiftInfo();
  }

  public async changePosition(id, idShift) {
    await this.changePositionAsync(id, idShift);
    this.getShiftInfo();
  }

  public async changeStatus(status, id, idShift) {
    await this.changeStatusAsync(status, id, idShift);
    this.getShiftInfo();
  }

  public async addMember(id, idShift) {
    await this.addMemberAsync(id, idShift);
    this.getShiftInfo();
  }

  public async delMember(id, idShift) {
    await this.delMemberAsync(id, idShift);
    this.getShiftInfo();
  }
}

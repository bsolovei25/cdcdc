import { Injectable } from '@angular/core';
import {ShiftPass} from '../models/shift.model';
import {environment} from '../../../environments/environment';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  public shiftPass: ShiftPass;

  private restUrl: string;

  constructor(private http: HttpClient) {
    this.restUrl = environment.restUrl;
  }

  private async getShiftPassAsync(): Promise<any>  {
    return this.http.get(this.restUrl + '/api/shift').toPromise();
  }

  private async changePositionAsync(position, id): Promise<any>  {
    switch (position) {
      case '':
        return this.http.post(this.restUrl + '/api/Employees/' + id.toString() + '/ChangePosition/Responsible', null).toPromise();
      case '':
        return this.http.post(this.restUrl + '/api/Employees/' + id.toString() + '/ChangePosition/Responsible', null).toPromise();
    }
  }

  private async changeStatusAsync(status, id): Promise<any>  {
    switch (status) {
      case '':
        return this.http.post(this.restUrl + '/api/Employees/' + id.toString() + '/ChangePosition/Responsible', null).toPromise();
      case '':
        return this.http.post(this.restUrl + '/api/Employees/' + id.toString() + '/ChangePosition/Responsible', null).toPromise();
      case '':
        return this.http.post(this.restUrl + '/api/Employees/' + id.toString() + '/ChangePosition/Responsible', null).toPromise();
      case '':
        return this.http.post(this.restUrl + '/api/Employees/' + id.toString() + '/ChangePosition/Responsible', null).toPromise();
    }
  }


  public async getShiftPass() {
    this.shiftPass = await this.getShiftPassAsync();
    console.log(this.shiftPass);
  }

  public async changePosition(position, id) {
    await this.changePositionAsync(position, id);
    this.getShiftPass();
  }
}

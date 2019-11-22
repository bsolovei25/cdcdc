import { Injectable } from '@angular/core';
import {ShiftPass} from '../models/shift.model';
import {environment} from '../../../environments/environment';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  public shiftPass: ShiftPass;

  private restUrl: string = 'http://192.168.0.4:5888';

  constructor(private http: HttpClient) {
    // this.restUrl = environment.restUrl;
    this.getShiftPass();
  }

  private async getShiftPassAsync(): Promise<any>  {
    return this.http.get(this.restUrl + '/api/Shift').toPromise();
  }

  public async getShiftPass() {
    this.shiftPass = await this.getShiftPassAsync();
    console.log(this.shiftPass);
  }

  public test() {
    console.log('test');
  }

}

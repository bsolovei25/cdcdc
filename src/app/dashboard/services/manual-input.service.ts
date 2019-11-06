import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MachineParam, RestDataGet, RestDataSend} from '../models/manual-input.model';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ManualInputService {

  constructor(public http: HttpClient) {
    this.Timer();
  }

  public RestAnswer: RestDataGet;

  public warningTime = 5;

  SetStatusTimeOut(id: string) {
    const el = this.GetElementById(id);
    el.isActiveTimeOut = true;
  }

  SetValueRefresh(id: string, time: Date) {
    const el = this.GetElementById(id);
    if (el.CurValue !== '') {
      el.TimeCodeLast = el.TimeCodeCur;
      el.LastValue = el.CurValue;
    }
    el.Comment = '';
    el.CurValue = '';
    el.TimeCodeCur = time;
  }

  SetAll(data: RestDataGet) {
    this.RestAnswer = data;
  }

  GetData(): Observable<any> {
    const body = {username: 'test'};
    return this.http.get<RestDataGet>('http://localhost:5000/api/values/mock')
      .pipe(tap(ans => this.RestAnswer = ans));
  }

  SendData() {
    console.log(new Date(Date.now()).toUTCString());

    const data: RestDataSend[] = [];
    for (let i = 0; i < this.RestAnswer.Areas.length; i++) {
      for (let j = 0; j < this.RestAnswer.Areas[i].Machines.length; j++) {
        for (let k = 0; k < this.RestAnswer.Areas[i].Machines[j].MachineParams.length; k++) {
          const param = this.RestAnswer.Areas[i].Machines[j].MachineParams[k];
          const el: RestDataSend = new class implements RestDataSend {
            Comment: string = param.Comment;
            Id: string = param.Id;
            TimeCode: string = param.TimeCodeCur.toUTCString();
            Value: string = param.CurValue;
            isEdit = false;
          };
          data.push(el);
        }
      }
    }
    console.log(JSON.stringify(data));
  }

  GetElementById(id: string): MachineParam {
    for (const i in this.RestAnswer.Areas) {
      for (const j in this.RestAnswer.Areas[i].Machines) {
        for (const k in this.RestAnswer.Areas[i].Machines[j].MachineParams) {
          const param = this.RestAnswer.Areas[i].Machines[j].MachineParams[k];
          if (param.Id === id) {
            return param;
          }
        }
      }
    }
    return null;
  }

  testInit() {

    const timeFromDayStart = Math.floor((Date.now() - Math.floor(Date.now() / 1000 / 60 / 60 / 24) * 24 * 60 * 60 * 1000) / 1000 + 3 * 3600);
    console.log(timeFromDayStart);
    const testdiv = 30 - timeFromDayStart % 30;
    console.log(testdiv);

    for (const i in this.RestAnswer.Areas) {
      for (const j in this.RestAnswer.Areas[i].Machines) {
        for (const k in this.RestAnswer.Areas[i].Machines[j].MachineParams) {
          const param = this.RestAnswer.Areas[i].Machines[j].MachineParams[k];
          param.isActiveTime = true;
          param.isSave = false;
          param.isActiveTimeOut = false;
          param.saveCount = 0;
          param.PeriodTime = 20; // temp
          param.InputTime = 15; // temp
          param.Time = param.PeriodTime - timeFromDayStart % param.PeriodTime;
          param.TimeCodeCur = new Date(param.Time * 1000 + Math.floor(Date.now() / 1000) * 1000);
          console.log(param.TimeCodeCur);
          param.saveValue = '';
        }
      }
    }
    this.Update();
  }

  ChangeField(id: string) {
    const param = this.GetElementById(id);
    param.isSave = false;
  }

  SaveValues() {
    for (let i = 0; i < this.RestAnswer.Areas.length; i++) {
      for (let j = 0; j < this.RestAnswer.Areas[i].Machines.length; j++) {
        for (let k = 0; k < this.RestAnswer.Areas[i].Machines[j].MachineParams.length; k++) {
          const param = this.RestAnswer.Areas[i].Machines[j].MachineParams[k];
          if (param.CurValue !== '') {
            param.isSave = true;
            param.saveCount++;
            param.saveValue = param.CurValue;
          }
        }
      }
    }
    this.SendData();
  }

  CheckLastValue(id: string) {
    const param = this.GetElementById(id);
    if (param.CurValue === '' && param.saveValue !== '') {
      param.CurValue = param.saveValue;
      param.isSave = true;
    }
  }

  RefreshData(param: MachineParam) {
    param.CurValue = '';
    param.isActiveTime = true;
    param.isSave = false;
    param.isActiveTimeOut = false;
    param.saveCount = 0;
    param.Time = param.PeriodTime;
    param.saveValue = '';
    param.TimeCodeLast = param.TimeCodeCur;
    param.TimeCodeCur = new Date(param.TimeCodeCur.valueOf() + param.Time * 1000);
  }

  Timer() {
    setInterval(() => {
      this.Update();
    }, 1000);
  }

  Update() {
    for (const i in this.RestAnswer.Areas) {
      for (const j in this.RestAnswer.Areas[i].Machines) {
        for (const k in this.RestAnswer.Areas[i].Machines[j].MachineParams) {
          const param = this.RestAnswer.Areas[i].Machines[j].MachineParams[k];
          if (param.Time < param.PeriodTime - param.InputTime) {
            param.isActiveTime = false;
          }
          if (param.Time < param.PeriodTime - param.InputTime + this.warningTime) {
            param.isActiveTimeOut = true;
          }
          if (param.Time > 0) {
            param.Time--;
            console.log(param.Time);
          } else {
            this.RefreshData(param);
          }
        }
      }
    }
  }

}



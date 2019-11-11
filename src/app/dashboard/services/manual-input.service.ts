import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Machine_MI, MI_DataGet, MI_DataSend, MI_ParamSend, MI_TempValues, Param_MI, TestPostClass} from '../models/manual-input.model';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {WidgetsService} from './widgets.service';

@Injectable({providedIn: 'root'})
export class ManualInputService {

  constructor(private http: HttpClient, private manualInputService: ManualInputService, private widgetsService: WidgetsService) {

    this.widgetsService.getWidgetLiveDataFromWS('ManualInputChannel/Init', 'manual-input')
      .subscribe((ref) => {
          this.LoadData((ref));
          console.log("init");
        }
      );
  }

  private isLoad: boolean = false;

  public Data: Machine_MI[] = [];

  ChangeField(id: string) {
    const param = this.GetElementById(id);
    param.isSave = false;
  }

  CheckLastValue(id: string) {
    const param = this.GetElementById(id);
    if (param.curValue === '' && (param.saveValue.trim() !== '' || param.saveValue !== null)) {
      param.curValue = param.saveValue;
      param.isSave = true;
      param.isError = false;
    }
  }

  LoadData(data: Machine_MI[]) {
    const tempData = this.GetFlatData(this.Data);
    this.Data = data;
    const newData = this.GetFlatData(this.Data);
    if (tempData.length === 0) {
      for (const i in newData) {
        if (newData[i].curValue !== '') {
          newData[i].isSave = true;
          newData[i].isEdit = true;
          newData[i].saveValue = newData[i].curValue;
        }
      }
    }
    for (const i in tempData) {
      const el = this.GetElementById(tempData[i].id);
      el.isError = tempData[i].isError;
      el.comment = tempData[i].comment;
      if (el.curValue !== '') {
        el.isEdit = true;
        el.saveValue = el.curValue;
      }
      if (tempData[i].curValue !== '' && tempData[i].isSave === false) {
        el.curValue = tempData[i].curValue;
      } else {
        if (el.curValue !== '') {
          el.isSave = true;
          el.isError = false;
        }
      }
    }
  }

  BtnSaveValues() {
    let elsToSave: Param_MI[] = [];
    for (const i in this.Data) {
      for (const j in this.Data[i].groups) {
        for (const k in this.Data[i].groups[j].params) {
          const param = this.Data[i].groups[j].params[k];
          if ((param.curValue !== null && param.curValue !== '') && param.isActive) {
            elsToSave.push(param);
          }
        }
      }
    }
    this.SendData(elsToSave);
  }

  SendData(elsToSave: Param_MI[]) {
    const params: MI_ParamSend[] = [];
    for (let i in elsToSave) {
      let param = elsToSave[i];
      let el: MI_ParamSend = new class implements MI_ParamSend {
        Id = param.id;
        Value = param.curValue;
        TimeCode = param.curTime;
        Comment = param.comment;
        isEdit = param.isEdit;
      };
      params.push(el);
    }
    let data = new class implements MI_DataSend {
      Id = '23912391203983884';
      User = 'Username';
      Params = params;
    };
    console.log(JSON.stringify(data));
    this.PostData(data);
  }

  // TODO
  PostData(Params: MI_DataSend) {
    this.http.post('http://192.168.0.4:5555/manualinput/post', Params)
      .subscribe(
        (data: MI_DataGet) => {
          console.log(data);
          this.SaveValues(data);
        },
        error => console.log(error)
      );
  }

  SaveValues(ids: MI_DataGet) {
    for (const i in ids.trueValues) {
      let el = this.GetElementById(ids.trueValues[i]);
      el.isEdit = true;
      el.isSave = true;
      el.saveValue = el.curValue;
    }
    for (const i in ids.falseValues) {
      let el = this.GetElementById(ids.falseValues[i]);
      el.isError = true;
    }
  }

  GetFlatData(root: Machine_MI[]): Param_MI[] {
    const ans: Param_MI[] = [];
    for (const i in root) {
      for (const j in root[i].groups) {
        for (const k in root[i].groups[j].params) {
          const param = Object.assign(root[i].groups[j].params[k]);
          ans.push(param);
        }
      }
    }
    return ans;
  }

  GetElementById(id: string): Param_MI {
    for (const i in this.Data) {
      for (const j in this.Data[i].groups) {
        for (const k in this.Data[i].groups[j].params) {
          const param = this.Data[i].groups[j].params[k];
          if (param.id === id) {
            return param;
          }
        }
      }
    }
    return null;
  }

  GetElementIdxById(id: string): string[] {
    for (const i in this.Data) {
      for (const j in this.Data[i].groups) {
        for (const k in this.Data[i].groups[j].params) {
          const param = this.Data[i].groups[j].params[k];
          if (param.id === id) {
            let idx: string[] = [];
            idx.push(i);
            idx.push(j);
            idx.push(k);

            return idx;
          }
        }
      }
    }
    return null;
  }
}



import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Machine_MI, MI_DataGet, MI_DataSend, MI_ParamSend, Param_MI} from '../models/manual-input.model';
import {AppConfigService} from 'src/app/services/appConfigService';

@Injectable({providedIn: 'root'})
export class ManualInputService {

  constructor(private http: HttpClient, configService: AppConfigService) {
    this.restUrl = configService.restUrl;
  }

  private restUrl: string;

  ChangeField(id: string, data: Machine_MI[]) {
    const param = this.GetElementById(id, data);
    param.isSave = false;
  }

  CheckLastValue(id: string, data: Machine_MI[]) {
    const param = this.GetElementById(id, data);
    if (param.curValue === '' && (param.saveValue && param.saveValue !== '')) {
      param.curValue = param.saveValue;
      param.isSave = true;
      param.isError = false;
    }
  }

  LoadData(data: Machine_MI[], newData: Machine_MI[]): Machine_MI[] {
    const tempData = this.GetFlatData(data);
    const newFlatData = this.GetFlatData(newData);
    if (tempData.length === 0) {
      for (const i in newFlatData) {
        if (newFlatData[i].curValue !== '') {
          newFlatData[i].isSave = true;
          newFlatData[i].isEdit = true;
          newFlatData[i].saveValue = newFlatData[i].curValue;
        }
      }
      return newData;
    }
    for (const i in tempData) {
      const el = this.GetElementById(tempData[i].id, data);
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
    return data;
  }

  BtnSaveValues(data: Machine_MI[]) {
    let elsToSave: Param_MI[] = [];
    for (const i in data) {
      for (const j in data[i].groups) {
        for (const k in data[i].groups[j].params) {
          const param = data[i].groups[j].params[k];
          if ((param.curValue !== null && param.curValue !== '') && param.isActive) {
            elsToSave.push(param);
          }
        }
      }
    }
    this.SendData(elsToSave, data);
  }

  SendData(elsToSave: Param_MI[], data: Machine_MI[]) {
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
    let req = new class implements MI_DataSend {
      Id = '23912391203983884';
      User = 'Username';
      Params = params;
    };
    // console.log(JSON.stringify(req));
    this.PostData(req, data);
  }

  PostData(Params: MI_DataSend, data: Machine_MI[]) {
    this.http.post(this.restUrl + '/manualinput/post', Params)
      .subscribe(
        (ans: MI_DataGet) => {
          // console.log(ans);
          this.SaveValues(ans, data);
        },
      //  error => console.log(error)
      );
  }

  SaveValues(ids: MI_DataGet, data: Machine_MI[]) {
    for (const i in ids.trueValues) {
      let el = this.GetElementById(ids.trueValues[i], data);
      el.isEdit = true;
      el.isSave = true;
      el.saveValue = el.curValue;
    }
    for (const i in ids.falseValues) {
      let el = this.GetElementById(ids.falseValues[i], data);
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

  GetElementById(id: string, data: Machine_MI[]): Param_MI {
    for (const i in data) {
      for (const j in data[i].groups) {
        for (const k in data[i].groups[j].params) {
          const param = data[i].groups[j].params[k];
          if (param.id === id) {
            return param;
          }
        }
      }
    }
    return null;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    IMachine_MI,
    MI_DataGet,
    MI_DataSend,
    MI_ParamSend,
    Param_MI,
    IValue,
} from '../models/manual-input.model';
import { AppConfigService } from 'src/app/services/appConfigService';

@Injectable({ providedIn: 'root' })
export class ManualInputService {
    public statusLoading;

    constructor(private http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    private restUrl: string;

    ChangeField(id: string, data: IMachine_MI[]) {
        const param = this.GetElementById(id, data);
        param.isSave = false;
    }

    CheckLastValue(id: string, data: IMachine_MI[]) {
        const param = this.GetElementById(id, data);
        if (param.curValue === '' && param.saveValue && param.saveValue !== '') {
            param.curValue = param.saveValue;
            param.isSave = true;
            param.isError = false;
        }
    }

    LoadData(data: IMachine_MI[], newData: IMachine_MI[]): IMachine_MI[] {
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
            const el = this.GetElementById(tempData[i].id, newData);
            el.isError = tempData[i].isError;
            if (el.curValue !== '') {
                el.isEdit = true;
                el.saveValue = el.curValue;
            }

            el.comment = el.curComment;

            if (tempData[i].comment !== undefined && tempData[i].isSave === undefined) {
                el.isEdit = true;
                el.comment = tempData[i].comment;
                el.openInput = true;
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
        return newData;
    }

    BtnSaveValues(data: IMachine_MI[]) {
        this.saveBar('Сохранение', true);
        this.statusLoading = true;
        let elsToSave: Param_MI[] = [];
        for (const i in data) {
            for (const j in data[i].groups) {
                for (const k in data[i].groups[j].params) {
                    const param = data[i].groups[j].params[k];
                    if (param.curValue !== null && param.curValue !== '' && param.isActive) {
                        elsToSave.push(param);
                    }
                }
            }
        }
        this.SendData(elsToSave, data);
    }

    SendData(elsToSave: Param_MI[], data: IMachine_MI[]) {
        const params: MI_ParamSend[] = [];
        for (let i in elsToSave) {
            let param = elsToSave[i];
            let el: MI_ParamSend = new (class implements MI_ParamSend {
                Id = param.id;
                Value = param.curValue;
                TimeCode = param.curTime;
                Comment = param.comment;
                isEdit = param.isEdit;
            })();
            params.push(el);
        }
        let req = new (class implements MI_DataSend {
            Id = '23912391203983884';
            User = 'Username';
            Params = params;
        })();
        this.PostData(req, data);
    }

    PostData(Params: MI_DataSend, data: IMachine_MI[]) {
        this.http.post(this.restUrl + '/manualinput/post', Params).subscribe((ans: MI_DataGet) => {
            this.saveBar('Пустой ввод', false);
            this.SaveValues(ans, data);
        });
    }

    SaveValues(ids: MI_DataGet, data: IMachine_MI[]) {
        for (const i in ids.trueValues) {
            let el = this.GetElementById(ids.trueValues[i].id, data);
            el.isEdit = true;
            el.isSave = true;
            el.isError = false;
            el.saveValue = el.curValue;
            this.saveBar('Сохранено', false);
        }
        for (const i in ids.falseValues) {
            let el = this.GetElementById(ids.falseValues[i].id, data);
            el.isError = true;
            this.saveBar('Сохранено с ошибкой', false);
        }
    }

    GetFlatData(root: IMachine_MI[]): Param_MI[] {
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

    GetElementById(id: string, data: IMachine_MI[]): Param_MI {
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

    saveBar(text: string, statusLoad: boolean, durection: number = 2000) {
        let snackBar = document.getElementById('saveBar');
        let snackBarBlock = document.getElementById('saveBarBlock');
        if (statusLoad) {
            snackBar.className = 'show';
            snackBarBlock.className = 'show';
            snackBar.innerText = text;
        } else {
            snackBar.innerText = text;
            setTimeout(function() {
                snackBar.className = snackBar.className.replace('show', '');
            }, durection);
            snackBarBlock.className = snackBarBlock.className.replace('show', '');
        }
    }
}

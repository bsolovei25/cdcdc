import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    IMachine_MI,
    MI_DataGet,
    MI_DataSend,
    MI_ParamSend,
    Param_MI,
    IValue,
} from '../../models/manual-input.model';
import { AppConfigService } from '@core/service/app-config.service';

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

            el.openInput = false;
            if (
                tempData[i].comment !== undefined &&
                tempData[i].comment !== null &&
                tempData[i].isSave === undefined
            ) {
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

    public BtnSaveValues(data: IMachine_MI[], widgetId: string): void {
        this.saveBar('Сохранение', true);
        this.statusLoading = true;
        const elsToSave: Param_MI[] = [];
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
        this.SendData(elsToSave, data, widgetId);
    }

    SendData(elsToSave: Param_MI[], data: IMachine_MI[], widgetId: string): void {
        const params: MI_ParamSend[] = [];
        for (const param of elsToSave) {
            const el: MI_ParamSend = {
                Id: param.id,
                Value: param.curValue,
                TimeCode: param.curTime,
                Comment: param.comment,
                isEdit: param.isEdit,
            };
            params.push(el);
        }
        const req: MI_DataSend = {
            Id: widgetId,
            User: 'Username',
            Params: params,
        };
        this.PostData(req, data);
    }

    PostData(Params: MI_DataSend, data: IMachine_MI[]): void {
        this.http.post(this.restUrl + '/api/manualinput/post', Params).subscribe((ans: MI_DataGet) => {
            this.saveBar('Пустой ввод', false);
            this.SaveValues(ans, data);
        });
    }

    SaveValues(ids: MI_DataGet, data: IMachine_MI[]): void {
        for (const i in ids.trueValues) {
            let el = this.GetElementById(ids.trueValues[i].id, data);
            el.isEdit = true;
            el.isSave = true;
            el.isError = false;
            el.curComment = el.comment;
            el.saveValue = el.curValue;
            this.saveBar('Сохранено', false);
        }
        for (const i in ids.falseValues) {
            const el = this.GetElementById(ids.falseValues[i].id, data);
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

    saveBar(text: string, statusLoad: boolean, durection: number = 2000): void {
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

    async getManualInput(id: string): Promise<{ machines: IMachine_MI[]; isUserHasWriteClaims: boolean}> {
        return await this.http
            .get<{ machines: IMachine_MI[]; isUserHasWriteClaims: boolean}>(this.restUrl + '/api/manualinput/ManualInputData/' + id)
            .toPromise();
    }
}

import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';
import { IExtraOptionsWindow, IKpeAdditionalParameter } from '../../../../../dashboard/models/EVJ/events-widget';
import { EventsWorkspaceService } from '../../../../../dashboard/services/widgets/EVJ/events-workspace.service';
import { AuthService } from '@core/service/auth.service';
import { IAlertWindowModel } from '@shared/models/alert-window.model';
import { KpeWorkspaceService } from '../../../../../dashboard/services/widgets/EVJ/kpe-workspace.service';
import {
    IKpeAllDependentParameters,
    IKpeNotification,
    IKpeWorkspaceParameter,
} from '../../../../../dashboard/models/EVJ/kpe-workspace.model';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IMessage } from '@shared/models/message.model';
import { MatSelectChange } from '@angular/material/select';

@Component({
    selector: 'evj-evj-events-workspace-extra-options',
    templateUrl: './evj-events-workspace-extra-options.component.html',
    styleUrls: ['./evj-events-workspace-extra-options.component.scss'],
})
export class EvjEventsWorkspaceExtraOptionsComponent implements OnInit, OnChanges, OnDestroy {
    @Input() public info: IExtraOptionsWindow = {
        data: null,
        isShow: false,
        acceptFunction: () => null,
        closeFunction: () => null,
    };
    @Output() checked: any = new EventEmitter<boolean>();

    private subscriptions: Subscription[] = [];
    public disableAdd: boolean;
    public allParameters: IKpeWorkspaceParameter[] = [];
    public dependentParameters: IKpeAllDependentParameters[] = [];
    public notificationParametersData: IKpeNotification;
    public form: FormGroup;
    formArray: FormArray;
    public index: number = -1;
    public oldMessage: string = '';

    constructor(
        private ewService: EventsWorkspaceService,
        private kpeWorkspaceService: KpeWorkspaceService,
        private authService: AuthService,
        private formBuild: FormBuilder
    ) {}

    ngOnInit(): void {
        this.loadData();
        this.subscriptions.push(
            this.kpeWorkspaceService.showSelectParameters$.subscribe((res) => {
                if (res) {
                    this.dependentParameters = res;
                }
            }),
            this.kpeWorkspaceService.selectParameter$.subscribe((res) => {
                if (res) {
                    this.getExtraParameters();
                }
            })
        );
    }

    ngOnChanges(): void {
        if (this.info?.data) {
            this.loadData();
            this.kpeWorkspaceService.selectParameter$.next(this.info.data.selectedParameter);
            this.form.get('parameters').setValue(this.info.data?.selectedParameter);
            this.formArray = this.form.get('dependentParameters') as FormArray;
            this.formArray.clear();
            this.setDependentParameters(this.info.data?.dependentParameters);
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe());
    }

    public setUnit(event?: MatSelectChange): string {
        const unit: string = this.dependentParameters[event.value].units;
        this.dependParameters.controls.forEach((v) => {
            const id = v.get('dependentParameterId').value;
            if (id === event.value) {
                v.get('units').setValue(unit);
            }
        });
        return unit;
    }

    loadData(): void {
        if (this.ewService.event.id) {
            this.getParametersByNotification();
            this.oldMessage = this.notificationDataToDescription(this.ewService.event.kpeAdditionalParameter);
        } else {
            this.oldMessage = this.notificationDataToDescription(this.notificationParametersData);
        }
        this.getParameters();
        this.getExtraParameters();
        if (this.ewService.event.id && this.ewService.event.kpeAdditionalParameter) {
            const controls = [];
            this.ewService.event.kpeAdditionalParameter.dependentParameters.forEach((value) => {
                controls.push(
                    new FormGroup({
                        dependentParameterId: new FormControl(value.dependentParameterId),
                        numericValue: new FormControl(value.numericValue),
                    })
                );
            });
            this.form = new FormGroup({
                parameters: new FormControl(this.ewService.event.kpeAdditionalParameter.selectedParameter),
                dependentParameters: new FormArray(controls),
            });
        } else {
            this.form = new FormGroup({
                parameters: new FormControl(null),
                dependentParameters: new FormArray([]),
            });
        }
    }

    get dependParameters(): FormArray {
        return this.form.get('dependentParameters') as FormArray;
    }

    setDependentParameters(dependentParameters: IKpeAllDependentParameters[]): void {
        dependentParameters?.forEach((param) => {
            const paramDep = this.dependentParameters.find((value) => value.id === param.dependentParameterId);
            this.formArray = this.form.get('dependentParameters') as FormArray;
            this.formArray.push(
                this.createFormGroup(param?.dependentParameterId, param?.numericValue, paramDep?.units)
            );
        });
    }

    createFormGroup(
        dependentParameterId: number = this.dependentParameters[0].id,
        numericValue: number = 0,
        units: string = this.dependentParameters[0].units
    ): FormGroup {
        return this.formBuild.group({
            dependentParameterId,
            numericValue,
            units,
        });
    }

    // Список с Установленными фактами
    private async getParameters(): Promise<void> {
        this.allParameters = await this.kpeWorkspaceService.getAllKpeParameters();
    }

    // Список с Зависимыми параметтрами
    private async getExtraParameters(): Promise<void> {
        const dependentParametersData = await this.kpeWorkspaceService.getKpeAllDependentParameters();
        this.kpeWorkspaceService.showSelectParameters$.next(dependentParametersData);
    }

    public getParameterId(event: any): void {
        this.kpeWorkspaceService.selectParameter$.next(event.value);
        if (!this.notificationParametersData) {
            return;
        }
        this.notificationParametersData.dependentParameters = [];
        this.formArray = this.form.get('dependentParameters') as FormArray;
        this.formArray?.clear();
    }

    private async getParametersByNotification(): Promise<void> {
        const data = await this.kpeWorkspaceService.getKpeNotificationParameters(this.ewService.event);
        if (!data) {
            return;
        }
        this.notificationParametersData = data;
    }

    private async deleteParametersByNotification(): Promise<void> {
        try {
            if (this.ewService.event.id) {
                await this.kpeWorkspaceService.deleteKpeNotificationParameters(this.ewService.event);
                this.ewService.event.kpeAdditionalParameter = null;
                this.ewService.event.facts.splice(this.index, 1);
                this.index = -1;
            } else {
                this.ewService.event.kpeAdditionalParameter = null;
                this.ewService.event.facts.splice(this.index, 1);
                this.index = -1;
                this.ewService.acceptButton$.next(null);
            }
            const popupWindow: IExtraOptionsWindow = {
                isShow: false,
                type: 'reset',
            };
            this.ewService.extraOptionsWindow$.next(popupWindow);
        } catch {
            const popupWindow: IExtraOptionsWindow = {
                isShow: false,
                type: 'save',
            };
            this.ewService.extraOptionsWindow$.next(popupWindow);
        }
    }

    // Закрыть всплывающее окно с Дополнительными параметры
    public cancel(): void {
        const popupWindow: IExtraOptionsWindow = {
            isShow: false,
            type: 'cancel',
        };
        this.ewService.extraOptionsWindow$.next(popupWindow);
        this.formArray?.clear();
        this.dependentParameters = null;
    }

    // Добавить зависимый параметр
    public addParameters(): void {
        this.formArray = this.form.get('dependentParameters') as FormArray;
        this.formArray.push(this.createFormGroup());
    }

    // Удалить зависимый параметр
    public removeParameters(): void {
        const depends = this.form.controls.dependentParameters as FormArray;
        depends.removeAt(depends.length - 1);
    }

    // POST Сохранить данные
    public async accept(): Promise<void> {
        const dependentParameters: IKpeAllDependentParameters[] = this.form.value.dependentParameters.map((value) => {
            const id = value.dependentParameterId?.id ? value.dependentParameterId?.id : value.dependentParameterId;
            return {
                numericValue: value.numericValue,
                dependentParameterId: id,
                name: this.dependentParameters[value.dependentParameterId - 1].name,
            };
        });
        this.notificationParametersData = {
            selectedParameter: this.form.value.parameters,
            dependentParameters,
            createdAt: new Date(),
            createdBy: this.authService.user$.getValue().id,
        };
        this.ewService.event.facts.forEach((v, index) => {
            if (v.comment === this.oldMessage) {
                this.index = index;
                this.oldMessage = v.comment;
            }
        });
        try {
            if (this.ewService.event.id) {
                const res = await this.kpeWorkspaceService.postKpeNotificationParameters(
                    this.ewService.event,
                    this.notificationParametersData
                );
                this.ewService.event.kpeAdditionalParameter = res;
                this.addKpeAdditionalToChat(res);
            } else {
                this.ewService.event.kpeAdditionalParameter = this.notificationParametersData;
                this.addKpeAdditionalToChat(this.notificationParametersData);
                this.ewService.acceptButton$.next(this.notificationParametersData);
            }
        } catch (error) {
            console.error(error);
        }
        const popupWindow: IExtraOptionsWindow = {
            type: 'save',
            isShow: false,
        };
        this.ewService.extraOptionsWindow$.next(popupWindow);
    }

    //  DELETE Удалить данные
    public discard(): void {
        const alertWindow: IAlertWindowModel = {
            isShow: true,
            questionText: 'Вы уверены что хотите удалить Дополнительные параметры?',
            acceptText: 'Да',
            cancelText: 'Нет',
            acceptFunction: () => this.deleteParametersByNotification(),
            closeFunction: () => this.ewService.ewAlertInfo$.next(null),
        };
        this.ewService.ewAlertInfo$.next(alertWindow);
        const popupWindow: IExtraOptionsWindow = {
            isShow: false,
            type: 'reset',
        };
        this.ewService.extraOptionsWindow$.next(popupWindow);
    }

    public addKpeAdditionalToChat(data: IKpeAdditionalParameter): void {
        if (this.index > -1) {
            this.ewService.event.facts[this.index].comment = this.notificationDataToDescription(data);
        } else {
            this.ewService.event.facts.push({
                comment: this.notificationDataToDescription(data),
            } as IMessage);
        }
    }

    public notificationDataToDescription(data: IKpeAdditionalParameter): string {
        const description: string[] = [];
        let result: string = '';
        description.push(data?.selectedParameter?.name);
        data?.dependentParameters?.forEach((value) => {
            description.push(
                value.name +
                    ' ' +
                    value?.numericValue?.toString() +
                    ' ' +
                    this.dependentParameters[value.dependentParameterId]?.units.toString()
            );
        });
        result = '\n'.concat(description.join(';\n'));
        return result;
    }

    public compareFnDependent(a, b): boolean {
        return a === b;
    }

    public compareFn(a, b): boolean {
        return a?.id === b?.id;
    }
}

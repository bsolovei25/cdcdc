import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';
import { IExtraOptionsWindow, IKpeAdditionalParameter } from "../../../../../dashboard/models/EVJ/events-widget";
import { EventsWorkspaceService } from '../../../../../dashboard/services/widgets/EVJ/events-workspace.service';
import { AuthService } from '@core/service/auth.service';
import { IAlertWindowModel } from '@shared/models/alert-window.model';
import { KpeWorkspaceService } from '../../../../../dashboard/services/widgets/EVJ/kpe-workspace.service';
import {
    IKpeAllDependentParameters,
    IKpeNotification,
    IKpeWorkspaceParameter,
} from '../../../../../dashboard/models/EVJ/kpe-workspace.model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from 'rxjs';


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

    constructor(
        private ewService: EventsWorkspaceService,
        private kpeWorkspaceService: KpeWorkspaceService,
        private authService: AuthService,
        private formBuild: FormBuilder
    ) {}

    ngOnInit(): void {
        console.log('onInit');

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
            this.setDependentParameters(this.info.data?.dependentParameters);
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe());
    }

    loadData(): void {
        if (this.ewService.event.id) {
            this.getParametersByNotification();
        }
        this.getParameters();
        this.form = this.formBuild.group({
            parameters: this.formBuild.control(null, Validators.required),
            dependentParameters: this.formBuild.array([]),
        });
    }

    get dependParameters(): FormArray {
        return this.form.get('dependentParameters') as FormArray;
    }

    setDependentParameters(dependentParameters: IKpeAllDependentParameters[]): void {
        dependentParameters?.forEach((param) => {
            this.formArray = this.form.get('dependentParameters') as FormArray;
            this.formArray.push(this.createFormGroup(param?.dependentParameterId, param?.numericValue));
        });
    }

    createFormGroup(
        dependentParameterId: number = this.dependentParameters[0]?.id,
        numericValue: number = 0
    ): FormGroup {
        return this.formBuild.group({
            dependentParameterId,
            numericValue,
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
            await this.kpeWorkspaceService.deleteKpeNotificationParameters(this.ewService.event);
            this.ewService.event.kpeAdditionalParameter = null;

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
            };
        });
        this.notificationParametersData = {
            selectedParameter: this.form.value.parameters,
            dependentParameters,
            createdAt: new Date(),
            createdBy: this.authService.user$.getValue().id,
        };
        try {
            if (this.ewService.event.id) {
                const res = await this.kpeWorkspaceService.postKpeNotificationParameters(
                    this.ewService.event,
                    this.notificationParametersData
                );
                this.ewService.event.kpeAdditionalParameter = {
                    selectedParameterId: res.selectedParameter.id,
                    dependentParameters: res.dependentParameters,
                    createdAt: res.createdAt,
                    createdBy: res.createdBy
                };
            } else {
                this.ewService.event.kpeAdditionalParameter = {
                    selectedParameterId: this.notificationParametersData.selectedParameter.id,
                    dependentParameters: this.notificationParametersData.dependentParameters,
                    createdAt: this.notificationParametersData.createdAt,
                    createdBy: this.notificationParametersData.createdBy
                }
                this.ewService.acceptButton$.next(this.notificationParametersData)
            }
        } catch (error) {
            console.error(error);
        }
        const popupWindow: IExtraOptionsWindow = {
            type: 'save',
            isShow: false,
        };
        this.ewService.extraOptionsWindow$.next(popupWindow);
        console.log(this.ewService.event.kpeAdditionalParameter);
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

    public compareFnDependent(a, b): boolean {
        return a?.dependentParameterId === b?.dependentParameterId;
    }

    public compareFn(a, b): boolean {
        return a?.id === b?.id;
    }
}

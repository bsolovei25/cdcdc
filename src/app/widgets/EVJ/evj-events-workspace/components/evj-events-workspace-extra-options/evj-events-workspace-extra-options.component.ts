import {
    Component,
    Input,
    OnInit,
    Output,
    EventEmitter,
    OnDestroy,
    OnChanges,
} from '@angular/core';
import { IExtraOptionsWindow } from '../../../../../dashboard/models/EVJ/events-widget';
import { EventsWorkspaceService } from '../../../../../dashboard/services/widgets/EVJ/events-workspace.service';
import { AuthService } from '@core/service/auth.service';
import { IAlertWindowModel } from '@shared/models/alert-window.model';
import { KpeWorkspaceService } from '../../../../../dashboard/services/widgets/EVJ/kpe-workspace.service';
import {
    IKpeAllDependentParameters,
    IKpeNotification,
    IKpeWorkspaceParameter,
} from '../../../../../dashboard/models/EVJ/kpe-workspace.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { log } from 'util';

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
        if (this.ewService.event.id) {
            this.getParametersByNotification();
        }
        this.loadData();
        this.subscriptions.push(
            this.kpeWorkspaceService.showSelectParameters$.subscribe((res) => {
                if (res) {
                    this.dependentParameters = res;
                }
            }),
            this.kpeWorkspaceService.selectParameter$.subscribe((res) => {
                if (res) {
                    this.getExtraParameters(res.id);
                    this.setDependentParameters(this.dependentParameters);
                }
            })
        );
        console.log('form', this.form);
    }

    ngOnChanges(): void {
        if (this.info?.data) {
            setTimeout((value) => {
                console.log(this.info?.data);
                this.form.get('parameters').setValue(this.info.data?.selectedParameter);
                this.setDependentParameters(this.info.data?.dependentParameters);
                console.log(this.form);
            }, 3000);
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe());
    }

    loadData(): void {
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
        dependentParameters.forEach((param) => {
            this.formArray = this.form.get('dependentParameters') as FormArray;
            this.formArray.push(
                this.createFormGroup(param?.dependentParameterId, param?.numericValue)
            );
        });
    }

    createFormGroup(dependentParameterId: number = null, numericValue: number = null): FormGroup {
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
    private async getExtraParameters(id: number): Promise<void> {
        const dependentParametersData = await this.kpeWorkspaceService.getKpeAllDependentParameters(
            id
        );
        this.kpeWorkspaceService.showSelectParameters$.next(dependentParametersData);
    }

    public getParameterId(event: any): void {
        this.kpeWorkspaceService.selectParameter$.next(event.value);
        if (!this.notificationParametersData) {
            return;
        }
        this.notificationParametersData.dependentParameters = [];
    }

    private async getParametersByNotification(): Promise<void> {
        const data = await this.kpeWorkspaceService.getKpeNotificationParameters(
            this.ewService.event
        );
        if (!data) {
            return;
        }
        this.notificationParametersData = data;
        // this.form = this.formBuild.group({
        //     parameters: this.formBuild.control(data.selectedParameter),
        //     dependentParameters: this.formBuild.array(data.dependentParameters),
        // });
    }

    private async deleteParametersByNotification(checkbox: boolean): Promise<void> {
        await this.kpeWorkspaceService.deleteKpeNotificationParameters(this.ewService.event);
        this.checked.emit(checkbox);
    }

    // Закрыть всплывающее окно с Дополнительными параметры
    public cancel(): void {
        const popupWindow = {
            isShow: false,
        };
        this.ewService.extraOptionsWindow$.next(popupWindow);
    }

    // Добавить зависимый параметр
    public addParameters(): void {
        this.createFormGroup();
    }

    // Удалить зависимый параметр
    public removeParameters(): void {
        const depends = this.form.controls.dependentParameters as FormArray;
        depends.removeAt(depends.length - 1);
    }

    // POST Сохранить данные
    public async accept(): Promise<void> {
        this.notificationParametersData = {
            selectedParameter: this.form.value.parameters,
            dependentParameters: this.form.value.dependentParameters,
            createdAt: new Date(),
            createdBy: this.authService.user$.getValue().id,
        };
        try {
            await this.kpeWorkspaceService.postKpeNotificationParameters(
                this.ewService.event,
                this.notificationParametersData
            );
        } catch (error) {
            console.error(error);
        }
        const popupWindow = {
            isShow: false,
        };
        this.ewService.extraOptionsWindow$.next(popupWindow);

        console.log(this.form);
    }

    //  DELETE Удалить данные
    public discard(): void {
        const alertWindow: IAlertWindowModel = {
            isShow: true,
            questionText: 'Вы уверены что хотите удалить Дополнительные параметры?',
            acceptText: 'Да',
            cancelText: 'Нет',
            acceptFunction: () => this.deleteParametersByNotification(false),
            closeFunction: () => this.ewService.ewAlertInfo$.next(null),
        };
        this.ewService.ewAlertInfo$.next(alertWindow);
        const popupWindow = {
            isShow: false,
        };
        this.ewService.extraOptionsWindow$.next(popupWindow);
    }

    public compareFn(a, b): boolean {
        return a?.dependentParameterId === b?.dependentParameterId;
    }
}

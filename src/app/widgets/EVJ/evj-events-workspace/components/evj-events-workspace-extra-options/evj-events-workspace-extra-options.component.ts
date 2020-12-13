import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IExtraOptionsWindow } from '../../../../../dashboard/models/EVJ/events-widget';
import { EventsWorkspaceService } from '../../../../../dashboard/services/widgets/EVJ/events-workspace.service';
import { AuthService } from '@core/service/auth.service';
import { IAlertWindowModel } from '@shared/models/alert-window.model';
import { KpeWorkspaceService } from '../../../../../dashboard/services/widgets/EVJ/kpe-workspace.service';
import {
    IKpeAllDependentParameters, IKpeNotification,
    IKpeWorkspaceParameter
} from '../../../../../dashboard/models/EVJ/kpe-workspace.model';

@Component({
    selector: 'evj-evj-events-workspace-extra-options',
    templateUrl: './evj-events-workspace-extra-options.component.html',
    styleUrls: ['./evj-events-workspace-extra-options.component.scss']
})
export class EvjEventsWorkspaceExtraOptionsComponent implements OnInit {
    @Input() public info: IExtraOptionsWindow = {
        isShow: false,
        acceptFunction: () => null,
        closeFunction: () => null
    };
    @Output() checked: any = new EventEmitter<boolean>();

    public disableAdd: boolean;
    public allParameters: IKpeWorkspaceParameter[] = [];
    public extraParameters: IKpeAllDependentParameters[] = [];
    public notificationParametersData: IKpeNotification;

    public indexOfDependentParameters: number = 0;

    constructor(
        private ewService: EventsWorkspaceService,
        private kpeWorkspaceService: KpeWorkspaceService,
        private authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.getParametersByNotification();
        this.getParameters();
        this.kpeWorkspaceService.showSelectParameters$.subscribe((res) => {
            if (res) {
                this.extraParameters = res;
            }
        });
        this.kpeWorkspaceService.selectParameter$.subscribe((res) => {
            if (res) {
                this.getExtraParameters(res.id);
            }
        });
    }

    private async getParameters(): Promise<void> {
        this.allParameters = await this.kpeWorkspaceService.getAllKpeParameters();
    }

    private async getExtraParameters(id: number): Promise<void> {
        const extraParametersData = await this.kpeWorkspaceService.getKpeAllDependentParameters(id);
        this.kpeWorkspaceService.showSelectParameters$.next(extraParametersData);
    }

    public getParameterId(event: any): void {
        this.kpeWorkspaceService.selectParameter$.next(event.value);
        this.notificationParametersData.dependentParameters = [];
        this.indexOfDependentParameters = 0;
    }

    private async getParametersByNotification(): Promise<void> {
        const data = await this.kpeWorkspaceService.getKpeNotificationParameters(
            this.ewService.event
        );
        this.notificationParametersData = data;
    }

    private async deleteParametersByNotification(checkbox: boolean): Promise<void> {
        await this.kpeWorkspaceService.deleteKpeNotificationParameters(
            this.ewService.event
        );
        this.checked.emit(checkbox);
    }

    public async accept(): Promise<void> {
        this.notificationParametersData.dependentParameters.map((value) => {
            value.createdBy = this.authService.user$.getValue().id;
            value.createdAt = new Date();
            value.dependentParameterId = value.id;
            value.numericValue = +value.numericValue;
        });
        try {
            await this.kpeWorkspaceService.postKpeNotificationParameters(
                this.ewService.event,
                this.notificationParametersData
            );
        } catch (error) {
            console.error(error);
        }
        const popupWindow = {
            isShow: false
        };
        this.ewService.extraOptionsWindow$.next(popupWindow);
    }

    public cancel(): void {
        const popupWindow = {
            isShow: false
        };
        this.ewService.extraOptionsWindow$.next(popupWindow);
    }

    public discard(): void {
        const alertWindow: IAlertWindowModel = {
            isShow: true,
            questionText: 'Вы уверены что хотите удалить Дополнительные параметры?',
            acceptText: 'Да',
            cancelText: 'Нет',
            acceptFunction: () => this.deleteParametersByNotification(false),
            closeFunction: () => this.ewService.ewAlertInfo$.next(null)
        };
        this.ewService.ewAlertInfo$.next(alertWindow);
        const popupWindow = {
            isShow: false
        };
        this.ewService.extraOptionsWindow$.next(popupWindow);
    }

    public addParameters(): void {
        if (this.notificationParametersData.dependentParameters.length > 4) {
            this.disableAdd = false;
        } else {
            this.disableAdd = false;
            if (this.extraParameters.length) {
                this.notificationParametersData.dependentParameters.push(
                    this.extraParameters[this.indexOfDependentParameters]
                );
            }
        }
        this.indexOfDependentParameters++;
    }

    public removeParameters(): void {
        this.notificationParametersData.dependentParameters.pop();
    }
}

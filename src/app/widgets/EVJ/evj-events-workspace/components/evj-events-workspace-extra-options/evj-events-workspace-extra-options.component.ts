import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { IExtraOptionsWindow } from '../../../../../dashboard/models/EVJ/events-widget';
import { EventsWorkspaceService } from '../../../../../dashboard/services/widgets/EVJ/events-workspace.service';
import {
    IKpeAllDependentParameters, IKpeDependentParameter, IKpeNotification,
    IKpeWorkspaceParameter
} from '../../../../../dashboard/models/EVJ/kpe-workspace.model';
import { KpeWorkspaceService } from '../../../../../dashboard/services/widgets/EVJ/kpe-workspace.service';


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


    constructor(
        public ewService: EventsWorkspaceService,
        public kpeWorkspaceService: KpeWorkspaceService,
    ) {
    }

    ngOnInit(): void {
        this.getParametersByNotification();
        this.getParameters();
        this.kpeWorkspaceService.showSelectParameters$.subscribe((res) => {
            this.extraParameters = res;
        });
        this.kpeWorkspaceService.selectParameter$.subscribe((res) => {
            if (res) {
                this.getExtraParameters(res.id);
            }
        });
        setTimeout(() => {
            console.log(`this.getParametersByNotification()
            ${this.notificationParametersData}
            `);
        }, 5000);
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
    }
    private async getParametersByNotification(): Promise<void> {
        const data = await this.kpeWorkspaceService.getKpeNotificationParameters(this.ewService.event);
        this.notificationParametersData = data;
    }

    private async accept(): Promise<void> {
        try {
            await this.kpeWorkspaceService.postKpeNotificationParameters(
                this.ewService.event, this.notificationParametersData);
        }
        catch (error) {
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

    private async discard(checkbox: boolean): Promise<void> {
        try {
            await this.kpeWorkspaceService.deleteKpeNotificationParameters(this.ewService.event);
        }
        catch (error) {
            console.error(error);
        }
        this.checked.emit(checkbox);
        const popupWindow = {
            isShow: false
        };
        this.ewService.extraOptionsWindow$.next(popupWindow);
    }

    public addParameters(): void {
            this.disableAdd = false;
            this.notificationParametersData.dependentParameters.push(
                {
                    name: 'n a m e',
                    dependentParameterId: 20,
                    numericValue: 23,
                }
            );
    }

    public removeParameters(): void {
        this.notificationParametersData.dependentParameters.pop();
    }

}

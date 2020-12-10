import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { IExtraOptionsWindow } from '../../../../../dashboard/models/EVJ/events-widget';
import { EventsWorkspaceService } from '../../../../../dashboard/services/widgets/EVJ/events-workspace.service';
import { KpeWorkspaceService } from '../../../../../dashboard/services/widgets/EVJ/kpe-workspace.service';
import {
    IKpeAllDependentParameters, IKpeNotification,
    IKpeWorkspaceParameter
} from '../../../../../dashboard/models/EVJ/kpe-workspace.model';

export interface IExtraOptions {
    id: number;
    name: string;
}

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

    public array: number[] = [];
    public disableAdd: boolean;
    public allParameters: IKpeWorkspaceParameter[] = [];
    public extraParameters: IKpeAllDependentParameters[] = [];
    public notificationParametersData: IKpeNotification;

    constructor(
        public ewService: EventsWorkspaceService,
        public kpeWorkspaceService: KpeWorkspaceService
    ) {
    }

    ngOnInit(): void {
        this.getParametersByNotification();
        console.log(`this.getParametersByNotification() ${this.notificationParametersData}`);
        this.getParameters();
        this.kpeWorkspaceService.showSelectParameters$.subscribe((res) => {
            this.extraParameters = res;
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
    }
    private async getParametersByNotification(): Promise<void> {
        this.notificationParametersData = await this.kpeWorkspaceService.getKpeNotificationParameters(this.ewService.event);
    }
    public compareFn(a, b): boolean {
        return a && b && a.id === b.id;
    }

    public accept(): void {
        try {
            this.info.acceptFunction();
        } catch (err) {
            console.error(err);
        } finally {
            this.info.closeFunction();
        }
    }

    public cancel(): void {
        const popupWindow = {
            isShow: false
        };
        this.ewService.extraOptionsWindow$.next(popupWindow);
    }

    public discard(checkbox: boolean): void {
        this.checked.emit(checkbox);
        const popupWindow = {
            isShow: false
        };
        this.ewService.extraOptionsWindow$.next(popupWindow);
    }

    public addParameters(): void {
        if (this.array.length > 4) {
            this.disableAdd = false;
        } else {
            this.disableAdd = false;
            this.array.push(1);
        }
    }

    public removeParameters(): void {
        this.array.pop();
    }

}

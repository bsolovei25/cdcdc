import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IExtraOptionsWindow } from '../../../../../dashboard/models/EVJ/events-widget';
import { EventsWorkspaceService } from '../../../../../dashboard/services/widgets/EVJ/events-workspace.service';

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
        closeFunction: () => null,
    };
    @Output() checked = new EventEmitter<boolean>();
    public parameters: IExtraOptions[] = [
        {
            id: 0,
            name: 'Список зависимых параметров'
        },
        {
            id: 1,
            name: 'Исполнимость по ДТЛ'
        },
    ];
    public facts: IExtraOptions[] = [
        {
            id: 99,
            name: 'Параметр КПЭ'
        },
    ];
    public data: number[] = []; // Нужно будет реализовать нормальный массив с данными по модели с бэка
    public disableAdd: boolean;

    constructor(
        public ewService: EventsWorkspaceService
    ) {
    }

    ngOnInit(): void {
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
            isShow: false,
        };
        this.ewService.extraOptionsWindow$.next(popupWindow);
    }
    public discard(checkbox: boolean): void {
        this.checked.emit(checkbox);
        const popupWindow = {
            isShow: false,
        };
        this.ewService.extraOptionsWindow$.next(popupWindow);
    }
    public addParameters(): void {
        if (this.data.length > 4) {
            this.disableAdd = false;
        } else {
            this.disableAdd = false;
            this.data.push(1);
        }
    }
    public removeParameters(): void {
        this.data.pop();
    }

}

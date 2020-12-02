import { Component, OnInit } from '@angular/core';
import { EventsWorkspaceService } from '../../../../../dashboard/services/widgets/EVJ/events-workspace.service';


export interface IDateName {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'evj-kpe-select',
    templateUrl: './kpe-select.component.html',
    styleUrls: ['./kpe-select.component.scss']
})
export class KpeSelectComponent implements OnInit {
    items: IDateName[] = [
        { value: 'date-0', viewValue: 'Текущее время' },
        { value: 'date-1', viewValue: 'Начало текущих суток' },
        { value: 'date-2', viewValue: 'Конец текущих суток' }
    ];

    constructor(public ewService: EventsWorkspaceService) {
    }

    public ngOnInit(): void {
    }

    public onClick(): void {
    }
}

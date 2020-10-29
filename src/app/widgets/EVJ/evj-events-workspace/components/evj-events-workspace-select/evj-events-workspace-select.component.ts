import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { EventsWorkspaceService } from '../../../../../dashboard/services/widgets/EVJ/events-workspace.service';

export interface IEventsWorkspaceSelectValue {
    value: string | number;
    label: string | number;
}

@Component({
    selector: 'evj-events-workspace-select',
    templateUrl: './evj-events-workspace-select.component.html',
    styleUrls: ['./evj-events-workspace-select.component.scss'],
})
export class EvjEventsWorkspaceSelectComponent implements OnInit {

    @Input()
    public items: IEventsWorkspaceSelectValue[] | null = [
        {
            value: 0,
            label: 'Нет значений',
        },
    ];

    @Input()
    public type: 'default' | 'minor' | 'critical' = 'default';

    @Input()
    public label: string = 'Выпадающий список';

    @Input()
    public disabled: boolean = false;

    @Output()
    public onValueChange: EventEmitter<string | number | IEventsWorkspaceSelectValue>
        = new EventEmitter<string | number | IEventsWorkspaceSelectValue>();

    constructor(public ewService: EventsWorkspaceService) {
    }

    public ngOnInit(): void {
    }

    public onClick(): void {
    }

    public onSelect(value: keyof IEventsWorkspaceSelectValue): void {
        this.onValueChange.emit(value);
    }
}

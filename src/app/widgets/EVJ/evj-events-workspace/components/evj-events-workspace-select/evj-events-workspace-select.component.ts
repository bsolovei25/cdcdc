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
            value: 'Не Выбрано',
            label: 'Не Выбрано',
        },
    ];
    @Input() public dataType:
        'status'
        | 'priorities'
        | 'categories'
        | 'subCategories'
        | 'eventType'
        | 'place'
        | 'equipmentCategory'
        | 'event'
        | 'eoService';

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

    public compareFn(a, b): boolean {
        return a && b && a.id === b.id;
    }

    public onSelect(value: keyof IEventsWorkspaceSelectValue): void {
        this.onValueChange.emit(value);
    }
}

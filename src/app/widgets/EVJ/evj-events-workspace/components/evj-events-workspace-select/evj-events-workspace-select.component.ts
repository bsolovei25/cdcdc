import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
        | 'status'
        | 'priorities'
        | 'categories'
        | 'subCategoriesFilter'
        | 'eventType'
        | 'place'
        | 'equipmentCategory'
        | 'event'
        | 'event-shift'
        | 'eoService';

    @Input()
    public type: 'default' | 'minor' | 'critical' = 'default';

    @Input()
    public label: string = '';

    @Input()
    public disabled: boolean = false;

    @Input() public set categoryTypeSet(category: string) {
        switch (category) {
            case 'tasks':
                this.categoryType = 'tasksSubcategoryFilter'
                break;
            case 'safety':
                this.categoryType = 'safetySubcategoryFilter'
                break;
            case 'equipmentStatus':
                this.categoryType = 'equipmentStatusSubcategoryFilter'
                break;
        }
    }

    @Output()
    public onValueChange: EventEmitter<string | number | IEventsWorkspaceSelectValue> = new EventEmitter<
        string | number | IEventsWorkspaceSelectValue
    >();

    public categoryType: string;

    constructor(public ewService: EventsWorkspaceService) {}

    public ngOnInit(): void {}

    public onClick(): void {}

    public compareFn(a, b): boolean {
        return a && b && a.id === b.id;
    }

    public onSelect(value: keyof IEventsWorkspaceSelectValue): void {
        this.onValueChange.emit(value);
    }
}

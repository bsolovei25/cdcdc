import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventsWorkspaceService } from '../../../../../dashboard/services/widgets/EVJ/events-workspace.service';
export interface ISelectValue {
    value: string | number;
    label: string | number;
}
@Component({
  selector: 'evj-kpe-select',
  templateUrl: './kpe-select.component.html',
  styleUrls: ['./kpe-select.component.scss']
})
export class KpeSelectComponent implements OnInit {


    @Input()
    public items: ISelectValue[] | null = [
        {
            value: 'Не Выбрано',
            label: 'Не Выбрано',
        },
    ];

    @Input()
    public type: 'default' | 'minor' | 'critical' = 'default';

    @Input()
    public label: string = '';

    @Input()
    public disabled: boolean = false;

    @Output()
    public onValueChange: EventEmitter<string | number | ISelectValue>
        = new EventEmitter<string | number | ISelectValue>();

    constructor(public ewService: EventsWorkspaceService) {
    }

    public ngOnInit(): void {
    }

    public onClick(): void {
    }

    public compareFn(a, b): boolean {
        return a && b && a.id === b.id;
    }

    public onSelect(value: keyof ISelectValue): void {
        this.onValueChange.emit(value);
    }
}

import {
    Component,
    OnInit,
    Input,
    ChangeDetectionStrategy,
    OnChanges,
    Output, EventEmitter, SimpleChanges
} from '@angular/core';
import { OilStorages } from 'src/app/dashboard/models/oil-control';

@Component({
    selector: 'evj-oil-control-table',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './oil-control-table.component.html',
    styleUrls: ['./oil-control-table.component.scss']
})
export class OilControlTableComponent implements OnInit, OnChanges {
    @Input() data: OilStorages;
    @Input() checkWidth: boolean;

    public activeOperationValue: number = 1;
    @Output() activeOperationChange: EventEmitter<number> = new EventEmitter<number>();

    @Input() get activeOperation(): number {
        return this.activeOperationValue;
    }

    set activeOperation(val: number) {
        this.activeOperationValue = val;
        this.activeOperationChange.emit(this.activeOperationValue);
    }

    public maxPage: number = 1;

    public criticalPage: any = [];

    constructor() {
    }

    ngOnInit(): void {
        this.activeOperation = 1;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.maxPage = this.data?.operations?.length ?? 1;
    }

    onNextOperation(event: number): void {
        this.activeOperation = event;
    }
}

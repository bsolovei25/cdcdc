import {Component, OnInit, EventEmitter, Output, Input, OnChanges} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { IOilShipment } from '../../../../../dashboard/models/oil-operations';

interface IEmitResponse {
    mass: number;
    note: string;
}

@Component({
    selector: 'evj-oil-operations-adjustment',
    templateUrl: './oil-operations-adjustment.component.html',
    styleUrls: ['./oil-operations-adjustment.component.scss']
})
export class OilOperationsAdjustmentComponent implements OnInit, OnChanges {
    @Input() public data: IOilShipment | null = null;
    @Output() public closeAdjust: EventEmitter<IEmitResponse> = new EventEmitter<IEmitResponse>();

    public isActive: string;

    public reasonSelect: FormControl = new FormControl();

    public massInput: FormControl = new FormControl();

    public noteInput: FormControl = new FormControl();

    public reasons: { id: number, name: string }[] = [
        {
            id: 1,
            name: 'Причина корректировки'
        },
        {
            id: 2,
            name: 'Причина корректировки'
        },
    ];

    constructor() {
    }

    public ngOnInit(): void {
        this.reasonSelect.setValue(this.reasons[0].name);
    }

    public ngOnChanges(): void {
        this.massInput.setValue(this.data.mass);
        this.noteInput.setValue(this.data.note);
    }

    public onReasonSelect(event: MatSelectChange): void {
    }

    active(item: string): void {
        if (this.isActive === item) {
            this.isActive = null;
        } else {
            this.isActive = item;
        }
    }

    exit(): void {
    }

    save(): void {
        this.closeAdjust.emit({
            mass: this.massInput.value,
            note: this.reasonSelect.value + ' ' + this.noteInput.value,
        });
    }
}

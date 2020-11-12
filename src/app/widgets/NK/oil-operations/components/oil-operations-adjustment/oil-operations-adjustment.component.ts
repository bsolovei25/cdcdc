import {Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { OilOperationsService } from '../../../../../dashboard/services/widgets/oil-operations.service';

export interface IOilControlManualAdjEmitResponse {
    mass: number;
    note: string;
    shipmentTypeId: number;
}

@Component({
    selector: 'evj-oil-operations-adjustment',
    templateUrl: './oil-operations-adjustment.component.html',
    styleUrls: ['./oil-operations-adjustment.component.scss']
})
export class OilOperationsAdjustmentComponent implements OnInit {

    @Output() public closeAdjust: EventEmitter<IOilControlManualAdjEmitResponse> = new EventEmitter<IOilControlManualAdjEmitResponse>();

    public isActive: string;

    public reasonSelect: FormControl = new FormControl();

    public massInput: FormControl = new FormControl();

    public noteInput: FormControl = new FormControl();

    public reasons: { id: number, name: string }[] = [];

    constructor(
        private oilOperationService: OilOperationsService,
    ) {
    }

    public ngOnInit(): void {
        this.getAdjustmentTypes();
        this.massInput.setValue(0);
    }

    private async getAdjustmentTypes(): Promise<void> {
        this.reasons = await this.oilOperationService.getManualAdjustmentTypes<{ id: number, name: string }[]>();
        this.reasonSelect.setValue(this.reasons[0]?.id);
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
            mass: parseInt(this.massInput.value, 0),
            note: this.noteInput.value,
            shipmentTypeId: this.reasonSelect.value,
        });
    }
}

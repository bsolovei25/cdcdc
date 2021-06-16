import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ChangeShiftRolesService } from './services/change-shift-roles.service';
import { FormArray, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'evj-change-shift-roles',
    templateUrl: './change-shift-roles.component.html',
    styleUrls: ['./change-shift-roles.component.scss'],
})
export class ChangeShiftRolesComponent implements OnInit, OnDestroy {
    public form: FormGroup = new FormGroup({
        roles: new FormArray([]),
    });
    public isLoad$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public readonly disabledForm: boolean = false;

    constructor(
        private readonly changeShiftRolesService: ChangeShiftRolesService,
        private dialogRef: MatDialogRef<ChangeShiftRolesComponent>,
        @Inject(MAT_DIALOG_DATA) private data: { shiftId: number; unitId: number; disabled: boolean }
    ) {
        this.disabledForm = data.disabled;
    }

    async ngOnInit(): Promise<void> {
        this.changeShiftRolesService.dialogRef = this.dialogRef;
        this.form = this.changeShiftRolesService.form;
        await this.changeShiftRolesService.loadData(this.data.shiftId, this.data.unitId);
        this.isLoad$.next(false);
    }

    ngOnDestroy(): void {
        this.changeShiftRolesService.destroy();
    }
}

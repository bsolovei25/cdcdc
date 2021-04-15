import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    ChangeShiftRoleType,
    IChangeShiftMember,
    IChangeShiftModel,
    IChangeShiftRole,
    IChangeShiftRoleReference,
} from '../../../change-shift.interfaces';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { map } from 'rxjs/operators';
import { uuidGenerate } from '@shared/functions/uuid-generator.function';
import { duplicateNameValidator } from '../validators/change-shift-roles-reference.validator';
import { selectValidator } from '../validators/change-shift-roles-person.validator';
import { baseRoleValidator } from '../validators/change-shift-roles-form.validator';
import { MatDialogRef } from '@angular/material/dialog';
import { ChangeShiftRolesComponent } from '../change-shift-roles.component';
import { ChangeShiftApiService } from '../../../services/change-shift-api.service';
import { ChangeShiftHelperService } from '../../../services/change-shift-helper.service';

@Injectable()
export class ChangeShiftRolesService {
    public readonly defaultRole: string = 'additionalRole';
    public unitId: number = null;
    public shiftId: number = null;

    public readonly roleReference: IChangeShiftRoleReference[] = [
        {
            key: 'role',
            value: 'Роль',
        },
        {
            key: 'additionalRole',
            value: 'Дополнительная роль',
        },
        {
            key: 'mainRole',
            value: 'Главная роль',
        },
    ];

    public dialogRef: MatDialogRef<ChangeShiftRolesComponent>;

    public currentShift: IChangeShiftModel = null;

    public form: FormGroup = new FormGroup(
        {
            roles: new FormArray([], [duplicateNameValidator()]),
            members: new FormArray([], [selectValidator()]),
        },
        [baseRoleValidator(this.changeShiftHelperService.isBaseRole)]
    );

    public referenceRoles$: Observable<IChangeShiftRole[]> = this.form.get('roles').valueChanges.pipe(
        map((x) => {
            return x.filter((i) => !!i.type && !!i.name);
        })
    );
    public members$: Observable<{ object: IChangeShiftMember; userRole: number | string }[]> = this.form.get('members')
        .valueChanges;

    public referenceRolesErrors$: Observable<ValidationErrors> = this.form
        .get('roles')
        .statusChanges.pipe(map((x) => this.form.get('roles').errors));
    public membersErrors$: Observable<ValidationErrors> = this.form
        .get('members')
        .statusChanges.pipe(map((x) => this.form.get('members').errors));
    public formErrors$: Observable<ValidationErrors> = this.form.statusChanges.pipe(map((x) => this.form.errors));

    constructor(
        private http: HttpClient,
        private changeShiftApi: ChangeShiftApiService,
        private changeShiftHelperService: ChangeShiftHelperService
    ) {}

    public async getShift(shiftId: number = this.shiftId): Promise<IChangeShiftModel> {
        return await this.changeShiftApi.getShiftById(shiftId);
    }

    public async getRoles(unitId: number = this.unitId): Promise<IChangeShiftRole[]> {
        return await this.changeShiftApi.getRoles(unitId);
    }

    public async loadData(shiftId: number, unitId: number): Promise<void> {
        this.shiftId = shiftId;
        this.unitId = unitId;

        const shift = await this.getShift(shiftId);
        const roles = await this.getRoles(unitId);

        this.currentShift = { ...shift };

        roles.forEach((x) =>
            (this.form.controls.roles as FormArray).push(
                new FormGroup({
                    id: new FormControl(x.id),
                    name: new FormControl(x.name),
                    type: new FormControl(x.type),
                })
            )
        );

        const members = shift.members?.filter((x) => !!x.id) ?? [];
        members.forEach((x) => {
            (this.form.controls.members as FormArray).push(
                new FormGroup({
                    object: new FormControl(x),
                    userRole: new FormControl(x.unitRole.id),
                })
            );
        });
    }

    public async saveData(): Promise<void> {
        let roles: IChangeShiftRole[] = this.form.get('roles').value;
        const members: IChangeShiftMember[] = this.form
            .get('members')
            .value.map((x) => ({ ...x.object, unitRole: roles.find((r) => r.id === x.userRole) }));
        members.forEach((x) => (x.unitRole.id = isNaN(+x.unitRole.id) ? 0 : x.unitRole.id));
        roles.forEach((x) => (x.id = isNaN(+x.id) ? 0 : x.id));
        roles = roles.filter((x) => !!x.name);
        const body = {
            roles,
            members,
        };
        await this.changeShiftApi.saveShiftControls(this.unitId, this.shiftId, body);
        this.closeDialog(true);
    }

    public addRole(): void {
        (this.form.controls.roles as FormArray).push(
            new FormGroup({
                id: new FormControl(uuidGenerate()),
                name: new FormControl(''),
                type: new FormControl(this.defaultRole),
            })
        );
    }

    public deleteRole(roleControl: AbstractControl): void {
        const idx = (this.form.controls.roles as FormArray).controls.indexOf(roleControl);
        (this.form.controls.roles as FormArray).removeAt(idx);
    }

    public destroy(): void {
        this.currentShift = null;
        (this.form.get('roles') as FormArray).clear();
        (this.form.get('members') as FormArray).clear();
    }

    public closeDialog(result: boolean): void {
        this.dialogRef.close(result);
    }
}

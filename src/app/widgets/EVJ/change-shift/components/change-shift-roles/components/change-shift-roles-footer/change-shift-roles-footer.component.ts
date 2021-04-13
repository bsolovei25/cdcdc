import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChangeShiftRolesService } from '../../services/change-shift-roles.service';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'evj-change-shift-roles-footer',
    templateUrl: './change-shift-roles-footer.component.html',
    styleUrls: ['./change-shift-roles-footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeShiftRolesFooterComponent implements OnInit {
    public form: FormGroup = null;

    public formErrors$: Observable<ValidationErrors> = this.changeShiftRolesService.formErrors$;
    public rolesErrors$: Observable<ValidationErrors> = this.changeShiftRolesService.referenceRolesErrors$;
    public membersErrors$: Observable<ValidationErrors> = this.changeShiftRolesService.membersErrors$;
    public errors$: Observable<boolean> = combineLatest([this.rolesErrors$, this.membersErrors$]).pipe(
        map((x) => x.filter((e) => !e)?.length !== x.length)
    );

    constructor(private changeShiftRolesService: ChangeShiftRolesService) {}

    ngOnInit(): void {}

    public applyForm(): void {
        this.changeShiftRolesService.saveData().then();
    }

    public cancel(): void {
        this.changeShiftRolesService.closeDialog(false);
    }
}

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ChangeShiftRoleType, IChangeShiftMember, IChangeShiftRole } from '../../../change-shift.interfaces';

export function baseRoleValidator(baseCheck: (role: ChangeShiftRoleType) => boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const roles: IChangeShiftRole[] = control.get('roles').value;
        const members: { userRole: number; object: IChangeShiftMember }[] = control.get('members').value;
        let unselectedCounter: number = 0;
        for (const role of roles.filter((x) => baseCheck(x.type))) {
            if (members.findIndex((x) => x.userRole === role.id) === -1) {
                unselectedCounter++;
            }
        }
        return unselectedCounter ? { error: unselectedCounter } : null;
    };
}

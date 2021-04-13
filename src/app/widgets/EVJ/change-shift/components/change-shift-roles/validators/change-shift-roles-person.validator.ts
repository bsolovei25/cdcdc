import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function selectValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const roles = control.value.map((x) => x.userRole);
        return roles.includes('' || null || 0 || undefined) ? { error: true } : null;
    };
}

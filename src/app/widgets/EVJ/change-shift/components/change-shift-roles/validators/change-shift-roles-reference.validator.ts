import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function duplicateNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const names = control.value.map((x) => x.name);
        const uniqNames = [...new Set(names)];
        return names.length !== uniqNames.length ? { error: true } : null;
    };
}

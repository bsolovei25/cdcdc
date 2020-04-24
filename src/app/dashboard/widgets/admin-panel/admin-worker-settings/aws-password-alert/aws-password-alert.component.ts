import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
    FormControl,
    Validators,
    FormBuilder,
    FormGroup,
    FormGroupDirective,
    NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const invalidCtrl = !!(
            control &&
            control.touched &&
            control.invalid &&
            control.parent.dirty
        );
        const invalidParent = !!(
            control &&
            control.touched &&
            control.parent &&
            control.parent.invalid &&
            control.parent.dirty
        );

        return invalidCtrl || invalidParent;
    }
}

@Component({
    selector: 'evj-aws-password-alert',
    templateUrl: './aws-password-alert.component.html',
    styleUrls: ['./aws-password-alert.component.scss'],
})
export class AwsPasswordAlertComponent implements OnInit {
    @Output() private confirmed: EventEmitter<string> = new EventEmitter<string>();

    public hide: boolean = true;

    public readonly minLength: number = 6;
    public readonly maxLength: number = 25;

    public formGroup: FormGroup;
    public matcher: MyErrorStateMatcher = new MyErrorStateMatcher();

    constructor(private formBuilder: FormBuilder) {
        const regExpConditions = '(?=.*[0-9])(?=.*[?!._*#$@-])(?=.*[a-zа-я])(?=.*[A-ZА-Я])';
        const regExp = `[0-9a-zA-Zа-яА-Я?!._*#$@-]{${this.minLength},${this.maxLength}}`;

        this.formGroup = this.formBuilder.group(
            {
                password: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(this.minLength),
                        Validators.maxLength(this.maxLength),
                        Validators.pattern(`${regExpConditions}${regExp}`),
                    ],
                ],
                confirmPassword: [''],
            },
            { validator: this.checkPasswords }
        );
    }

    public ngOnInit(): void {}

    public checkPasswords(group: FormGroup): { notSame: true } {
        const pass = group.controls.password.value;
        const confirmPass = group.controls.confirmPassword.value;

        return pass === confirmPass ? null : { notSame: true };
    }

    public onClickBack(): void {
        this.confirmed.emit(null);
    }

    public onClickConfirm(): void {
        if (this.formGroup.valid) {
            this.confirmed.emit(this.formGroup.controls.password.value);
        } else {
            this.formGroup.markAllAsTouched();
            this.formGroup.markAsDirty();
        }
    }
}

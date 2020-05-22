import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { IInputOptions } from '../../../../../@shared/models/input.model';

@Component({
    selector: 'evj-aws-password-alert',
    templateUrl: './aws-password-alert.component.html',
    styleUrls: ['./aws-password-alert.component.scss'],
})
export class AwsPasswordAlertComponent implements OnInit {
    @Input() public isShow: boolean = false;
    @Output() private confirmed: EventEmitter<string> = new EventEmitter<string>();

    public hidePass: boolean = true;
    public hideConf: boolean = true;

    public readonly minLength: number = 6;
    public readonly maxLength: number = 25;

    //#region INPUTS_OPTIONS
    public passwordOptions: IInputOptions = {
        type: 'password',
        state: 'rounded',
        placeholder: 'Введите пароль',
        isMovingPlaceholder: false,
        icon: {
            src: 'assets/icons/login/visibility_off.svg',
            svgStyle: { 'width.px': 20, 'height.px': 20 },
            isClickable: true,
            onClick: () => {
                [this.passwordOptions.icon.src, this.passwordOptions.icon.secState] = [
                    this.passwordOptions.icon.secState,
                    this.passwordOptions.icon.src,
                ];
                this.passwordOptions.type =
                    this.passwordOptions.type === 'text' ? 'password' : 'text';
            },
            secState: 'assets/icons/login/visibility.svg',
        },
    };

    public confirmOptions: IInputOptions = {
        type: 'password',
        state: 'rounded',
        placeholder: 'Подтвердите пароль',
        isMovingPlaceholder: false,
        icon: {
            src: 'assets/icons/login/visibility_off.svg',
            svgStyle: { 'width.px': 20, 'height.px': 20 },
            isClickable: true,
            onClick: () => {
                [this.confirmOptions.icon.src, this.confirmOptions.icon.secState] = [
                    this.confirmOptions.icon.secState,
                    this.confirmOptions.icon.src,
                ];
                this.confirmOptions.type =
                    this.confirmOptions.type === 'text' ? 'password' : 'text';
            },
            secState: 'assets/icons/login/visibility.svg',
        },
    };
    //#endregion

    public formGroup: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        const regExpConditions = '(?=.*[0-9])(?=.*[?!._*#$@-])(?=.*[a-zа-яA-ZА-Я])';
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
                confirmPassword: ['', Validators.required],
            },
            { validator: this.checkPasswords }
        );
    }

    public ngOnInit(): void {}

    public setPasswordStyle(controlName: string): string {
        const ctrl: AbstractControl = this.formGroup.controls[controlName];

        if (
            controlName === 'confirmPassword' &&
            this.formGroup.controls.password.invalid &&
            ctrl.touched
        ) {
            return 'input__block_invalid';
        }

        return ctrl.invalid && ctrl.touched
            ? 'input__block_invalid'
            : ctrl.dirty
            ? 'input__block_dirty'
            : '';
    }

    public checkPasswords(group: FormGroup): { notSame: true } {
        const pass = group.controls.password.value;
        const confirmPass = group.controls.confirmPassword.value;

        if (pass === confirmPass) {
            return null;
        } else {
            group.controls.confirmPassword.setErrors({ notSame: true });
            return { notSame: true };
        }
    }

    public onClickBack(): void {
        this.formGroup.reset();
        this.confirmed.emit(null);
    }

    public onClickConfirm(): void {
        if (this.formGroup.valid) {
            this.confirmed.emit(this.formGroup.controls.password.value);
            this.formGroup.reset();
        } else {
            this.formGroup.markAllAsTouched();
            this.formGroup.markAsDirty();
        }
    }
}

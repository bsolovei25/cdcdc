import { Component, OnInit, Input } from '@angular/core';
import { IInputOptions } from '../../models/input.model';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { IAlertPasswordModel } from '../../models/alert-password.model';
import { SnackBarService } from '../../../dashboard/services/snack-bar.service';
import { AuthService } from '../../../@core/service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'evj-alert-password',
    templateUrl: './alert-password.component.html',
    styleUrls: ['./alert-password.component.scss'],
})
export class AlertPasswordComponent implements OnInit {
    @Input() public options: IAlertPasswordModel = {
        isShow: false,
        isCreatePassword: true,
        acceptFunction: () => null,
        closeFunction: () => null,
    };

    public readonly minLength: number = 6;
    public readonly maxLength: number = 25;

    public showOldPassword: boolean = false;

    //#region INPUTS_OPTIONS
    public oldPasswordOptions: IInputOptions = {
        type: 'password',
        state: 'rounded',
        placeholder: 'Введите текущий пароль',
        isMovingPlaceholder: false,
        icon: {
            src: 'assets/icons/login/visibility_off.svg',
            svgStyle: { 'width.px': 20, 'height.px': 20 },
            isClickable: true,
            onClick: () => {
                [this.oldPasswordOptions.icon.src, this.oldPasswordOptions.icon.secState] = [
                    this.oldPasswordOptions.icon.secState,
                    this.oldPasswordOptions.icon.src,
                ];
                this.oldPasswordOptions.type = this.oldPasswordOptions.type === 'text' ? 'password' : 'text';
            },
            secState: 'assets/icons/login/visibility.svg',
        },
    };

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
                this.passwordOptions.type = this.passwordOptions.type === 'text' ? 'password' : 'text';
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
                this.confirmOptions.type = this.confirmOptions.type === 'text' ? 'password' : 'text';
            },
            secState: 'assets/icons/login/visibility.svg',
        },
    };
    //#endregion

    public formGroup: FormGroup;

    constructor(private formBuilder: FormBuilder, private snackBar: SnackBarService, private authService: AuthService) {
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

    public ngOnInit(): void {
        if (!this.options?.isCreatePassword) {
            this.formGroup.addControl('oldPassword', new FormControl('', [Validators.required]));
            this.showOldPassword = true;
        }
    }

    public setPasswordStyle(controlName: string): string {
        const ctrl: AbstractControl = this.formGroup.controls[controlName];

        if (controlName === 'confirmPassword' && this.formGroup.controls.password.invalid && ctrl.touched) {
            return 'input__block_invalid';
        }

        return ctrl.invalid && ctrl.touched ? 'input__block_invalid' : ctrl.dirty ? 'input__block_dirty' : '';
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
        this.options.closeFunction();
    }

    public async onClickConfirm(): Promise<void> {
        if (this.formGroup.valid && this.options.isCreatePassword) {
            this.options.acceptFunction(this.formGroup.controls.password.value);
            this.options.closeFunction();
            this.formGroup.reset();
        } else if (this.formGroup.valid) {
            await this.onResetPassword();
        } else {
            this.formGroup.markAllAsTouched();
            this.formGroup.markAsDirty();
        }
    }

    public async onResetPassword(): Promise<void> {
        try {
            await this.authService.resetPassword(
                this.formGroup.get('password').value,
                this.formGroup.get('oldPassword').value
            );
            this.snackBar.openSnackBar('Пароль успешно изменен');

            this.options.closeFunction();
            this.formGroup.reset();
        } catch (err) {
            this.snackBar.openSnackBar('Пароль не изменен', 'error');
            if (err.status === 477) {
                const control = this.formGroup.get('oldPassword');
                control.setErrors({ notOldPassword: true });
            }
        }
    }
}

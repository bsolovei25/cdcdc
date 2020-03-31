import { Component, Type, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, FormGroupDirective, NgForm, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { IUser } from '../../../dashboard/models/events-widget';
import { AppConfigService } from '../../../services/appConfigService';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { OverlayService } from '../../../dashboard/services/overlay.service';
import { SnackBarService } from '../../../dashboard/services/snack-bar.service';

export function sameValueAs(group: FormGroup, controlName: string): ValidatorFn {
    return (control: FormControl) => {
        const myValue = control.value;
        const compareValue = group.controls[controlName].value;

        return (myValue === compareValue) ? null : { valueDifferentFrom: controlName };

    };
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
        const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

        return (invalidCtrl || invalidParent);
    }
}

export interface OverlayCloseEvent<R> {
    type: 'backdropClick' | 'close';
    data: R;
}

@Component({
    selector: 'evj-password-reset',
    styleUrls: ['./password-reset.component.scss'],
    templateUrl: './password-reset.component.html',
})
export class PasswordResetComponent {
    myForm: FormGroup;

    isLoadingData: boolean = false;
    isLoading: boolean = true;
    hideOldPassword: boolean = true;
    hidePassword: boolean = true;
    hideConfirmPassword: boolean = true;
    user: IUser;

    swing: boolean = false;

    matcher = new MyErrorStateMatcher();

    private fsUrl: string = '';
    public photoPath: string = 'assets/icons/widgets/admin/default_avatar2.svg';
    private defaultAvatarPath: string = 'assets/icons/widgets/admin/default_avatar2.svg';

    constructor(private authService: AuthService,
        private formBuilder: FormBuilder,
        private configService: AppConfigService,
        public myOverlayService: OverlayService,
        public snackBar: SnackBarService
    ) {
        this.fsUrl = this.configService.fsUrl;
    }

    ngOnInit(): void {
        this.isLoadingData = true;

        this.myForm = this.formBuilder.group({
            oldPassword: ['', [Validators.required]],
            password: ['', [Validators.required]],
            confirmPassword: ['']
        }, { validator: this.checkPasswords })

        this.user = this.authService.user$.value;
        if (this.user.photoId) {
            this.photoPath = `${this.fsUrl}/${this.user.photoId}`;
        } else {
            this.photoPath = this.defaultAvatarPath;
        }
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.isLoadingData = false;
        }, 500);
    }



    closeOverlay(): void {
        this.myOverlayService.closed$.next(true);
    }

    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
        let password = group.get('password').value;
        let confirmPassword = group.get('confirmPassword').value;
        return password === confirmPassword ? null : { notSame: true }
    }

    async onSubmit(): Promise<void> {
        this.swing = false;
        this.isLoadingData = true;
        try {
            if (this.myForm.valid) {
                await this.authService.resetPassword(this.myForm.get('password').value, this.myForm.get('oldPassword').value);
                this.snackBar.openSnackBar('Пароль успешно изменен');
                this.closeOverlay();
            }
            this.isLoadingData = false;
        } catch (err) {
            this.snackBar.openSnackBar('Пароль не изменен', 'snackbar-red');
            this.closeOverlay();
            this.isLoadingData = false;
        }
    }
}
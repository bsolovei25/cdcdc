import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { IUser } from '../../../dashboard/models/events-widget';
import { AppConfigService } from '../../../services/appConfigService';
import { OverlayService } from '../../../dashboard/services/overlay.service';
import { SnackBarService } from '../../../dashboard/services/snack-bar.service';
import { AvatarConfiguratorService } from '../../../dashboard/services/avatar-configurator.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
        const invalidParent = !!(control && control.parent && control.parent.hasError('notSame') && control.parent.dirty);
        return (invalidCtrl || invalidParent);
    }
}

@Component({
    selector: 'evj-password-reset',
    styleUrls: ['./password-reset.component.scss'],
    templateUrl: './password-reset.component.html',
})
export class PasswordResetComponent implements OnInit, AfterViewInit{

    myForm: FormGroup;

    isLoadingData: boolean = false;
    isLoading: boolean = true;
    hideOldPassword: boolean = true;
    hidePassword: boolean = true;
    hideConfirmPassword: boolean = true;
    user: IUser;

    swing: boolean = false;
    matcher: MyErrorStateMatcher = new MyErrorStateMatcher();

    public photoPath: string = 'assets/icons/widgets/admin/default_avatar2.svg';

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private avatarConfiguratorService: AvatarConfiguratorService,
        public myOverlayService: OverlayService,
        public snackBar: SnackBarService
    ) { }

    ngOnInit(): void {
        this.isLoadingData = true;
        this.myForm = this.formBuilder.group({
            oldPassword: new FormControl('', Validators.required),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            confirmPassword: new FormControl(''),
        }, { validator: this.checkPasswords });

        this.user = this.authService.user$.value;
        this.photoPath = this.avatarConfiguratorService.getAvatarPath(this.user.photoId);
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.isLoadingData = false;
        }, 500);
    }

    closeOverlay(): void {
        this.myOverlayService.closed$.next(true);
    }

    checkPasswords(group: FormGroup): {notSame: boolean} | null {
        const password = group.get('password').value;
        const confirmPassword = group.get('confirmPassword').value;
        return password === confirmPassword ? null : { notSame: true };
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
            this.isLoadingData = false;
        }
    }
}

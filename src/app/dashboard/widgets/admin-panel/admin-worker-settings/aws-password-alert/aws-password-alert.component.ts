import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SnackBarService } from '../../../../services/snack-bar.service';

@Component({
    selector: 'evj-aws-password-alert',
    templateUrl: './aws-password-alert.component.html',
    styleUrls: ['./aws-password-alert.component.scss'],
})
export class AwsPasswordAlertComponent implements OnInit {
    @Output() private confirmed: EventEmitter<string> = new EventEmitter<string>();

    public hide: boolean = true;

    public password: FormControl = new FormControl('', Validators.required);
    public confirmPassword: FormControl = new FormControl('', Validators.required);

    constructor(private materialContoller: SnackBarService) {}

    public ngOnInit(): void {}

    private isEqualPasswords(): boolean {
        return this.password.value === this.confirmPassword.value;
    }

    public onClickBack(): void {
        this.confirmed.emit(null);
    }

    public onClickConfirm(): void {
        if (this.isEqualPasswords() && this.password.valid) {
            this.confirmed.emit(this.password.value);
        } else {
            this.materialContoller.openSnackBar('Пароли не совпадают', 'snackbar-red');
        }
    }
}

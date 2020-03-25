import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'evj-aws-password-alert',
    templateUrl: './aws-password-alert.component.html',
    styleUrls: ['./aws-password-alert.component.scss'],
})
export class AwsPasswordAlertComponent implements OnInit {
    public hide: boolean = true;

    public password: FormControl = new FormControl('', Validators.required);
    public confirmPassword: FormControl = new FormControl('', Validators.required);

    constructor() {}

    ngOnInit(): void {}

    public isEqualPasswords(): boolean {
        return this.password.value === this.confirmPassword.value;
    }
}

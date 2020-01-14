
// Angular 
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/service/auth.service';
import { environment } from 'src/environments/environment';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
// Angular material
// Local modules  

@Component({
    selector: 'evj-core-login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, AfterViewInit {

    username = new FormControl(environment.username, [Validators.required]);
    password = new FormControl(environment.password, [Validators.required]);

    isLoadingData: boolean = false;

    isLoading: boolean = true;
    isHidden: boolean = false;

    hide = true;

    swing: boolean = false;

    constructor(
        public authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar,
    ) { }

    ngOnInit() {
        this.isLoading = true;
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.isLoading = false;
        }, 500);
    }

    async onSubmit(): Promise<void> {
        this.swing = false;
        this.isLoadingData = true;
        if (!this.username || !this.password) {
            return;
        }
        // authentication
        try {
            const auth = await this.authService.authenticate(this.username.value, this.password.value);
            if (auth) {
                this.router.navigate(['dashboard']);
                setTimeout(() => {
                    this.isLoadingData = false;
                }, 1000);
            } else {
                this.openSnackBar('Неверный логин или пароль');
                this.swing = true;
                this.isLoadingData = false;
            }
        } catch (err) {
            this.isLoadingData = false;
        }
    }

    openSnackBar(msg: string = 'Операция выполнена', msgDuration: number = 3000, actionText?: string, actionFunction?: () => void) {
        const snackBarInstance = this.snackBar.open(msg, actionText, { duration: msgDuration });
        if (actionFunction) {
            snackBarInstance.onAction().subscribe(
                () => actionFunction()
            );
        }
    }

}

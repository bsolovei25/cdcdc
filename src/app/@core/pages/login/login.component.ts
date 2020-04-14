// Angular
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/service/auth.service';
import { environment } from 'src/environments/environment';
import { FormControl, Validators } from '@angular/forms';
import { PreloaderService } from '../../service/preloader.service';
// Angular material
// Local modules

@Component({
    selector: 'evj-core-login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, AfterViewInit {
    username: FormControl = new FormControl(environment.username, [Validators.required]);
    password: FormControl = new FormControl(environment.password, [Validators.required]);

    isLoadingData: boolean = false;
    isLoading: boolean = true;
    hide: boolean = true;

    swing: boolean = false;

    constructor(
        public authService: AuthService,
        private router: Router,
        private preLoaderService: PreloaderService
    ) {}

    ngOnInit(): void {
        this.isLoadingData = true;
        this.preLoaderService.isLoad$.next(this.isLoadingData);
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.isLoadingData = false;
            this.preLoaderService.isLoad$.next(this.isLoadingData);
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
            const auth = await this.authService.authenticate(
                this.username.value,
                this.password.value
            );
            if (auth) {
                this.router.routeReuseStrategy.shouldReuseRoute = () => { return false; };
                await this.router.navigate(['dashboard']);
                this.isLoadingData = false;
                // setTimeout(() => {
                //     this.isLoadingData = false;
                // }, 1000);
            } else {
                this.swing = true;
                this.isLoadingData = false;
            }
        } catch (err) {
            this.isLoadingData = false;
        }
    }
}

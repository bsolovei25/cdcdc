// Angular
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@core/service/auth.service';
import { environment } from 'src/environments/environment';
import { FormControl, Validators } from '@angular/forms';
import { PreloaderService } from '../../service/preloader.service';
import { IInputOptions } from '../../../@shared/models/input.model';
// Angular material
// Local modules

@Component({
    selector: 'evj-core-login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, AfterViewInit {
    username: FormControl = new FormControl(environment.username, [
        Validators.required,
        Validators.minLength(3)
    ]);
    password: FormControl = new FormControl(environment.password, [
        Validators.required,       
        Validators.minLength(6)
    ]);

    isLoadingData: boolean = false;
    isLoading: boolean = true;
    hide: boolean = true;

    swing: boolean = false;

    public loginOptions: IInputOptions = {
        type: 'text',
        state: 'normal',
        placeholder: 'Логин',
        isMovingPlaceholder: false,
        logo: {
            src: 'assets/icons/login/login.svg',
            svgStyle: { 'width.px': 22, 'height.px': 22 },
            isClickable: true,
        }
    };

    public passwordOptions: IInputOptions = {
        type: 'password',
        state: 'normal',
        placeholder: 'Пароль',
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
        logo: {
            src: 'assets/icons/login/password.svg',
            svgStyle: { 'width.px': 17, 'height.px': 22 },
            isClickable: true,
        }
    };

    constructor(public authService: AuthService, private router: Router, private preLoaderService: PreloaderService) {
        // override the route reuse strategy
        this.router.routeReuseStrategy.shouldReuseRoute = () => {
            return false;
        };
    }

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
            const auth = await this.authService.authenticate(this.username.value, this.password.value);
            if (auth) {
                this.router.routeReuseStrategy.shouldReuseRoute = () => {
                    return false;
                };
                localStorage.setItem('refresh-dashboard', 'true');
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

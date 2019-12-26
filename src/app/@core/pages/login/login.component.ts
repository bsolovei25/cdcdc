
// Angular 
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/service/auth.service';
// Angular material
// Local modules  

@Component({
    selector: 'evj-core-login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, AfterViewInit {

    username: string = 'Ivanov';
    password: string = 'secret';
    isLoadingData: boolean = false;
    savePassword: boolean = false;

    isLoading: boolean = true;
    isHidden: boolean = false;

    swing: boolean = false;

    constructor(
        public authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
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
        // extract return path
        const backUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        // authentication
        try {
            const auth = await this.authService.authenticate(this.username, this.password);
            if (auth) {
                this.router.navigate(['dashboard']);
            } else {
                this.swing = true;
            }

        } catch (err) {
            this.isLoadingData = false;
        }
    }

}

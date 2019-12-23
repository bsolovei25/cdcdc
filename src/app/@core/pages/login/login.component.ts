
// Angular 
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/service/auth.service';
// Angular material
// Local modules  

@Component({
    selector: 'evj-core-login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

    login: string = '';
    password: string = '';
    isLoadingData: boolean = false;
    savePassword: boolean = false;

    constructor(
        public authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {

    }


    async onSubmit(): Promise<void> {
        this.router.navigate(['dashboard']);
        // this.isLoadingData = true;
        // if (!this.login || !this.password) {

        //     return;
        // }
        // // extract return path
        // const backUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        // // authentication
        // try {
        //     await this.authService.authenticate(this.login, this.password);
        //     this.router.navigate([backUrl]);

        // } catch (err) {

        //     this.isLoadingData = false;
        // }
    }

}

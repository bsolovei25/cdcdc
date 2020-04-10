import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './@core/core.module';
import { SharedModule } from './@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AppConfigService } from './services/appConfigService';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from '@core/interceptors/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationInterceptor } from '@core/interceptors/authentication.interceptor';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef } from '@angular/material/dialog';

@NgModule({
    imports: [
        BrowserModule,
        CoreModule,
        RouterModule,
        AngularSvgIconModule,
        SharedModule,
        HttpClientModule,
        BrowserAnimationsModule,
    ],
    declarations: [AppComponent],
    providers: [
        {
            provide: APP_INITIALIZER,
            multi: true,
            deps: [AppConfigService],
            useFactory: (appConfigService: AppConfigService) => {
                return () => {
                    return appConfigService.loadAppConfig();
                };
            },
        },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthenticationInterceptor,
            multi: true,
        },
        { provide: MatDialogRef, useValue: {} },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }

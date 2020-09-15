import { BrowserModule, Title } from '@angular/platform-browser';
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
import { NgxMaskModule } from 'ngx-mask';
import { OzsmMainIndicatorsComponent } from './widgets/OZSM/ozsm-main-indicators/ozsm-main-indicators.component';
import { OzsmSharedModule } from './widgets/OZSM/ozsm-shared/ozsm-shared.module';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule,
    AngularSvgIconModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(),
    OzsmSharedModule
  ],
    declarations: [AppComponent, OzsmMainIndicatorsComponent],
    providers: [
        {
            provide: APP_INITIALIZER,
            multi: true,
            deps: [AppConfigService],
            useFactory: (appConfigService: AppConfigService) => {
                return () => {
                    return appConfigService.loadAppConfig();
                };
            }
        },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthenticationInterceptor,
            multi: true
        },
        Title
    ],
    bootstrap: [AppComponent],
    exports: []
})
export class AppModule { }

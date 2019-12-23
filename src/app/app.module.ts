import {BrowserModule} from '@angular/platform-browser';
import {NgModule, APP_INITIALIZER} from '@angular/core';

import {AppComponent} from './app.component';
import {CoreModule} from './@core/core.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {SharedModule} from './@shared/shared.module';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {AppConfigService} from './services/appConfigService';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule,
    AngularSvgIconModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
  ],
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

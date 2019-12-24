import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { CoreRoutingModule } from './core-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule
  ],
  providers: [
   
  ]
})
export class CoreModule { }

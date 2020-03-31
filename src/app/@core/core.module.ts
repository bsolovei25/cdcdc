import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { CoreRoutingModule } from './core-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PasswordResetComponent } from './pages/reset-password/password-reset.component';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
    imports: [
        CommonModule,
        CoreRoutingModule,
        FormsModule,
        SharedModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        AngularSvgIconModule,
        OverlayModule
    ],
    declarations: [
        LoginComponent,
        PasswordResetComponent
    ],
    entryComponents: [
        PasswordResetComponent
    ],
    providers: [],
})
export class CoreModule { }

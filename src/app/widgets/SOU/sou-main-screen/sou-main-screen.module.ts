import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SouMainScreenComponent } from './sou-main-screen.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';



@NgModule({
  declarations: [SouMainScreenComponent],
  imports: [
    CommonModule,
    SharedModule,
    AngularSvgIconModule,
  ]
})
export class SouMainScreenModule {
  enterComponent = SouMainScreenComponent;
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SouMainScreenComponent } from './sou-main-screen.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SouInstallationCardComponent } from './components/sou-installation-card/sou-installation-card.component';
import { SouMainScreenArrowsComponent } from './components/sou-main-screen-arrows/sou-main-screen-arrows.component';



@NgModule({
  declarations: [SouMainScreenComponent, SouInstallationCardComponent, SouMainScreenArrowsComponent],
  imports: [
    CommonModule,
    SharedModule,
    AngularSvgIconModule,
  ]
})
export class SouMainScreenModule {
  enterComponent = SouMainScreenComponent;
}

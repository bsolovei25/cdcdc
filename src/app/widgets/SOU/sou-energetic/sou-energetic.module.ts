import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SouEnergeticCardComponent } from './components/sou-energetic-card/sou-energetic-card.component';
import { SouEnergeticCircleIconComponent } from './components/sou-energetic-circle-icon/sou-energetic-circle-icon.component';
import { SouEnergeticComponent } from './sou-energetic.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
    declarations: [SouEnergeticComponent, SouEnergeticCardComponent, SouEnergeticCircleIconComponent],
    imports: [CommonModule, SharedModule, AngularSvgIconModule],
})
export class SouEnergeticModule {
    enterComponent = SouEnergeticComponent;
}

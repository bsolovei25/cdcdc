import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TankFillingComponent } from './components/tank-filling/tank-filling.component';
import { TankCardComponent } from './components/tank-card/tank-card.component';
import { TankFilterComponent } from './components/tank-filter/tank-filter.component';
import { TankLineComponent } from './components/tank-line/tank-line.component';
import { SharedModule } from '@shared/shared.module';
import { TankInformationComponent } from './tank-information.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DashboardModule } from 'src/app/dashboard/dashboard.module';
import { MatTooltip } from '@angular/material/tooltip';


@NgModule({
  declarations: [ TankInformationComponent, TankCardComponent,
    TankFillingComponent, TankLineComponent ],
  imports: [
    CommonModule,
    SharedModule,
    MatTooltip,
    AngularSvgIconModule,
    DashboardModule,
  ]
})
export class TankInformationModule {
  enterComponent = TankInformationComponent;
}

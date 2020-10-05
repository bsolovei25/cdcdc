import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TankFillingComponent } from './components/tank-filling/tank-filling.component';
import { TankCardComponent } from './components/tank-card/tank-card.component';
import { TankFilterComponent } from './components/tank-filter/tank-filter.component';
import { TankLineComponent } from './components/tank-line/tank-line.component';
import { SharedModule } from '@shared/shared.module';
import { TankInformationComponent } from './tank-information.component';



@NgModule({
  declarations: [TankInformationComponent, TankCardComponent, TankFillingComponent, TankFilterComponent, TankLineComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TankInformationModule {
  enterComponent = TankInformationComponent;
}

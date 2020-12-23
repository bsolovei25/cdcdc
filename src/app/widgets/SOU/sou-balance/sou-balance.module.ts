import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SouBalanceComponent } from './sou-balance.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedModule } from '@shared/shared.module';
import { SouBalanceGroupComponent } from './components/sou-balance-group/sou-balance-group.component';
import { SouBalanceGroupItemComponent } from './components/sou-balance-group-item/sou-balance-group-item.component';



@NgModule({
  declarations: [SouBalanceComponent, SouBalanceGroupComponent, SouBalanceGroupItemComponent],
  imports: [
    CommonModule,
    SharedModule, 
    AngularSvgIconModule
  ]
})

export class SouBalanceModule {
  enterComponent = SouBalanceComponent;
}

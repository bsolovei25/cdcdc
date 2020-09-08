import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NkTankInformationCardComponent } from './components/nk-tank-information-card/nk-tank-information-card.component';
import { NkTankInformationFilterMenuComponent } from './components/nk-tank-information-filter-menu/nk-tank-information-filter-menu.component';
import { NkTankInformationCardInfoComponent } from './components/nk-tank-information-card-info/nk-tank-information-card-info.component';
import { NkTankInformationInnageComponent } from './components/nk-tank-information-innage/nk-tank-information-innage.component';
import { NkTankInformationTemperatureComponent } from './components/nk-tank-information-temperature/nk-tank-information-temperature.component';
import { NkTankInformationTitleComponent } from './components/nk-tank-information-title/nk-tank-information-title.component';
import { NkTankInformationReservoirComponent } from './components/nk-tank-information-reservoir/nk-tank-information-reservoir.component';
import { NkTankInformationComponent } from './nk-tank-information.component';

@NgModule({
    declarations: [
        NkTankInformationComponent, 
        NkTankInformationReservoirComponent,
        NkTankInformationTitleComponent,
        NkTankInformationTemperatureComponent,
        NkTankInformationInnageComponent,
        NkTankInformationCardInfoComponent,
        NkTankInformationCardComponent,
        NkTankInformationFilterMenuComponent
    ],
    imports: [
        CommonModule, 
        HttpClientModule
    ]
})
export class TankInformationModule {
    enterComponent = NkTankInformationComponent;
}
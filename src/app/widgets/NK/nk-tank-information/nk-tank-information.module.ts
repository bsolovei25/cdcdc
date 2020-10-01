import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NkTankInformationComponent } from './nk-tank-information.component';
import { NkTankInformationReservoirComponent } from './components/nk-tank-information-reservoir/nk-tank-information-reservoir.component';
import { NkTankInformationTitleComponent } from './components/nk-tank-information-title/nk-tank-information-title.component';
import { NkTankInformationTemperatureComponent } from './components/nk-tank-information-temperature/nk-tank-information-temperature.component';
import { NkTankInformationInnageComponent } from './components/nk-tank-information-innage/nk-tank-information-innage.component';
import { NkTankInformationCardInfoComponent } from './components/nk-tank-information-card-info/nk-tank-information-card-info.component';
import { NkTankInformationCardComponent } from './components/nk-tank-information-card/nk-tank-information-card.component';
import { NkTankInformationFilterMenuComponent } from './components/nk-tank-information-filter-menu/nk-tank-information-filter-menu.component';
import { NkTankInformationPasportComponent } from './components/nk-tank-information-pasport/nk-tank-information-pasport.component';


@NgModule({
    declarations: [
        NkTankInformationComponent,
        NkTankInformationReservoirComponent,
        NkTankInformationTitleComponent,
        NkTankInformationTemperatureComponent,
        NkTankInformationInnageComponent,
        NkTankInformationCardInfoComponent,
        NkTankInformationCardComponent,
        NkTankInformationFilterMenuComponent,
        NkTankInformationPasportComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        MatTooltipModule,
        SharedModule
    ]
})
export class NkTankInformationModule {
    enterComponent = NkTankInformationComponent;
}

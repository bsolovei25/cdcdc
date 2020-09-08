import { FilterMenuComponent } from './components/filter-menu/filter-menu.component';
import { formatVolume } from './components/formatVolume.pipe';
import { CardComponent } from './components/card/card.component';
import { CardInfoComponent } from './components/card-info/card-info.component';
import { InnageComponent } from './components/innage/innage.component';
import { TemperatureComponent } from './components/temperature/temperature.component';
import { TitleComponent } from './components/title/title.component';
import { ReservoirComponent } from './components/reservoir/reservoir.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TankInformationComponent } from './tank-information.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations: [TankInformationComponent,    
        ReservoirComponent,
        TitleComponent,
        TemperatureComponent,
        InnageComponent,
        CardInfoComponent,
        CardComponent,
        formatVolume,
        FilterMenuComponent
    ],
    imports: [
        CommonModule,
        BrowserModule, 
        HttpClientModule
    ]
})
export class TankInformationModule {
    enterComponent = TankInformationComponent;
}
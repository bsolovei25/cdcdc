import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SouOperationalAccountingSystemComponent } from './sou-operational-accounting-system.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { SouDeviationCardsComponent } from './components/sou-deviation-cards/sou-deviation-cards.component';
import { MatRippleModule } from '@angular/material/core';
import { SouInStreamsComponent } from './components/sou-in-streams/sou-in-streams.component';
import { SouOutStreamsComponent } from './components/sou-out-streams/sou-out-streams.component';
import { SharedModule } from '@shared/shared.module';
import { SouProductionTableComponent } from './components/sou-production-table/sou-production-table.component';
import { SouLossesTableComponent } from './components/sou-losses-table/sou-losses-table.component';
import { SouBalanceCardComponent } from './components/sou-balance-card/sou-balance-card.component';
import { MatRippleModule } from '@angular/material/core';
import { SouFacilityInfoComponent } from './components/sou-facility-info/sou-facility-info.component';
import { SouDetailTableComponent } from './components/sou-detail-table/sou-detail-table.component';


@NgModule({
    declarations: [
        SouOperationalAccountingSystemComponent,
        SouInStreamsComponent,
        SouDeviationCardsComponent,
        SouOutStreamsComponent,
        SouProductionTableComponent,
        SouLossesTableComponent,
        SouBalanceCardComponent,
        SouFacilityInfoComponent,
        SouDetailTableComponent
    ],
    imports: [
        CommonModule,
        AngularSvgIconModule,
        MatSlideToggleModule,
        MatRippleModule,
        FormsModule,
        SharedModule,
    ]
})
export class SouOperationalAccountingSystemModule {
    enterComponent = SouOperationalAccountingSystemComponent;
}

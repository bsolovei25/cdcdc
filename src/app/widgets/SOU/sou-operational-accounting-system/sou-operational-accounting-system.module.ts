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

@NgModule({
    declarations: [
        SouOperationalAccountingSystemComponent,
        SouInStreamsComponent,
        SouDeviationCardsComponent,
        SouOutStreamsComponent
    ],
    imports: [
        CommonModule,
        AngularSvgIconModule,
        MatSlideToggleModule,
        FormsModule,
        MatRippleModule
    ]
})
export class SouOperationalAccountingSystemModule {
    enterComponent = SouOperationalAccountingSystemComponent;
}

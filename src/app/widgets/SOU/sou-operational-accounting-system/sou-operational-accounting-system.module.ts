import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SouOperationalAccountingSystemComponent } from './sou-operational-accounting-system.component';
import { SouInStreamsComponent } from '../components/sou-in-streams/sou-in-streams.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { SouDeviationCardsComponent } from './components/sou-deviation-cards/sou-deviation-cards.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
    declarations: [SouOperationalAccountingSystemComponent, SouInStreamsComponent, SouDeviationCardsComponent],
    imports: [
        CommonModule,
        AngularSvgIconModule,
        MatSlideToggleModule,
        FormsModule,
        SharedModule,
    ]
})
export class SouOperationalAccountingSystemModule {
    enterComponent = SouOperationalAccountingSystemComponent;
}

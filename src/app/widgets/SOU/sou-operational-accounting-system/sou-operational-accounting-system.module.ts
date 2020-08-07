import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SouOperationalAccountingSystemComponent } from './sou-operational-accounting-system.component';
import { SouInStreamsComponent } from './components/sou-in-streams/sou-in-streams.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { SouOutStreamsComponent } from './components/sou-out-streams/sou-out-streams.component';


@NgModule({
    declarations: [
        SouOperationalAccountingSystemComponent,
        SouInStreamsComponent,
        SouOutStreamsComponent
    ],
    imports: [
        CommonModule,
        AngularSvgIconModule,
        MatSlideToggleModule,
        FormsModule
    ]
})
export class SouOperationalAccountingSystemModule {
    enterComponent = SouOperationalAccountingSystemComponent;
}

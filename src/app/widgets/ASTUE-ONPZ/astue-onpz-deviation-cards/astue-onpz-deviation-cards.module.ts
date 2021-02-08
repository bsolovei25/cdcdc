import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstueOnpzDeviationCardsComponent } from './astue-onpz-deviation-cards.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [AstueOnpzDeviationCardsComponent],
    imports: [CommonModule, AngularSvgIconModule, MatFormFieldModule, MatSelectModule, SharedModule],
})
export class AstueOnpzDeviationCardsModule {
    enterComponent = AstueOnpzDeviationCardsComponent;
}

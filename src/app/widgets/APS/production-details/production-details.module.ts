import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionDetailsComponent } from './production-details.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScrollingModule } from "@angular/cdk/scrolling";

@NgModule({
    declarations: [
        ProductionDetailsComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        AngularSvgIconModule,
        MatSelectModule,
        FormsModule,
        MatButtonModule,
        MatMenuModule,
        MatTooltipModule,
        ScrollingModule,
    ],
})
export class ProductionDetailsModule {
    enterComponent = ProductionDetailsComponent;
}

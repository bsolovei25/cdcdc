import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstueMnpzEfficiencyComponent } from './astue-mnpz-efficiency.component';
import { SharedModule } from '@shared/shared.module';
import { AstueEfficiencyCalculationComponent } from './components/astue-efficiency-calculation/astue-efficiency-calculation.component';
import { AstueEfficiencyGraphDisplayComponent } from './components/astue-efficiency-graph-display/astue-efficiency-graph-display.component';
import { AstueEfficiencyInitialDataComponent } from './components/astue-efficiency-initial-data/astue-efficiency-initial-data.component';
import { AstueEfficiencyInintialDataBlockComponent } from './components/astue-efficiency-inintial-data-block/astue-efficiency-inintial-data-block.component';
import { AstueEfficiencyItemsComponent } from './components/astue-efficiency-items/astue-efficiency-items.component';
import { AstueEfficiencyItemCardComponent } from './components/astue-efficiency-item-card/astue-efficiency-item-card.component';
import { AstueEfficiencyTableDisplayComponent } from './components/astue-efficiency-table-display/astue-efficiency-table-display.component';
import { AstueEfficiencyUnitCardComponent } from './components/astue-efficiency-unit-card/astue-efficiency-unit-card.component';
import { AstueEfficiencyUnitsComponent } from './components/astue-efficiency-units/astue-efficiency-units.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [
        AstueMnpzEfficiencyComponent,
        AstueEfficiencyCalculationComponent,
        AstueEfficiencyGraphDisplayComponent,
        AstueEfficiencyInitialDataComponent,
        AstueEfficiencyInintialDataBlockComponent,
        AstueEfficiencyItemsComponent,
        AstueEfficiencyItemCardComponent,
        AstueEfficiencyTableDisplayComponent,
        AstueEfficiencyUnitsComponent,
        AstueEfficiencyUnitCardComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        AngularSvgIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatRippleModule,
        MatTooltipModule,
    ],
})
export class AstueMnpzEfficiencyModule {
    enterComponent = AstueMnpzEfficiencyComponent;
}

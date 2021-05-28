import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmidOverallOperationalIndicatorComponent } from "@widgets/CMID/cmid-overall-operational-indicator/cmid-overall-operational-indicator.component";
import { CmidOverallOperationalIndicatorGraphComponent } from './components/cmid-overall-operational-indicator-graph/cmid-overall-operational-indicator-graph.component';
import { SharedModule } from "@shared/shared.module";
import { AngularSvgIconModule } from "angular-svg-icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatChipsModule} from "@angular/material/chips";
import { MatIconModule} from "@angular/material/icon";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { CmidOverallOperationalIndicatorAutocompleteComponent } from './components/cmid-overall-operational-indicator-autocomplete/cmid-overall-operational-indicator-autocomplete.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [CmidOverallOperationalIndicatorComponent, CmidOverallOperationalIndicatorGraphComponent, CmidOverallOperationalIndicatorAutocompleteComponent],
    imports: [
        CommonModule,
        SharedModule,
        AngularSvgIconModule,
        MatFormFieldModule,
        MatChipsModule,
        MatIconModule,
        MatAutocompleteModule,
        ReactiveFormsModule
    ]
})
export class CmidOverallOperationalIndicatorModule {
    enterComponent = CmidOverallOperationalIndicatorComponent;
}

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTableModule } from "@angular/material/table";
import { SharedModule } from "@shared/shared.module";
import { AngularSvgIconModule } from "angular-svg-icon";
import { CmidFactorAnalysisComponent } from "./cmid-factor-analysis.component";
import { CmidFactorAnalysisItemsComponent } from "./components/cmid-factor-analysis-header/cmid-factor-analysis-items.component";

@NgModule({
    declarations: [CmidFactorAnalysisComponent, CmidFactorAnalysisItemsComponent],
    imports: [
        SharedModule, 
        MatCheckboxModule, 
        FormsModule, 
        MatTableModule,
        AngularSvgIconModule, 
        CommonModule,
    ]
})
export class CmidFactorAnalysisModule {
    enterComponent = CmidFactorAnalysisComponent;
}
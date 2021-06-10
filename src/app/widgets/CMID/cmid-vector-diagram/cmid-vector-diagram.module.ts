import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { SharedModule } from "@shared/shared.module";
import { CmidVectorDiagrammComponent } from "./cmid-vector-diagram.component";
import { CmidVectorDiagrammChartComponent } from "./components/cmid-vector-daigram-chart.component";
import { MatRadioModule } from "@angular/material/radio";
import { AngularSvgIconModule } from "angular-svg-icon";

@NgModule({
    declarations: [CmidVectorDiagrammComponent, CmidVectorDiagrammChartComponent],
    imports: [
        CommonModule, SharedModule, MatCheckboxModule, ReactiveFormsModule, MatRadioModule, AngularSvgIconModule
    ]
})

export class CmidVectorDiagrammModule {
    enterComponent = CmidVectorDiagrammComponent;
}

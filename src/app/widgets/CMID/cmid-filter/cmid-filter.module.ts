import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { SharedModule } from "@shared/shared.module";
import { AngularSvgIconModule, SvgIconComponent } from "angular-svg-icon";
import { CmidFilterComponent } from "./cmid-filter.component";

@NgModule({
    declarations: [CmidFilterComponent],
    imports: [
        SharedModule,
        CommonModule,
        AngularSvgIconModule,
        MatSelectModule,
        ReactiveFormsModule,
    ]
})
export class CmidFilterModule {
    enterComponent = CmidFilterComponent;
}
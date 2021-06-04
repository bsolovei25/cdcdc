import { NgModule } from "@angular/core";
import { EcWidgetHeaderComponent } from "@widgets/EC/ec-widget-header/ec-widget-header.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { AngularSvgIconModule } from "angular-svg-icon";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [EcWidgetHeaderComponent],
    imports: [
        CommonModule,
        AngularSvgIconModule,
        SharedModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule
    ]
})

export class EcWidgetHeaderModule {
    enterComponent = EcWidgetHeaderComponent;
}

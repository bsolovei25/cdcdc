import { NgModule } from "@angular/core";
import { EcWidgetHeaderComponent } from "@widgets/EC/ec-widget-header/ec-widget-header.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

@NgModule({
    declarations: [EcWidgetHeaderComponent],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        FormsModule
    ]
})

export class EcWidgetHeaderModule {
    enterComponent = EcWidgetHeaderComponent;
}

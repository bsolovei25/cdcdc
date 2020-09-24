import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OzsmMainToggleComponent } from "./ozsm-main-toggle.component";
import { OzsmSharedModule } from "../ozsm-shared/ozsm-shared.module";


@NgModule({
    declarations: [OzsmMainToggleComponent],
    imports: [
        CommonModule,
        OzsmSharedModule,
    ]
})
export class OzsmMainToggleModule {
    enterComponent = OzsmMainToggleComponent;
}

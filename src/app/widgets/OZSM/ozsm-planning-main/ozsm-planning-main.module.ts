import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OzsmPlanningMainComponent } from "./ozsm-planning-main.component";
import { OzsmSharedModule } from "../ozsm-shared/ozsm-shared.module";


@NgModule({
    declarations: [OzsmPlanningMainComponent],
    imports: [
        CommonModule,
        OzsmSharedModule,
        AngularSvgIconModule
    ]
})
export class OzsmPlanningMainModule {
    enterComponent = OzsmPlanningMainComponent;
}

import { NgModule } from '@angular/core';
import { SuutpHeaderComponent } from '@widgets/SUUTP/shared/components/suutp-header/suutp-header.component';
import { AngularSvgIconModule } from "angular-svg-icon";
import { CommonModule } from "@angular/common";

const components = [SuutpHeaderComponent];
const modules = [CommonModule, AngularSvgIconModule];

@NgModule({
    declarations: [...components],
    imports: [...modules],
    exports: [...components, ...modules],
})
export class SUUTPSharedModule {}

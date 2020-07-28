import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdDeviationMatComponent } from './cd-deviation-mat.component';
import { ContemporaryWidgetHeaderComponent } from '@shared/components/contemporary-widget-header/contemporary-widget-header.component';


@NgModule({
    declarations: [CdDeviationMatComponent, ContemporaryWidgetHeaderComponent],
    imports: [
        CommonModule
    ]
})
export class CdDeviationMatModule {
    enterComponent = CdDeviationMatComponent;
}

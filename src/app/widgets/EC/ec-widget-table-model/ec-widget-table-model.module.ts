import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EcWidgetTableModelComponent} from './ec-widget-table-model.component';
import {SharedModule} from '@shared/shared.module';
import {MatSelectModule} from '@angular/material/select';
import {AngularSvgIconModule} from 'angular-svg-icon';


@NgModule({
    declarations: [EcWidgetTableModelComponent],
    imports: [
        CommonModule,
        SharedModule,
        MatSelectModule,
        AngularSvgIconModule,
    ]
})
export class EcWidgetTableModelModule {
    enterComponent = EcWidgetTableModelComponent;

}

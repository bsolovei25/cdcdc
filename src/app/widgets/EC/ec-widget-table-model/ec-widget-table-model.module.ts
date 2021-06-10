import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EcWidgetTableModelComponent} from './ec-widget-table-model.component';
import {SharedModule} from '@shared/shared.module';
import {MatSelectModule} from '@angular/material/select';
import {AngularSvgIconModule} from 'angular-svg-icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [EcWidgetTableModelComponent],
    imports: [
        CommonModule,
        SharedModule,
        MatSelectModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        AngularSvgIconModule,
    ]
})
export class EcWidgetTableModelModule {
    enterComponent = EcWidgetTableModelComponent;

}

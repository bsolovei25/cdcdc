import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ReferenceComponent } from './reference.component';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';



@NgModule({
  declarations: [ ReferenceComponent ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        AngularSvgIconModule
    ]
})
export class ReferenceModule {
    enterComponent = ReferenceComponent;
}

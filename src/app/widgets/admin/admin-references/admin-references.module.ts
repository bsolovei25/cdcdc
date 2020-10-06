import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { AdminReferencesComponent } from './admin-references.component';
import { AngularSvgIconModule } from 'angular-svg-icon';



@NgModule({
  declarations: [ AdminReferencesComponent ],
  imports: [
    CommonModule,
    SharedModule,
    AngularSvgIconModule
  ]
})
export class AdminReferencesModule {
  enterComponent = AdminReferencesComponent;
}

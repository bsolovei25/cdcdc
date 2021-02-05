import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterpriseMapComponent } from './enterprise-map.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [EnterpriseMapComponent],
    imports: [CommonModule, SharedModule],
})
export class EnterpriseMapModule {
    enterComponent = EnterpriseMapComponent;
}

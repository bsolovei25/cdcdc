import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeShiftComponent } from './change-shift.component';
import { CardVerifierComponent } from './card-verifier/card-verifier.component';
import { ShiftPersonComponent } from './shift-person/shift-person.component';
import { UsbVerifierComponent } from './usb-verifier/usb-verifier.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
    declarations: [ChangeShiftComponent, CardVerifierComponent, ShiftPersonComponent, UsbVerifierComponent],
  imports: [CommonModule, SharedModule, AngularSvgIconModule, MatRippleModule, MatTooltipModule]
})
export class ChangeShiftModule {
    enterComponent = ChangeShiftComponent;
}

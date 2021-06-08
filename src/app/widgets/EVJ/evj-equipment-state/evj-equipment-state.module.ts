import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from "@angular-material-components/datetime-picker";
import { NgxMatMomentModule } from "@angular-material-components/moment-adapter";
import { OverlayModule } from "@angular/cdk/overlay";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { SharedModule } from "@shared/shared.module";
import { AngularSvgIconModule } from "angular-svg-icon";
import { EquipmentStateCommentComponent } from "./components/evj-equipment-state-comment/evj-equipment-state-comment.component";
import { EquipmentStateDatetimePickerComponent } from "./components/evj-equipment-state-datetime-picker/evj-equipment-state-datetime-picker.component";
import { EquipmentStateDropdownComponent } from "./components/evj-equipment-state-dropdown/evj-equipment-state-dropdown.component";
import { EquipmentStateHeaderDropdownComponent } from "./components/evj-equipment-state-header-dropdown/evj-equipment-state-header-dropdown.component";
import { EquipmentStateHeaderComponent } from "./components/evj-equipment-state-header/evj-equipment-state-header.component";
import { EquipmentStateNameComponent } from "./components/evj-equipment-state-name/evj-equipment-state-name.component";
import { EquipmentStateProductionHeaderComponent } from "./components/evj-equipment-state-production-header/evj-equipment-state-production-header.component";
import { EquipmentStateRowComponent } from "./components/evj-equipment-state-row/evj-equipment-state-row.component";
import { EquipmentStateTooltipComponent } from "./components/evj-equipment-state-tooltip/evj-equipment-state-tooltip.component";
import { EquipmentStateTooltipDirective } from "./components/evj-equipment-state-tooltip/evj-equipment-state-tooltip.directive";
import { EquipmentStateComponent } from "./evj-equipment-state.component";
import { EquipmentStateApiService } from "./services/equipment-state-api.service";
import { EquipmentStateHelperService } from "./services/equipment-state-helper.service";

@NgModule({
  declarations: [
    EquipmentStateComponent,
    EquipmentStateRowComponent,
    EquipmentStateHeaderComponent,
    EquipmentStateHeaderDropdownComponent,
    EquipmentStateNameComponent,
    EquipmentStateDropdownComponent,
    EquipmentStateCommentComponent,
    EquipmentStateProductionHeaderComponent,
    EquipmentStateDatetimePickerComponent,
    EquipmentStateTooltipDirective,
    EquipmentStateTooltipComponent
  ],
  imports: [
      CommonModule,
      SharedModule,
      FormsModule,
      ReactiveFormsModule,
      OverlayModule,
      AngularSvgIconModule,

      MatNativeDateModule,
      MatFormFieldModule,
      MatCheckboxModule,
      MatSelectModule,
      MatInputModule,
      MatDatepickerModule,

      NgxMatDatetimePickerModule,
      NgxMatTimepickerModule,
      NgxMatNativeDateModule,
      NgxMatMomentModule
  ],
  providers: [EquipmentStateApiService, EquipmentStateHelperService],
})
export class EvjEquipmentStateModule {
  enterComponent = EquipmentStateComponent;
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpeExecutionProductionProgramComponent } from './kpe-execution-production-program.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
    declarations: [KpeExecutionProductionProgramComponent],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class KpeExecutionProductionProgramModule {
    enterComponent = KpeExecutionProductionProgramComponent;
}

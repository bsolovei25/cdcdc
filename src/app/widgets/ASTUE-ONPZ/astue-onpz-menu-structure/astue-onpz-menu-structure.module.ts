import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstueOnpzMenuStructureComponent } from './astue-onpz-menu-structure.component';
import { SharedModule } from '@shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AstueOnpzMenuStructureComponent],
    imports: [CommonModule, SharedModule, MatSelectModule, ReactiveFormsModule],
})
export class AstueOnpzMenuStructureModule {
    enterComponent = AstueOnpzMenuStructureComponent;
}

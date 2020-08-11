import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstueOnpzMenuStructureComponent } from './astue-onpz-menu-structure.component';
import { SharedModule } from '@shared/shared.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations: [AstueOnpzMenuStructureComponent],
    imports: [CommonModule, SharedModule, MatSelectModule],
})
export class AstueOnpzMenuStructureModule {
    enterComponent = AstueOnpzMenuStructureComponent;
}

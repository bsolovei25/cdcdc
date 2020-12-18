import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SouFakeComponent } from './sou-fake.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [SouFakeComponent],
    imports: [CommonModule, SharedModule],
})
export class SouFakeModule {
    enterComponent = SouFakeComponent;
}

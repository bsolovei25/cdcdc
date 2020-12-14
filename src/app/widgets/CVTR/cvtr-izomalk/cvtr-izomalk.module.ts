import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvtrIzomalkComponent } from './cvtr-izomalk.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [CvtrIzomalkComponent],
    imports: [CommonModule, SharedModule],
})
export class CvtrIzomalkModule {
    enterComponent = CvtrIzomalkComponent;
}

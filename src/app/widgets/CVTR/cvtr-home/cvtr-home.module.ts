import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvtrHomeComponent } from '@widgets/CVTR/cvtr-home/cvtr-home.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [CvtrHomeComponent],
    imports: [CommonModule, SharedModule],
})
export class CvtrHomeModule {
    enterComponent = CvtrHomeComponent;
}

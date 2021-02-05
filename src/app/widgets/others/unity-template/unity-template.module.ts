import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnityTemplateComponent } from './unity-template.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [UnityTemplateComponent],
    imports: [CommonModule, SharedModule],
})
export class UnityTemplateModule {
    enterComponent = UnityTemplateComponent;
}

import { NgModule } from '@angular/core';
import { UiElementsComponent } from './layout/ui-elements.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        UiElementsComponent,
    ],
    imports: [
        CommonModule,

    ],
    exports: [
    ]
})



export class SharedModule { }
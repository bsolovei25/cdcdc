import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { DispatcherScreenComponent } from './dispatcher-screen.component';

@NgModule({
    declarations: [DispatcherScreenComponent],
    imports: [CommonModule, SharedModule],
})
export class DispatcherScreenModule {
    enterComponent = DispatcherScreenComponent;
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RawMotionComponent } from './raw-motion.component';
import { SharedModule } from '../../../@shared/shared.module';

@NgModule({
    declarations: [RawMotionComponent],
    imports: [CommonModule, SharedModule],
})
export class RawMotionModule {
    enterComponent = RawMotionComponent;
}

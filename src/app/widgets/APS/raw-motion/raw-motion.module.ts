import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RawMotionComponent } from './raw-motion.component';
import { SharedModule } from '../../../@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
    declarations: [RawMotionComponent],
    imports: [CommonModule, SharedModule, AngularSvgIconModule],
})
export class RawMotionModule {
    enterComponent = RawMotionComponent;
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvjEventsComponent } from './evj-events.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ScrollingModule } from '@angular/cdk-experimental/scrolling';
import { ScrollingModule as OldScrollingModule } from '@angular/cdk/scrolling';
import { MatExpansionModule } from '@angular/material/expansion';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '@shared/shared.module';
import { EvjEventCardComponent } from './components/evj-event-card/evj-event-card.component';
import { EvjEventCategoriesComponent } from './components/evj-event-categories/evj-event-categories.component';

@NgModule({
    declarations: [EvjEventsComponent, EvjEventCardComponent, EvjEventCategoriesComponent],
    imports: [
        CommonModule,
        AngularSvgIconModule,
        HttpClientModule,
        MatSnackBarModule,
        ScrollingModule,
        OldScrollingModule,
        MatExpansionModule,
        ImageCropperModule,
        DragDropModule,
        NgxMatDatetimePickerModule,
        MatDialogModule,
        MatTooltipModule,
        SharedModule
    ]
})
export class EvjEventsModule {
    enterComponent = EvjEventsComponent;
}

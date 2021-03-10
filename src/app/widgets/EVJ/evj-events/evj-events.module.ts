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
import { EvjEventFiltersComponent } from './components/evj-event-filters/evj-event-filters.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { PortalModule } from '@angular/cdk/portal';
import { PlatformModule } from '@angular/cdk/platform';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRippleModule } from '@angular/material/core';
import { EvjEventCardBlockComponent } from './components/evj-event-card-block/evj-event-card-block.component';
import { EvjEventPreviewComponent } from './components/evj-event-preview/evj-event-preview.component';
import { EventsWorkspaceModule } from '../events-workspace/events-workspace.module';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
    declarations: [
        EvjEventsComponent,
        EvjEventCardComponent,
        EvjEventCategoriesComponent,
        EvjEventFiltersComponent,
        EvjEventCardBlockComponent,
        EvjEventPreviewComponent,
    ],
    imports: [
        OverlayModule,
        PlatformModule,
        PortalModule,
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
        SharedModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatRippleModule,
        EventsWorkspaceModule,
        MatCheckboxModule,
    ],
    providers: [],
})
export class EvjEventsModule {
    enterComponent = EvjEventsComponent;
}

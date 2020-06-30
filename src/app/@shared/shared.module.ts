import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { ContentComponent } from './layout/content/content.component';
import { FnPipe } from './pipes/fn_pipe';
import { DateFormatPipe } from './pipes/data-format.pipe';
import { PreLoaderComponent } from './preloader/preloader.component';
import { UiElementsComponent } from './layout/ui-elements.component';
import { ButtonComponent } from './components/button/button.component';
import { WorkerCardComponent } from './components/worker-card/worker-card.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { UiBlockComponent } from './layout/ui-block/ui-block.component';
import { LoadingShadeComponent } from './components/loading-shade/loading-shade.component';
import { WidgetPreloaderComponent } from './components/widget-preloader/widget-preloader.component';
import { AlertWindowComponent } from './components/alert-window/alert-window.component';
import { NgxMaskModule } from 'ngx-mask';
import { SmartScrollComponent } from './components/smart-scroll/smart-scroll.component';
import { LineChartTrackComponent } from './components/smart-scroll/line-chart-track/line-chart-track.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { LineChartPickerDirective } from './directives/line-chart-picker.directive';
import { EmailEditorComponent } from './components/email-editor/email-editor.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadDropZoneComponent } from './components/upload-drop-zone/upload-drop-zone.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CircleInputComponent } from './components/circle-input/circle-input.component';
import { LineChartTanksDirective } from './directives/line-chart-tanks.directive';
import { LineChartPickerTankDirective } from './directives/line-chart-picker-tank.directive';
import { SpaceNumber } from './pipes/number_space.pipe';
import { AlertInputComponent } from './components/alert-input/alert-input.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { TooltipDirective } from './components/tooltip/directives/tooltip.directive';
import { LineBreakPipe } from './pipes/line-break.pipe';
import { SelectComponent } from './components/select/select.component';
import { MatSelectFilterComponent } from './components/mat-select-filter/mat-select-filter.component';
import { MatSelectModule } from '@angular/material/select';
import { EventsChatComponent } from './components/events-chat/events-chat.component';
import { InputComponent } from './components/input/input.component';
import { AlertPasswordComponent } from './components/alert-password/alert-password.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OverlayModule } from '@angular/cdk/overlay';
import { PopoverOverlayComponent } from './components/popover-overlay/popover-overlay.component';
import {
    MatDialogModule,
    MatDialogRef,
    MAT_DIALOG_DATA,
    MatDialog,
} from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WidgetHeaderComponent } from './components/widget-header/widget-header.component';
import { FrameTopComponent } from './components/frame-top/frame-top.component';
import { FrameBottomComponent } from './components/frame-bottom/frame-bottom.component';
import { ApsWidgetHeaderComponent } from './components/aps-widget-header/aps-widget-header.component';
import { WidgetHeaderSmpComponent } from './components/widget-header-smp/widget-header-smp.component';

@NgModule({
    declarations: [
        HeaderComponent,
        ContentComponent,
        FnPipe,
        DateFormatPipe,
        PreLoaderComponent,
        UiElementsComponent,
        ButtonComponent,
        WorkerCardComponent,
        UiBlockComponent,
        LoadingShadeComponent,
        WidgetPreloaderComponent,
        AlertWindowComponent,
        SmartScrollComponent,
        LineChartTrackComponent,
        LineChartComponent,
        LineChartPickerDirective,
        EmailEditorComponent,
        UploadDropZoneComponent,
        CircleInputComponent,
        LineChartTanksDirective,
        SpaceNumber,
        AlertInputComponent,
        LineChartPickerTankDirective,
        SpaceNumber,
        TooltipComponent,
        TooltipDirective,
        LineBreakPipe,
        SelectComponent,
        MatSelectFilterComponent,
        EventsChatComponent,
        InputComponent,
        AlertPasswordComponent,
        PopoverOverlayComponent,
        WidgetHeaderComponent,
        FrameTopComponent,
        FrameBottomComponent,
        ApsWidgetHeaderComponent,
        WidgetHeaderSmpComponent,
    ],
    exports: [
        HeaderComponent,
        ContentComponent,
        FnPipe,
        PreLoaderComponent,
        ButtonComponent,
        WorkerCardComponent,
        DateFormatPipe,
        PreLoaderComponent,
        UiBlockComponent,
        LoadingShadeComponent,
        WidgetPreloaderComponent,
        AlertWindowComponent,
        SmartScrollComponent,
        EmailEditorComponent,
        UploadDropZoneComponent,
        LineChartComponent,
        EmailEditorComponent,
        CircleInputComponent,
        SpaceNumber,
        AlertInputComponent,
        TooltipComponent,
        TooltipDirective,
        LineBreakPipe,
        SelectComponent,
        MatSelectFilterComponent,
        EventsChatComponent,
        InputComponent,
        AlertPasswordComponent,
        WidgetHeaderComponent,
        FrameTopComponent,
        FrameBottomComponent,
        ApsWidgetHeaderComponent,
        WidgetHeaderSmpComponent,
    ],
    imports: [
        CommonModule,
        MatInputModule,
        MatIconModule,
        NgxMaskModule.forChild(),
        CKEditorModule,
        FormsModule,
        AngularSvgIconModule,
        AngularSvgIconModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        OverlayModule,
        MatDialogModule,
        MatTooltipModule,
    ],
    providers: [
        SpaceNumber,
        LineBreakPipe,
        MatDialog,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
    ],
})
export class SharedModule {}

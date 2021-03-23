import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { ContentComponent } from './layout/content/content.component';
import { FnPipe } from './pipes/fn.pipe';
import { DateFormatPipe } from './pipes/data-format.pipe';
import { PreLoaderComponent } from './components/preloader/preloader.component';
import { UiElementsComponent } from './layout/ui-elements.component';
import { ButtonComponent } from './components/button/button.component';
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
import { SpaceNumber } from './pipes/number-space.pipe';
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
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WidgetHeaderComponent } from './components/widget-header/widget-header.component';
import { FrameTopComponent } from './components/frame-top/frame-top.component';
import { FrameBottomComponent } from './components/frame-bottom/frame-bottom.component';
import { ContemporaryWidgetHeaderComponent } from './components/contemporary-widget-header/contemporary-widget-header.component';
import { WidgetHeaderSmpComponent } from './components/widget-header-smp/widget-header-smp.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { ApsProgressBarComponent } from './components/aps-progress-bar/aps-progress-bar.component';
import { TimeDataPickerComponent } from './components/time-data-picker/time-data-picker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { RectangleInputComponent } from './components/rectangle-input/rectangle-input.component';
import { RectButtonComponent } from '@shared/components/rect-button/rect-button.component';
import { CheckerComponent } from './components/checker/checker.component';
import { FormatStatusPipe } from '../widgets/EVJ/evj-events-workspace/components/evj-events-workspace-select/formatStatus.pipe';
import { SchemaScrollResizerDirective } from './directives/schema-scroll-resizer.directive';
import { AddWordWrapPipe } from './pipes/add-word-wrap.pipe';

@NgModule({
    declarations: [
        HeaderComponent,
        ContentComponent,
        FnPipe,
        FormatStatusPipe,
        DateFormatPipe,
        PreLoaderComponent,
        UiElementsComponent,
        ButtonComponent,
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
        ContemporaryWidgetHeaderComponent,
        WidgetHeaderSmpComponent,
        SafeUrlPipe,
        ApsProgressBarComponent,
        TimeDataPickerComponent,
        RectangleInputComponent,
        RectButtonComponent,
        CheckerComponent,
        SchemaScrollResizerDirective,
        AddWordWrapPipe,
    ],
  exports: [
    HeaderComponent,
    ContentComponent,
    FormatStatusPipe,
    FnPipe,
    PreLoaderComponent,
    ButtonComponent,
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
    ContemporaryWidgetHeaderComponent,
    WidgetHeaderSmpComponent,
    SafeUrlPipe,
    ApsProgressBarComponent,
    TimeDataPickerComponent,
    RectangleInputComponent,
    RectButtonComponent,
    CheckerComponent,
    SchemaScrollResizerDirective,
    AddWordWrapPipe
  ],
    imports: [
        CommonModule,
        MatInputModule,
        MatIconModule,
        NgxMaskModule.forChild(),
        CKEditorModule,
        FormsModule,
        AngularSvgIconModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        OverlayModule,
        MatDialogModule,
        MatTooltipModule,
        MatDatepickerModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,
        NgxMatMomentModule,
    ],
    providers: [
        SpaceNumber,
        LineBreakPipe,
        MatDialog,
        { provide: LOCALE_ID, useValue: 'ru-RU' },
        { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
    ],
})
export class SharedModule {}

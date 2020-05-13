import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { ContentComponent } from './layout/content/content.component';
import { FnPipe } from './pipes/fn_pipe';
import { DateFormatPipe } from './pipes/data-format.pipe';
import { PreLoaderComponent } from './preloader/preloader.component';
import { UiElementsComponent } from './layout/ui-elements.component';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
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
import { FormsModule } from '@angular/forms';
import { UploadDropZoneComponent } from './components/upload-drop-zone/upload-drop-zone.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CircleInputComponent } from './components/circle-input/circle-input.component';
import { LineChartTanksDirective } from './directives/line-chart-tanks.directive';
import { LineChartPickerTankDirective } from './directives/line-chart-picker-tank.directive';
import { SpaceNumber } from './pipes/number_space.pipe';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { TooltipDirective } from './components/tooltip/directives/tooltip.directive';

@NgModule({
    declarations: [
        HeaderComponent,
        ContentComponent,
        FnPipe,
        DateFormatPipe,
        PreLoaderComponent,
        UiElementsComponent,
        ButtonComponent,
        InputComponent,
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
        LineChartPickerTankDirective,
        SpaceNumber,
        TooltipComponent,
        TooltipDirective,
    ],
    exports: [
        HeaderComponent,
        ContentComponent,
        FnPipe,
        PreLoaderComponent,
        ButtonComponent,
        InputComponent,
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
        TooltipComponent,
        TooltipDirective,
    ],
    imports: [
        CommonModule,
        MatInputModule,
        MatIconModule,
        NgxMaskModule.forChild(),
        CKEditorModule,
        FormsModule,
        AngularSvgIconModule,
    ],
    providers: [SpaceNumber],
})
export class SharedModule { }

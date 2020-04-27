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
        LineChartComponent
    ],
    imports: [CommonModule, MatInputModule, MatIconModule, NgxMaskModule.forChild()],
})
export class SharedModule { }

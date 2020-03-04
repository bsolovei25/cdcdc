import { NgModule, Pipe } from '@angular/core';
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
import { UiBlockComponent } from './layout/ui-block/ui-block.component';

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
        ],
        imports: [CommonModule],
})
export class SharedModule { }

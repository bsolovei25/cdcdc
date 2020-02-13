import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { ContentComponent } from './layout/content/content.component';
import { FnPipe } from './pipes/fn_pipe';
import { PreLoaderComponent } from './preloader/preloader.component';
import { UiElementsComponent } from './layout/ui-elements.component';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { WorkerCardComponent } from './components/worker-card/worker-card.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        HeaderComponent,
        ContentComponent,
        FnPipe,
        PreLoaderComponent,
        UiElementsComponent,
        ButtonComponent,
        InputComponent,
        WorkerCardComponent,
    ],
    exports: [
        HeaderComponent,
        ContentComponent,
        FnPipe,
        PreLoaderComponent,
        ButtonComponent,
        InputComponent,
        WorkerCardComponent,
    ],
    imports: [CommonModule, MatInputModule, MatIconModule],
})
export class SharedModule {}

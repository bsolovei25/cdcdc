import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { ContentComponent } from './layout/content/content.component';
import { FnPipe } from './pipes/fn_pipe';
import { PreLoaderComponent } from './preloader/preloader.component';


@NgModule({
  declarations: [
    HeaderComponent, 
    ContentComponent, 
    FnPipe,
    PreLoaderComponent
  ],
  exports: [
    HeaderComponent,
    ContentComponent,
    FnPipe,
    PreLoaderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}

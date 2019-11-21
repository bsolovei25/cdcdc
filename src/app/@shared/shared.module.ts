import {NgModule, Pipe} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './layout/header/header.component';
import { ContentComponent } from './layout/content/content.component';
import { FnPipe } from './pipes/fn_pipe';


@NgModule({
  declarations: [HeaderComponent, ContentComponent, FnPipe ],
  exports: [
    HeaderComponent,
    ContentComponent,
    FnPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './layout/header/header.component';
import { ContentComponent } from './layout/content/content.component';


@NgModule({
  declarations: [HeaderComponent, ContentComponent],
  exports: [
    HeaderComponent,
    ContentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}

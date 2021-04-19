import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SouStreamsComponent } from "@widgets/SOU/sou-streams/sou-streams.component";
import { SharedModule } from "@shared/shared.module";



@NgModule({
  declarations: [
      SouStreamsComponent
  ],
    imports: [CommonModule, SharedModule]
})
export class SouStreamsModule {
    enterComponent = SouStreamsComponent;
}

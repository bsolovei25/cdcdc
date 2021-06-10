import { NgModule } from '@angular/core';
import { EcWidgetMnemonicDiagramComponent } from '@widgets/EC/ec-widget-mnemonic-diagram/ec-widget-mnemonic-diagram.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { EcWidgetMnemonicDiagramListComponent } from '@widgets/EC/ec-widget-mnemonic-diagram/components/ec-widget-mnemonic-diagram-list/ec-widget-mnemonic-diagram-list.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        EcWidgetMnemonicDiagramComponent,
        EcWidgetMnemonicDiagramListComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AngularSvgIconModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})

export class EcWidgetMnemonicDiagramModule {
    enterComponent = EcWidgetMnemonicDiagramComponent;
}

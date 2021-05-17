import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstueOnpzMnemonicFurnaceComponent } from './astue-onpz-mnemonic-furnace.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AstueOnpzMnemonicFurnaceStreamComponent } from './components/astue-onpz-mnemonic-furnace-stream/astue-onpz-mnemonic-furnace-stream.component';
import { AstueOnpzMnemonicFurnaceCircleComponent } from './components/astue-onpz-mnemonic-furnace-circle/astue-onpz-mnemonic-furnace-circle.component';
import { AstueOnpzMnemonicFurnaceQuadComponent } from './components/astue-onpz-mnemonic-furnace-quad/astue-onpz-mnemonic-furnace-quad.component';
import { AstueOnpzMnemonicFurnaceLineComponent } from './components/astue-onpz-mnemonic-furnace-line/astue-onpz-mnemonic-furnace-line.component';
import { AstueOnpzMnemonicFurnacePopupComponent } from './components/astue-onpz-mnemonic-furnace-popup/astue-onpz-mnemonic-furnace-popup.component';
import { AstueOnpzMnemonicFurnacePopupStreamComponent } from './components/astue-onpz-mnemonic-furnace-popup/astue-onpz-mnemonic-furnace-popup-stream/astue-onpz-mnemonic-furnace-popup-stream.component';
import { MatRippleModule } from '@angular/material/core';
import { AstueOnpzMnemonicFurnaceArrowComponent } from './components/astue-onpz-mnemonic-furnace-arrow/astue-onpz-mnemonic-furnace-arrow.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { EcWidgetSharedModule } from '../ec-widget-shared/ec-widget-shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AstueOnpzMnemonicFurnaceComponent,
        AstueOnpzMnemonicFurnaceStreamComponent,
        AstueOnpzMnemonicFurnaceCircleComponent,
        AstueOnpzMnemonicFurnaceQuadComponent,
        AstueOnpzMnemonicFurnaceLineComponent,
        AstueOnpzMnemonicFurnacePopupComponent,
        AstueOnpzMnemonicFurnacePopupStreamComponent,
        AstueOnpzMnemonicFurnaceArrowComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        AngularSvgIconModule,
        MatRippleModule,
        MatFormFieldModule,
        MatSelectModule,
        MatRippleModule,
        EcWidgetSharedModule,
        ReactiveFormsModule,
    ],
    exports: [AstueOnpzMnemonicFurnaceComponent],
})
export class AstueOnpzMnemonicFurnaceModule {
    enterComponent = AstueOnpzMnemonicFurnaceComponent;
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SouMvpMnemonicSchemeComponent } from './sou-mvp-mnemonic-scheme.component';
import { SharedModule } from '../../../@shared/shared.module';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { SouMvpMnemonicSchemeCircleDiagramComponent } from './components/sou-mvp-mnemonic-scheme-circle-diagram/sou-mvp-mnemonic-scheme-circle-diagram.component';
import { SouMvpMnemonicSchemeInfoComponent } from './components/sou-mvp-mnemonic-scheme-info/sou-mvp-mnemonic-scheme-info.component';
import { SouMvpMnemonicSchemeStreamDiagramComponent } from './components/sou-mvp-mnemonic-scheme-stream-diagram/sou-mvp-mnemonic-scheme-stream-diagram.component';
import { SouMvpMnemonicSchemeCollectorComponent } from './components/sou-mvp-mnemonic-scheme-collector/sou-mvp-mnemonic-scheme-collector.component';
import { SouMvpMnemonicSchemeOutputComponent } from './components/sou-mvp-mnemonic-scheme-output/sou-mvp-mnemonic-scheme-output.component';
import { SouMvpMnemonicSchemeSectionComponent } from './components/sou-mvp-mnemonic-scheme-section/sou-mvp-mnemonic-scheme-section.component';

@NgModule({
    declarations: [
        SouMvpMnemonicSchemeComponent,
        SouMvpMnemonicSchemeCircleDiagramComponent,
        SouMvpMnemonicSchemeInfoComponent,
        SouMvpMnemonicSchemeStreamDiagramComponent,
        SouMvpMnemonicSchemeCollectorComponent,
        SouMvpMnemonicSchemeOutputComponent,
        SouMvpMnemonicSchemeSectionComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AngularSvgIconModule,
        MatRippleModule,
        MatSelectModule
    ]
})
export class SouMvpMnemonicSchemeModule {
    enterComponent = SouMvpMnemonicSchemeComponent;
}

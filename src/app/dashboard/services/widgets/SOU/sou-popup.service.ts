import { Injectable } from '@angular/core';
import { SouMvpMnemonicSchemeModule } from '../../../../widgets/SOU/sou-mvp-mnemonic-scheme/sou-mvp-mnemonic-scheme.module';

@Injectable({
    providedIn: 'root',
})
export class SouPopupService {
    isPopupOpen: boolean = true;

    constructor() {}

    openPopup(): void {
        this.isPopupOpen = true;
    }

    closePopup(): void {
        this.isPopupOpen = false;
    }
}

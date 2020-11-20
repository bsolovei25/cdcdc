import { Injectable } from '@angular/core';
import { ISOUFlowOut } from '../../../models/SOU/sou-operational-accounting-system';

@Injectable({
    providedIn: 'root',
})
export class SouMvpMnemonicSchemeService {
    isPopupOpen: boolean = false;
    selectedCode: number = -1; // Код выделенного элемента
    popupData: ISOUFlowOut;

    constructor() {}

    openPopup(sections: any[], code: number): void {
        this.popupData = this.getElementByCode(sections, code);
        this.selectElement(sections, code);
        this.isPopupOpen = true;
    }

    closePopup(): void {
        this.isPopupOpen = false;
    }

    // Ищет элемент по коду в массиве всех элементов
    getElementByCode(sections: any[], code: number): any {
        return sections.find((item: { code: number; }) => item.code === code);
    }

    selectElement(sections: any[], code: number): any {
        this.selectedCode = code;

        return sections.find((item: { code: number; }) => item.code === code);
    }
}

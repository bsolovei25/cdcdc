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
        if (this.selectedCode >= 0) {
            if (this.selectedCode !== code) {
                debugger;
                // Найти выделенный ранее если он есть и удалить флаг
                this.getElementByCode(sections, this.selectedCode).selected = false;
                // Выделить новый
                this.getElementByCode(sections, code).selected = true;
            } else {
                debugger;
                this.getElementByCode(sections, code).selected = true;
            }
        } else {
            debugger;
            // Выделить новый
            this.getElementByCode(sections, code).selected = true;
        }

        this.selectedCode = code;

        return sections.find((item: { code: number; }) => item.code === code);
    }
}

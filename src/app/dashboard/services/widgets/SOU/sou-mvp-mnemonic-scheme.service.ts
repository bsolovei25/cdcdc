import { Injectable } from '@angular/core';
import {
    ISOUFlowIn,
    ISOUFlowOut,
    ISOUObjects,
} from '../../../models/SOU/sou-operational-accounting-system';
import { IApsLoad } from '../../../models/APS/load-chart.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class SouMvpMnemonicSchemeService {
    isPopupOpen: boolean = false;
    selectedCode: number = -1; // Код выделенного элемента
    popupData: ISOUFlowOut;

    constructor(private http: HttpClient) {}

    openPopup(sections: (ISOUFlowOut | ISOUFlowIn | ISOUObjects)[], code: number): void {
        this.popupData = this.getElementByCode(sections, code) as ISOUFlowOut;
        this.selectElement(sections, code);
        this.isPopupOpen = true;
    }

    closePopup(): void {
        this.isPopupOpen = false;
        this.selectedCode = -1;
    }

    // Ищет элемент по коду в массиве всех элементов
    getElementByCode(
        sections: (ISOUFlowOut | ISOUFlowIn | ISOUObjects)[],
        code: number
    ): ISOUFlowOut | ISOUFlowIn | ISOUObjects {
        if (sections?.length > 0) {
            return sections.find((item) => item.code === code);
        }
    }

    selectElement(
        sections: (ISOUFlowOut | ISOUFlowIn | ISOUObjects)[],
        code: number
    ): ISOUFlowOut | ISOUFlowIn | ISOUObjects {
        this.selectedCode = code;
        return sections.find((item) => item.code === code);
    }

    async getMockFile(): Promise<any> {
        return await this.http.get('assets/mock/SOU/metaDataSou.json').toPromise();
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ISouMvpMnemonicSchemeView } from '@widgets/SOU/sou-mvp-mnemonic-scheme/components/sou-mvp-mnemonic-scheme-view/sou-mvp-mnemonic-scheme-view.component';
import { ISouFlowIn, ISouFlowOut, ISouObjects } from '../../../models/SOU/sou-operational-accounting-system.model';

interface ISouConfig {
    readonlyId: number;
    code: number;
}

@Injectable({
    providedIn: 'root',
})
export class SouMvpMnemonicSchemeService {

    data$: BehaviorSubject<ISouMvpMnemonicSchemeView> = new BehaviorSubject<ISouMvpMnemonicSchemeView>(null);

    selectedOptions$: BehaviorSubject<{ manufacture: string; unit: string; section: string }> = new BehaviorSubject<{
        manufacture: string;
        unit: string;
        section: string;
    }>(null);
    selectedManufactures$: BehaviorSubject<{ index: number; name: string }> = new BehaviorSubject<{
        index: number;
        name: string;
    }>(null);
    currentSection$: BehaviorSubject<unknown> = new BehaviorSubject<unknown>(null); // Должно быть ISOUOperationalAccountingSystem вместо unknown
    chosenSetting$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
    redirectId$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    isPopupOpen: boolean = false;
    selectedCode: number = -1; // Код выделенного элемента
    popupData: ISouFlowOut;
    public sectionNameForRedirect: string;
    private configSou: ISouConfig[] = [];

    constructor(private http: HttpClient) {
    }

    // linkId === sectionId
    redirectMnemonic(linkId: string): void {
        console.log('redirect', linkId);
        if (!linkId) {
            console.warn('redirect mnemonic no id', linkId);
            return;
        }
        this.redirectId$.next(linkId);
    }

    dropRedirectMnemonic(): void {
        this.redirectId$.next(null);
    }

    openPopup(sections: (ISouFlowOut | ISouFlowIn | ISouObjects)[], code: number): void {
        this.popupData = this.getElementByCode(sections, code) as ISouFlowOut;
        this.selectElement(sections, code);
        this.isPopupOpen = true;
    }

    closePopup(): void {
        this.isPopupOpen = false;
        this.selectedCode = -1;
    }

    get isOpenPopup(): boolean {
        return this.isPopupOpen;
    }

    async getConfigs(): Promise<void> {
        this.configSou = await this.http.get<ISouConfig[]>('assets/mock/SOU/sou-config.json').toPromise();
    }

    // Ищет элемент по коду в массиве всех элементов
    // Ищет по id из файла конфига находит нужный код
    getElementByCode(
        sections: (ISouFlowOut | ISouFlowIn | ISouObjects)[],
        id: number
    ): ISouFlowOut | ISouFlowIn | ISouObjects {
        if (sections?.length > 0) {
            return sections.find((item) => item.code === this.configSou[id].code);
        }
    }

    selectElement(
        sections: (ISouFlowOut | ISouFlowIn | ISouObjects)[],
        code: number
    ): ISouFlowOut | ISouFlowIn | ISouObjects {
        this.selectedCode = code;
        return sections.find((item) => item.code === code);
    }

    async getMockFile(): Promise<any> {
        return await this.http.get('assets/mock/SOU/metaDataSou.json').toPromise();
    }
}

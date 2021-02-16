import {
    AfterViewChecked,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { SouMvpMnemonicSchemeService } from '../../../../../dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';
import {
    ISouFlowIn,
    ISouFlowOut,
    ISouObjects,
} from '../../../../../dashboard/models/SOU/sou-operational-accounting-system.model';

interface IElementFull {
    metaFile?: ISouFlowOut | ISouFlowIn | ISouObjects;
    rects: Element[];
    points: Element[];
    arrows: Element[];
    texts: Element[];
    circle: Element;
    textValue: Element;
    textPercent: Element;
    flag: boolean;
}

interface IElementFullAndUI {
    element: Element;
    elementFull: IElementFull;
}

type TypeMode = 'standard' | 'deviation' | 'disabled' | 'reset' | 'active';

@Component({
    selector: 'evj-sou-schema',
    templateUrl: './sou-schema.component.html',
    styleUrls: ['./sou-schema.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SouSchemaComponent implements OnInit, OnChanges, AfterViewChecked {
    elementsNode: Element[] = []; // все элементы
    dataAttribute: Map<number, Element> = new Map(); // id элемента, элемент
    flag: boolean = true; // флаг для одного входа в ngAfterViewChecked
    fullElement: Map<number, IElementFullAndUI> = new Map();
    dataPark: (ISouFlowOut | ISouFlowIn | ISouObjects)[] = []; // Данные с бэка
    localChosenInstall: string;
    countTypesElement: number = 11;

    srcNameElement: string = 'ng-reflect-src';

    @Input() sectionsDataPark: (ISouFlowOut | ISouFlowIn | ISouObjects)[];
    @Input() chosenSetting: number = 1;
    @Input() chosenInstall: string;

    @ViewChildren('svg_sou') svg: QueryList<ElementRef>;

    constructor(public mvpService: SouMvpMnemonicSchemeService) {}

    ngOnInit(): void {}

    ngOnChanges(): void {
        if (!this.localChosenInstall || this.chosenInstall !== this.localChosenInstall) {
            // Если не было выбрано установки или пришла установка но она не равна старой локальной
            this.localChosenInstall = this.chosenInstall;
            this.flag = true;
            this.resetComponent();
        }

        if (this.dataPark?.length) {
            // Если есть старые данные с бэка
            // 1. Изменяем и дополняем
            this.dataPark.push(...this.setNewDataToSchema());
            // 2. Отрисовываем
            this.loadData(true);
        } else if (this.dataAttribute?.size) {
            // Если данных с бэка небыло, то заполняем
            this.dataPark = this.sectionsDataPark;
            this.loadData(false);
        }
    }

    ngAfterViewChecked(): void {
        const element: Element = document.getElementById('svg_elements')?.firstElementChild;
        const src = element?.getAttribute(this.srcNameElement);
        if (
            document.querySelector(`#element-1_1__${this.getSvgName(this.chosenInstall)}`) &&
            src?.includes(this.getSvgName(this.localChosenInstall)) &&
            this.flag
        ) {
            this.flag = false;
            this.loadSchema();
            if (this.sectionsDataPark.length) {
                this.dataPark = this.sectionsDataPark;
                this.loadData(false);
            }
        }
    }

    setNewDataToSchema(): (ISouFlowOut | ISouFlowIn | ISouObjects)[] {
        // Изменение отрисованых данных и дополнение новых (WEBSOCKET)
        const newArray = [];
        this.sectionsDataPark?.forEach((value) => {
            const element = this.dataPark.find((park) => value?.code === park?.code);
            if (element) {
                element.isExceedingConfInterval = value?.isExceedingConfInterval;
                element.isEnable = value?.isEnable;
                element.related = value?.related;
                if ('productName' in value && 'productName' in element) {
                    element.productName = value?.productName;
                    element.valueTank = value?.valueTank;
                    element.valueMoment = value?.valueMoment;
                    element.valueByHour = value?.valueByHour;
                }
                if ('name' in value && 'name' in element) {
                    element.name = value?.name;
                }
            } else {
                newArray.push(value);
            }
        });
        return newArray;
    }

    resetComponent(): void {
        this.elementsNode = [];
        this.dataAttribute.clear();
        this.fullElement.clear();
    }

    testsToLogPanel(): void {
        const countZeroId = this.dataPark?.filter((value) => value?.code === 0)?.length;
        const countIsActive = this.dataPark?.filter((value) => value?.isEnable === true)?.length;
        let countRepeat: number = 0;
        const arrayRepeat: number[] = [];
        this.dataPark.forEach((value) => {
            let idx = 0;
            this.dataPark.forEach((value2) => {
                if (value.code === value2.code) {
                    idx++;
                }
            });
            if (idx > 1) {
                countRepeat++;
                arrayRepeat.push(value.code);
            }
        });
        console.log(`Данные: ${this.dataPark?.length}`);
        console.log(`Данных (code = 0) - ${countZeroId}`);
        console.log(`Данных (isActive = true) - ${countIsActive}`);
        console.log(`Данных с одинаковым code - ${countRepeat} (${arrayRepeat.join(',')})`);
    }

    loadData(reload: boolean): void {
        // tests
        this.testsToLogPanel();
        //
        this.dataPark?.forEach((data) => {
            data.related = this.relatedArray(data?.related);
            if (reload) {
                this.reloadOldData(data);
            } else {
                this.loadNewData(data);
            }
        });
    }

    reloadOldData(data: ISouFlowOut | ISouFlowIn | ISouObjects): void {
        const element = this.fullElement.get(data.code)?.element;
        const mode = this.modeToElement(data.isExceedingConfInterval, data.isEnable);
        // this.elementEdit(true, mode, element, data);
        if (element?.children) {
            this.addClassAndTextToElement(element, this.fullElement?.get(data?.code)?.elementFull, mode, '', 0, 0);
        }
    }

    loadNewData(data: ISouFlowOut | ISouFlowIn | ISouObjects): void {
        const element = this.dataAttribute.get(data?.code);
        const mode = this.modeToElement(data.isExceedingConfInterval, data.isEnable);
        this.elementEdit(false, mode, element, data);
    }

    modeToElement(isExceedingConfInterval: boolean, isEnable: boolean): TypeMode {
        return isExceedingConfInterval ? 'deviation' : isEnable ? 'standard' : 'disabled';
    }

    relatedArray(related: number[] | string): number[] {
        // Данные с бэка пример - "12;34;45", также сюда приходят данные обработанные [12,45,51]
        return typeof related === 'string'
            ? related
                  .split(';')
                  .map((value) => +value)
                  .filter((value) => !isNaN(value))
            : related;
    }

    loadSchema(): void {
        let i: number = 1;
        while (i <= this.countTypesElement) {
            const elements = this.searchElements(i);
            if (elements) {
                this.elementsNode?.push(...elements);
            }
            i++;
        }
        console.log(`Атрибутов: ${this.dataAttribute?.size}`);
    }

    elementEdit(
        reload: boolean,
        mode: TypeMode,
        element: Element,
        metaFile?: ISouFlowOut | ISouFlowIn | ISouObjects,
        percent: number = 0,
        value: number = 0,
        text: string = ''
    ): void {
        if (element?.children) {
            let elementFull: IElementFull = {
                metaFile,
                rects: [],
                points: [],
                arrows: [],
                texts: [],
                circle: null,
                textValue: null,
                textPercent: null,
                flag: true,
            };
            const elements = Array.from(element?.children);
            // Search
            elements?.forEach((elem) => {
                elementFull = this.searchElementsInElement(elem, elementFull);
            });
            // add class and text to element
            this.addClassAndTextToElement(element, elementFull, mode, text, percent, value);
            // Event
            if (metaFile) {
                this.eventClick(element, elementFull);
                const elementFullAndUI: IElementFullAndUI = {
                    element,
                    elementFull,
                };
                this.fullElement.set(metaFile?.code, elementFullAndUI);
            }
        }
    }

    addClassAndTextToElement(
        element: Element,
        elementFull: IElementFull,
        mode: TypeMode,
        text: string,
        percent: number,
        value: number
    ): void {
        element.setAttribute('class', 'element');

        elementFull?.rects?.forEach((item) => {
            item.classList.add(mode);
        });
        elementFull?.points?.forEach((item) => {
            item.classList.add(mode);
        });
        elementFull?.texts?.forEach((item) => {
            item.classList.add(`${mode}-text`);
            if (elementFull?.metaFile) {
                const element4 = this.dataAttribute.get(elementFull.metaFile.code);
                if (element4.id.includes('-4_')) {
                    item.classList.add(`text-anchor`);
                }
                if ('productName' in elementFull?.metaFile) {
                    this.addTextToTspan(item, String(elementFull?.metaFile?.productName));
                } else {
                    this.addTextToTspan(item, String(elementFull?.metaFile?.name));
                }
            } else {
                this.addTextToTspan(item, String(name));
                const element4 = this.dataAttribute.get(elementFull?.metaFile?.code);
                if (element4?.id.includes('-4_')) {
                    item.classList.add(`text-anchor`);
                }
            }
        });
        elementFull?.arrows?.forEach((item) => {
            item.classList.toggle(`${mode}-arrow`);
        });
        if (elementFull?.circle) {
            elementFull?.circle?.classList.add(mode);
        }

        // Percent
        if (elementFull?.metaFile) {
            if ('valueMomentPercent' in elementFull?.metaFile) {
                this.addTextToTspan(elementFull.textPercent, `${String(elementFull?.metaFile?.valueMomentPercent)}%`);
                elementFull?.textPercent?.classList.remove(
                    'standard-text',
                    'deviation-text',
                    'disabled-text',
                    'reset-text'
                );
                elementFull?.textPercent?.classList.add(`${mode}-text`);
            }
        } else {
            this.addTextToTspan(elementFull?.textPercent, `${String(percent)}%`);
            elementFull?.textPercent?.classList.add(`${mode}-text`);
        }

        // Value
        if (elementFull?.metaFile) {
            if ('valueByHour' in elementFull?.metaFile) {
                let valueMet: number = 0;
                switch (this.chosenSetting) {
                    case 0:
                        valueMet = elementFull?.metaFile?.valueMoment;
                        break;
                    case 1:
                        valueMet = elementFull?.metaFile?.valueByHour;
                        break;
                    case 2:
                        valueMet = elementFull?.metaFile?.valueTank;
                        break;
                }
                this.addTextToTspan(elementFull?.textValue, `${String(valueMet)} тн`);
                elementFull?.textValue?.classList.add(`${mode}-text`);
                const element4 = this.dataAttribute.get(elementFull?.metaFile?.code);
                if (element4?.id.includes('-4_')) {
                    elementFull?.textValue.classList.add(`text-anchor`);
                }
            }
            if ('value' in elementFull?.metaFile) {
                this.addTextToTspan(elementFull?.textValue, `${String(elementFull?.metaFile?.value)} т`);
                const element4 = this.dataAttribute.get(elementFull.metaFile.code);
                if (element4.id.includes('-4_')) {
                    elementFull?.textValue.classList.add(`text-anchor`);
                }
            }
        } else {
            this.addTextToTspan(elementFull?.textValue, `${String(value)} тн`);
            elementFull?.textValue?.classList.remove('standard-text', 'deviation-text', 'disabled-text', 'reset-text');
            elementFull?.textValue?.classList.add(`${mode}-text`);
            const element4 = this.dataAttribute.get(elementFull?.metaFile?.code);
            if (element4?.id.includes('-4_')) {
                elementFull?.textValue.classList.add(`text-anchor`);
            }
        }

        // related elements
        if (typeof elementFull?.metaFile?.related === 'object') {
            elementFull?.metaFile?.related.forEach((id) => {
                const elementRelated = this.dataAttribute.get(id);
                if (elementRelated?.children) {
                    const elementsRelated = Array.from(elementRelated?.children);
                    let elementFullRelated: IElementFull = {
                        rects: [],
                        points: [],
                        arrows: [],
                        texts: [],
                        circle: null,
                        textValue: null,
                        textPercent: null,
                        flag: true,
                    };
                    // Search
                    elementsRelated?.forEach((elem) => {
                        elementFullRelated = this.searchElementsInElement(elem, elementFullRelated);
                    });
                    elementFullRelated?.rects?.forEach((item) => {
                        item.classList.add(mode);
                    });
                    elementFullRelated?.points?.forEach((item) => {
                        item.classList.add(mode);
                    });
                    elementFullRelated?.texts?.forEach((item) => {
                        item.classList.add(`${mode}-text`);
                    });
                    elementFullRelated?.arrows?.forEach((item) => {
                        item.classList.add(`${mode}-arrow`);
                    });
                    if (elementFullRelated?.circle) {
                        elementFullRelated?.circle?.classList.add(mode);
                    }

                    if (elementRelated.getAttribute('id').includes('line')) {
                        elementRelated?.classList.add(mode);
                    }
                }
            });
        }
    }

    searchElementsInElement(element: Element, elementFull: IElementFull): IElementFull {
        const name = element.getAttribute('id');
        if (name?.includes('rect')) {
            if (element?.children?.length) {
                let path: Element;
                Array.from(element?.children).forEach((value) => {
                    if (value?.tagName === 'path') {
                        path = path ?? value;
                    }
                    if (value?.tagName === 'rect') {
                        elementFull?.rects.push(value);
                    }
                });
                if (path) {
                    elementFull?.rects.push(path);
                }
            } else {
                elementFull?.rects.push(element);
            }
        }
        if (name?.includes('point')) {
            elementFull?.points.push(element);
        }
        if (name?.includes('text')) {
            if (name.includes('text_value')) {
                elementFull.textValue = element;
            } else if (name.includes('text_percent')) {
                elementFull.textPercent = element;
            } else {
                elementFull.texts.push(element);
            }
        }
        if (name?.includes('arrow-group')) {
            elementFull?.arrows.push(...this.searchArrow(element?.children));
        }
        if (name?.includes('circle')) {
            elementFull.circle = element;
        }
        return elementFull;
    }

    eventClick(element: Element, elementFull: IElementFull): void {
        if (elementFull?.flag) {
            elementFull.flag = false;
            if ('productName' in elementFull.metaFile) {
                const handler = this.eventListenerClick(elementFull);
                element.removeEventListener('click', handler);
                element.addEventListener('click', handler);
            }
        }
    }

    eventListenerClick(elementFull: IElementFull): () => void {
        return () => {
            this.elementActive(elementFull);
            console.log(elementFull);
            if (typeof elementFull.metaFile.related === 'object') {
                elementFull.metaFile?.related?.forEach((value) => {
                    const element = this.dataAttribute.get(value);
                    if (element && element.getAttribute('id')?.includes('line')) {
                        this.lineActive(element, elementFull);
                    } else {
                        const el = this.fullElement.get(value);
                        if (el) {
                            this.elementActive(el?.elementFull, elementFull);
                        }
                    }
                });
            }
        };
    }

    lineActive(line: Element, elementFull: IElementFull): void {
        if (!line?.classList.contains(`${elementFull.metaFile.code}`)) {
            line?.classList.add(`${elementFull.metaFile.code}`, 'active');
        } else {
            const count = this.countElementsInClassList(line);
            if (count > 1) {
                line?.classList.remove(`${elementFull.metaFile.code}`);
            } else {
                line?.classList.remove(`${elementFull.metaFile.code}`, 'active');
            }
        }
    }

    countElementsInClassList(element: Element): number {
        let count = 0;
        element?.classList.forEach((list) => {
            if (list.length <= 3) {
                count++;
            }
        });
        return count;
    }

    addClassList(item: Element, element: IElementFull, name: string): void {
        item?.classList.add(`${element.metaFile.code}`);
        item?.classList.add(name);
    }

    elementActive(elementFull: IElementFull, element?: IElementFull): void {
        const active = 'active';
        const relatedOrNormal = element ? element : elementFull;
        elementFull.rects.forEach((item) => {
            if (!item?.classList.contains(`${relatedOrNormal.metaFile.code}`)) {
                this.addClassList(item, relatedOrNormal, active);
                if ('productName' in relatedOrNormal.metaFile && !element) {
                    this.mvpService.openPopup(this.dataPark, relatedOrNormal?.metaFile?.code);
                }
            } else {
                const count = this.countElementsInClassList(item);
                if (count > 1) {
                    item?.classList.remove(`${relatedOrNormal?.metaFile?.code}`);
                } else {
                    item?.classList.remove(`${relatedOrNormal?.metaFile?.code}`, active);
                }
                if ('productName' in relatedOrNormal?.metaFile && !element) {
                    if (this.mvpService?.isOpenPopup) {
                        this.mvpService?.closePopup();
                    }
                }
            }
        });
        elementFull.points.forEach((item) => {
            if (!item?.classList.contains(`${relatedOrNormal.metaFile.code}`)) {
                this.addClassList(item, relatedOrNormal, active);
            } else {
                const count = this.countElementsInClassList(item);
                if (count > 1) {
                    item?.classList.remove(`${relatedOrNormal?.metaFile?.code}`);
                } else {
                    item?.classList.remove(`${relatedOrNormal?.metaFile?.code}`, active);
                }
            }
        });
        elementFull.texts.forEach((item) => {
            if (!item?.classList.contains(`${relatedOrNormal?.metaFile?.code}`)) {
                this.addClassList(item, relatedOrNormal, `${active}-text`);
            } else {
                const count = this.countElementsInClassList(item);
                if (count > 1) {
                    item?.classList.remove(`${relatedOrNormal?.metaFile?.code}`);
                } else {
                    item?.classList.remove(`${relatedOrNormal?.metaFile?.code}`, `${active}-text`);
                }
            }
        });
        elementFull.arrows.forEach((item) => {
            if (!item?.classList.contains(`${relatedOrNormal.metaFile.code}`)) {
                this.addClassList(item, relatedOrNormal, `${active}-arrow`);
            } else {
                const count = this.countElementsInClassList(item);
                if (count > 1) {
                    item?.classList.remove(`${relatedOrNormal?.metaFile?.code}`);
                } else {
                    item?.classList.remove(`${relatedOrNormal?.metaFile?.code}`, `${active}-arrow`);
                }
            }
        });

        if (!elementFull.circle?.classList.contains(`${relatedOrNormal?.metaFile?.code}`)) {
            this.addClassList(elementFull.circle, relatedOrNormal, active);
        } else {
            const count = this.countElementsInClassList(elementFull?.circle);
            if (count > 1) {
                elementFull.circle?.classList.remove(`${relatedOrNormal?.metaFile?.code}`);
            } else {
                elementFull.circle?.classList.remove(`${relatedOrNormal?.metaFile?.code}`, active);
            }
        }
        elementFull.textPercent?.classList.toggle('active-text');
        elementFull.textValue?.classList.toggle('active-text');
    }

    addTextToTspan(element: Element, text: string): void {
        if (element?.children) {
            const children = Array.from(element?.children);
            if (text === '') {
                children?.forEach((value) => {
                    value.textContent = text;
                });
            }
            if (text.length > 13) {
                if (children.length > 1) {
                    children[0].textContent = text.slice(0, 13);
                    children[1].textContent = text.slice(13);
                } else {
                    children[0].textContent = text;
                }
            } else {
                children[0].textContent = text;
            }
        }
    }

    searchArrow(elements: HTMLCollection): Element[] {
        const arrow: Element[] = [];
        Array.from(elements).forEach((element) => {
            const name = element.getAttribute('id');
            if (name?.includes('arrow') && !name?.includes('arrow_double') && !name?.includes('arrow_right_simple')) {
                arrow.push(element);
                if (element?.children.length) {
                    arrow.push(...this.searchArrow(element?.children));
                }
            } else {
                if (element?.children.length) {
                    arrow.push(...this.searchArrow(element?.children));
                }
            }
        });
        return arrow;
    }

    searchElements(elementIndex: number): Element[] {
        let i = 1; // счетчик элементов
        const localElements: Element[] = [];
        while (i < 300) {
            // поиск по id  - id=element-1_2
            const element = document.querySelector(`#element-${elementIndex}_${i}`);
            const elementFirst = document.querySelector(
                `#element-${elementIndex}_${i}__${this.getSvgName(this.localChosenInstall)}`
            );
            const line = document.querySelector(`#line_${i}`);
            if (elementFirst) {
                this.elementEdit(false, 'reset', elementFirst);
                this.dataAttribute.set(i, elementFirst);
            }
            if (element) {
                this.elementEdit(false, 'reset', element);
                this.dataAttribute.set(i, element);
            }
            if (line) {
                this.dataAttribute.set(i, line);
            }
            i++;
        }
        return localElements;
    }

    getSvgName(chosenInstall: string): string {
        switch (chosenInstall) {
            case 'АССБ Авиасмеси':
                return 'ASSB-AviaSmesi';
            case 'АССБ А-95':
                return 'ASSB-A-95';
            case 'АССБ А-98':
                return 'ASSB-A-98';
            case 'Насосная т.1163-1164 парк БГС':
                return 'Nasosnaya-park-BGS';
            case 'Насосная т.1163-1164 парк А-95':
                return 'Nasosnaya-park-A-95';
            case 'Насосная т.1163-1164 парк А-92':
                return 'Nasosnaya-park-A-92';
            case 'ТСБ-1 Узел смешения нефти и КГС':
                return 'TSB-1-Usel';
            case 'АВТ-10':
                return 'ABT-10-ELOU';
        }
    }
}

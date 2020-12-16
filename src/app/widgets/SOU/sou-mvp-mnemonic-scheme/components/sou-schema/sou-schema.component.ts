import { AfterViewChecked, Component, Input, OnChanges, OnInit } from '@angular/core';
import { SouMvpMnemonicSchemeService } from '../../../../../dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';
import { DATASOURCE } from './mock';
import {
    ISOUFlowIn,
    ISOUFlowOut,
    ISOUObjects,
} from '../../../../../dashboard/models/SOU/sou-operational-accounting-system';

interface IDataSou {
    id: number;
    deviation?: boolean;
    text: string;
    value?: number;
    active: boolean;
    percent?: number;
}

interface IDataMetaFile {
    elementId: number;
    id: number;
    related: number[];
}

interface IElementFull {
    metaFile?: ISOUFlowOut | ISOUFlowIn | ISOUObjects;
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

@Component({
    selector: 'evj-sou-schema',
    templateUrl: './sou-schema.component.html',
    styleUrls: ['./sou-schema.component.scss'],
})
export class SouSchemaComponent implements OnInit, OnChanges, AfterViewChecked {
    elementsNode: Element[] = []; // все элементы
    dataAttribute: Map<number, Element> = new Map(); // id элемента, элемент
    flag: boolean = true; // флаг для одного входа в ngAfterViewChecked
    metaFile: IDataMetaFile[] = []; // файл с мета данными

    fullElement: Map<number, IElementFullAndUI> = new Map();

    data: IDataSou[] = DATASOURCE; // данные с бэка

    dataPark: (ISOUFlowOut | ISOUFlowIn | ISOUObjects)[] = [];

    @Input() sectionsDataPark: (ISOUFlowOut | ISOUFlowIn | ISOUObjects)[];
    @Input() chosenSetting: number = 1;

    constructor(
        private souService: SouMvpMnemonicSchemeService,
        public mvpService: SouMvpMnemonicSchemeService
    ) {}

    ngOnInit(): void {}

    ngOnChanges(): void {
        if (this.dataPark.length) {
            const newArray = [];
            this.sectionsDataPark.forEach((value) => {
                this.dataPark.forEach((park) => {
                    if (value.code === park.code) {
                        park.isExceedingConfInterval = value.isExceedingConfInterval;
                        park.isEnable = value.isEnable;
                        park.related = value.related;

                        if ('productName' in value && 'productName' in park) {
                            park.productName = value.productName;
                            park.valueTank = value.valueTank;
                            park.valueMoment = value.valueMoment;
                            park.valueByHour = value.valueByHour;
                        }
                        if ('name' in value && 'name' in park) {
                            park.name = value.name;
                        }
                    } else {
                        newArray.push(value);
                    }
                });
            });
            this.loadData(true);
        } else {
            this.dataPark = this.sectionsDataPark;
            this.loadData(false);
        }

        console.log(`Данные: ${this.dataPark.length}`);
    }

    ngAfterViewChecked(): void {
        if (document.querySelector(`#element-1_1`) && this.flag) {
            this.flag = false;
            this.loadSchema();
        }
    }

    async loadMetaFile(): Promise<void> {
        const a = await this.souService.getMockFile();
        this.metaFile = a.data;
    }

    loadData(reload: boolean): void {
        this.dataPark.forEach((data) => {
            data.related =
                typeof data.related === 'string'
                    ? data.related
                          .split(';')
                          .map((value) => +value)
                          .filter((value) => !isNaN(value))
                    : data.related;
            const element = reload
                ? this.fullElement.get(data.code)?.element
                : this.dataAttribute.get(data?.code);
            if (element) {
                const mode = data.isExceedingConfInterval
                    ? 'deviation'
                    : data.isEnable
                    ? 'standard'
                    : 'disabled';
                this.elementEdit(reload, mode, element, data, data.code);
            }
        });
    }

    loadSchema(): void {
        let i: number = 1;
        while (i <= 10) {
            const elements = this.searchElements(i);
            if (elements) {
                this.elementsNode.push(...elements);
            }
            i++;
        }
        console.log(`Блоков: ${this.elementsNode.length}`);
        console.log(`Атрибутов: ${this.dataAttribute.size}`);
    }

    elementEdit(
        reload: boolean,
        mode: 'standard' | 'deviation' | 'disabled' | 'reset' | 'active',
        element: Element,
        metaFile?: ISOUFlowOut | ISOUFlowIn | ISOUObjects,
        idBack?: number,
        percent: number = 0,
        value: number = 0,
        text: string = ''
    ): void {
        if (element?.children) {
            if (reload) {
                this.addClassAndTextToElement(
                    element,
                    this.fullElement.get(metaFile.code).elementFull,
                    mode,
                    text,
                    percent,
                    value
                );
            } else {
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
                    this.fullElement.set(metaFile.code, elementFullAndUI);
                }
            }
        }
    }

    addClassAndTextToElement(
        element: Element,
        elementFull: IElementFull,
        mode: 'standard' | 'deviation' | 'disabled' | 'reset' | 'active',
        text: string,
        percent: number,
        value: number
    ): void {
        element.setAttribute('class', 'element');

        elementFull.rects.forEach((item) => {
            item.classList.add(mode);
        });
        elementFull.points.forEach((item) => {
            item.classList.add(mode);
        });
        elementFull.texts.forEach((item) => {
            item.classList.add(`${mode}-text`);
            if (elementFull?.metaFile) {
                if ('productName' in elementFull?.metaFile) {
                    this.addTextToTspan(item, String(elementFull.metaFile.productName));
                } else {
                    this.addTextToTspan(item, String(elementFull.metaFile.name));
                }
            } else {
                this.addTextToTspan(item, String(name));
            }
        });
        elementFull.arrows.forEach((item) => {
            item.classList.toggle(`${mode}-arrow`);
        });
        if (elementFull.circle) {
            elementFull.circle?.classList.add(mode);
        }

        // Percent
        if (elementFull?.metaFile) {
            if ('valueMomentPercent' in elementFull?.metaFile) {
                this.addTextToTspan(
                    elementFull.textPercent,
                    `${String(elementFull?.metaFile?.valueMomentPercent)}%`
                );
                elementFull.textPercent?.classList.remove(
                    'standard-text',
                    'deviation-text',
                    'disabled-text',
                    'reset-text'
                );
                elementFull.textPercent?.classList.add(`${mode}-text`);
            }
        } else {
            this.addTextToTspan(elementFull.textPercent, `${String(percent)}%`);
            elementFull.textPercent?.classList.add(`${mode}-text`);
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
                this.addTextToTspan(elementFull.textValue, `${String(valueMet)} тн`);
                elementFull.textValue?.classList.add(`${mode}-text`);
            }
        } else {
            this.addTextToTspan(elementFull.textValue, `${String(value)} тн`);
            elementFull.textValue?.classList.remove(
                'standard-text',
                'deviation-text',
                'disabled-text',
                'reset-text'
            );
            elementFull.textValue?.classList.add(`${mode}-text`);
        }
        // related elements
        if (typeof elementFull?.metaFile?.related === 'object') {
            elementFull.metaFile.related.forEach((id) => {
                const elementRelated = this.dataAttribute.get(id);

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
                elementFullRelated?.rects.forEach((item) => {
                    item.classList.add(mode);
                });
                elementFullRelated?.points.forEach((item) => {
                    item.classList.add(mode);
                });
                elementFullRelated?.texts.forEach((item) => {
                    item.classList.add(`${mode}-text`);
                });
                elementFullRelated?.arrows.forEach((item) => {
                    item.classList.add(`${mode}-arrow`);
                });
                if (elementFullRelated?.circle) {
                    elementFullRelated?.circle?.classList.add(mode);
                }

                if (elementRelated.getAttribute('id').includes('line')) {
                    elementRelated?.classList.add(mode);
                }
            });
        }
    }

    searchElementsInElement(element: Element, elementFull: IElementFull): IElementFull {
        const name = element.getAttribute('id');
        if (name.includes('rect')) {
            if (element.children.length) {
                let path: Element;
                Array.from(element.children).forEach((value) => {
                    if (value.tagName === 'path') {
                        path = path ?? value;
                    }
                });
                if (path) {
                    elementFull.rects.push(path);
                }
            } else {
                elementFull.rects.push(element);
            }
        }
        if (name.includes('point')) {
            elementFull.points.push(element);
        }
        if (name.includes('text')) {
            if (name.includes('text_value')) {
                elementFull.textValue = element;
            } else if (name.includes('text_percent')) {
                elementFull.textPercent = element;
            } else {
                elementFull.texts.push(element);
            }
        }
        if (name.includes('arrow-group')) {
            elementFull.arrows.push(...this.searchArrow(element?.children));
        }
        if (name.includes('circle')) {
            elementFull.circle = element;
        }
        return elementFull;
    }

    eventClick(element: Element, elementFull: IElementFull): void {
        if (elementFull.flag) {
            elementFull.flag = false;
            if ('productName' in elementFull.metaFile) {
                const handler = this.eventListenerClick(elementFull);
                element.removeEventListener('click', handler);
                element.addEventListener('click', handler);
            }
        }
    }

    eventListenerClick(elementFull: IElementFull): any {
        return () => {
            this.elementActive(elementFull);
            if (typeof elementFull.metaFile.related === 'object') {
                elementFull.metaFile?.related?.forEach((value) => {
                    const line = this.dataAttribute.get(value);
                    if (line.getAttribute('id').includes('line')) {
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
                    } else {
                        const el = this.fullElement.get(value);
                        if (el) {
                            this.elementActive(el?.elementFull);
                        }
                    }
                });
            }
        };
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

    elementActive(elementFull: IElementFull): void {
        const name = 'active';
        elementFull.rects.forEach((item) => {
            if (!item?.classList.contains(`${elementFull.metaFile.code}`)) {
                item?.classList.add(`${elementFull.metaFile.code}`);
                item?.classList.add(name);
                if ('productName' in elementFull.metaFile) {
                    this.mvpService.openPopup(this.dataPark, elementFull?.metaFile?.code);
                }
            } else {
                const count = this.countElementsInClassList(item);
                if (count > 1) {
                    item?.classList.remove(`${elementFull.metaFile.code}`);
                } else {
                    item?.classList.remove(`${elementFull.metaFile.code}`, name);
                }
                if ('productName' in elementFull.metaFile) {
                    if (this.mvpService.isOpenPopup) {
                        this.mvpService.closePopup();
                    }
                }
            }
        });
        elementFull.points.forEach((item) => {
            if (!item?.classList.contains(`${elementFull.metaFile.code}`)) {
                item?.classList.add(`${elementFull.metaFile.code}`);
                item?.classList.add(name);
            } else {
                const count = this.countElementsInClassList(item);
                if (count > 1) {
                    item?.classList.remove(`${elementFull.metaFile.code}`);
                } else {
                    item?.classList.remove(`${elementFull.metaFile.code}`, name);
                }
            }
        });
        elementFull.texts.forEach((item) => {
            if (!item?.classList.contains(`${elementFull.metaFile.code}`)) {
                item?.classList.add(`${elementFull.metaFile.code}`);
                item?.classList.add(`${name}-text`);
            } else {
                const count = this.countElementsInClassList(item);
                if (count > 1) {
                    item?.classList.remove(`${elementFull.metaFile.code}`);
                } else {
                    item?.classList.remove(`${elementFull.metaFile.code}`, `${name}-text`);
                }
            }
        });
        elementFull.arrows.forEach((item) => {
            if (!item?.classList.contains(`${elementFull.metaFile.code}`)) {
                item?.classList.add(`${elementFull.metaFile.code}`);
                item?.classList.add(`${name}-arrow`);
            } else {
                const count = this.countElementsInClassList(item);
                if (count > 1) {
                    item?.classList.remove(`${elementFull.metaFile.code}`);
                } else {
                    item?.classList.remove(`${elementFull.metaFile.code}`, `${name}-arrow`);
                }
            }
        });

        if (!elementFull.circle?.classList.contains(`${elementFull.metaFile.code}`)) {
            elementFull.circle?.classList.add(`${elementFull.metaFile.code}`);
            elementFull.circle?.classList.add(name);
        } else {
            const count = this.countElementsInClassList(elementFull.circle);
            if (count > 1) {
                elementFull.circle?.classList.remove(`${elementFull.metaFile.code}`);
            } else {
                elementFull.circle?.classList.remove(`${elementFull.metaFile.code}`, name);
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
            if (text.length > 23) {
                if (children.length > 1) {
                    children[0].textContent = text.slice(0, 23);
                    children[1].textContent = text.slice(23);
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
            if (
                name?.includes('arrow') &&
                !name?.includes('arrow_double') &&
                !name?.includes('arrow_right_simple')
            ) {
                arrow.push(element);
                if (element.children.length) {
                    arrow.push(...this.searchArrow(element.children));
                }
            } else {
                if (element.children.length) {
                    arrow.push(...this.searchArrow(element.children));
                }
            }
        });
        return arrow;
    }

    searchElements(elementIndex: number): Element[] {
        let i = 1; // счетчик элементов
        const localElements: Element[] = [];

        while (i < 100) {
            // поиск по id  - id=element-1_2

            const element = document.querySelector(`#element-${elementIndex}_${i}`);
            const line = document.querySelector(`#line_${i}`);
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
}

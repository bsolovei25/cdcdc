import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { SouMvpMnemonicSchemeService } from '../../../../../dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';
import { DATASOURCE } from './mock';

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
    metaFile: IDataMetaFile;
    rects: Element[];
    points: Element[];
    arrows: Element[];
    texts: Element[];
    circle: Element;
    textValue: Element;
    textPercent: Element;
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
export class SouSchemaComponent implements OnInit, AfterViewChecked {
    elementsNode: Element[] = []; // все элементы
    dataAttribute: Map<number, Element> = new Map(); // id элемента, элемент
    flag: boolean = true; // флаг для одного входа в ngAfterViewChecked
    metaFile: IDataMetaFile[] = []; // файл с мета данными

    fullElement: Map<number, IElementFullAndUI> = new Map();

    data: IDataSou[] = DATASOURCE; // данные с бэка

    constructor(private souService: SouMvpMnemonicSchemeService) {}

    ngOnInit(): void {
        this.loadMetaFile();
    }

    ngAfterViewChecked(): void {
        if (document.querySelector(`#element-1_1`) && this.flag && this.metaFile.length) {
            this.flag = false;
            this.loadSchema();
            this.loadData();
        }
    }

    async loadMetaFile(): Promise<void> {
        const a = await this.souService.getMockFile();
        this.metaFile = a.data;
        console.log(this.metaFile);
    }

    loadData(): void {
        this.data.forEach((value) => {
            const metaElement: IDataMetaFile = this.metaFile.find((meta) => meta.id === value.id);
            const element = this.dataAttribute.get(metaElement?.elementId);
            const mode = value.deviation ? 'deviation' : value.active ? 'standard' : 'disabled';
            this.elementEdit(
                mode,
                element,
                metaElement,
                value.id,
                value.percent,
                value.value,
                value.text,
                value.active,
                value.deviation
            );
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
        mode: 'standard' | 'deviation' | 'disabled' | 'reset' | 'active',
        element: Element,
        metaFile?: IDataMetaFile,
        idBack?: number,
        percent?: number,
        value?: number,
        text?: string,
        active?: boolean,
        deviation?: boolean
    ): void {
        if (element?.children) {
            if (mode === 'reset') {
                value = 0;
                percent = 0;
                text = '';
                active = false;
                deviation = false;
            }
            let elementFull: IElementFull = {
                metaFile,
                rects: [],
                points: [],
                arrows: [],
                texts: [],
                circle: null,
                textValue: null,
                textPercent: null,
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
                this.fullElement.set(metaFile.id, elementFullAndUI);
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
            item.classList.remove('standard', 'deviation', 'disabled', 'reset');
            item.classList.add(mode);
        });
        elementFull.points.forEach((item) => {
            item.classList.remove('standard', 'deviation', 'disabled', 'reset');
            item.classList.add(mode);
        });
        elementFull.texts.forEach((item) => {
            item.classList.remove('standard-text', 'deviation-text', 'disabled-text', 'reset-text');
            item.classList.add(`${mode}-text`);
            this.addTextToTspan(item, String(text));
        });
        elementFull.arrows.forEach((item) => {
            item.classList.remove(
                'standard-arrow',
                'deviation-arrow',
                'disabled-arrow',
                'reset-arrow'
            );
            item.classList.toggle(`${mode}-arrow`);
        });
        if (elementFull.circle) {
            elementFull.circle.classList.remove('standard', 'deviation', 'disabled', 'reset');
            elementFull.circle?.classList.add(mode);
        }

        if (elementFull.textPercent) {
            this.addTextToTspan(elementFull.textPercent, `${String(percent)}%`);
            elementFull.textPercent?.classList.remove(
                'standard-text',
                'deviation-text',
                'disabled-text',
                'reset-text'
            );
            elementFull.textPercent?.classList.add(`${mode}-text`);
        }
        if (elementFull.textValue) {
            this.addTextToTspan(elementFull.textValue, `${String(value)} тн`);
            elementFull.textValue?.classList.remove(
                'standard-text',
                'deviation-text',
                'disabled-text',
                'reset-text'
            );
            elementFull.textValue?.classList.add(`${mode}-text`);
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
        element.addEventListener('click', () => {
            this.elementActive(elementFull);
            elementFull.metaFile.related.forEach((value) => {
                const line = this.dataAttribute.get(value);
                if (line.getAttribute('id').includes('line')) {
                    if (!line?.classList.contains(`${elementFull.metaFile.id}`)) {
                        line?.classList.add(`${elementFull.metaFile.id}`);
                        line?.classList.add('active');
                    } else {
                        if (line?.classList.length >= 3) {
                            line?.classList.remove(`${elementFull.metaFile.id}`);
                        } else {
                            line?.classList.remove(`${elementFull.metaFile.id}`, 'active');
                        }
                    }
                } else {
                    const el = this.fullElement.get(value);
                    if (el) {
                        this.elementActive(el?.elementFull);
                    }
                }
            });
        });
    }

    elementActive(elementFull: IElementFull): void {
        elementFull.rects.forEach((item) => {
            item.classList.toggle('active');
        });
        elementFull.points.forEach((item) => {
            item.classList.toggle('active');
        });
        elementFull.texts.forEach((item) => {
            item.classList.toggle('active-text');
        });
        elementFull.arrows.forEach((item) => {
            item.classList.toggle('active-arrow');
        });
        elementFull.circle?.classList.toggle('active');
        elementFull.textPercent?.classList.toggle('active-text');
        elementFull.textValue?.classList.toggle('active-text');
    }

    addTextToTspan(element: Element, text: string): void {
        if (element?.children) {
            const children = Array.from(element?.children);
            children?.forEach((child) => {
                child.textContent = text;
            });
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
                this.elementEdit('reset', element);
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

import { AfterViewInit, Component, OnInit } from '@angular/core';

interface IDataSou {
    id: number;
    deviation?: boolean;
    text: string;
    value?: number;
    active: boolean;
    percent?: number;
}

@Component({
    selector: 'evj-sou-schema',
    templateUrl: './sou-schema.component.html',
    styleUrls: ['./sou-schema.component.scss'],
})
export class SouSchemaComponent implements AfterViewInit {
    elementsNode: Element[] = []; // все элементы
    dataAttribute: Map<number, Element> = new Map(); // id элемента, элемент
    nameAttribute: string = 'node-id';

    data: IDataSou[] = [
        {
            id: 14,
            text: 'FR-92',
            value: 10,
            percent: 20,
            deviation: true,
            active: true,
        },
        {
            id: 15,
            text: 'FR-92',
            value: 10,
            percent: 20,
            deviation: true,
            active: true,
        },
    ];

    ngAfterViewInit(): void {
        this.loadSchema();
        this.loadData();
    }

    loadData(): void {
        this.data.forEach((value) => {
            const element = this.dataAttribute.get(value.id);
            const mode = value.deviation ? 'deviation' : value.active ? 'standard' : 'disabled';
            this.element_3(
                mode,
                element,
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
        this.searchAttribute();
        console.log(`Блоков: ${this.elementsNode.length}`);
        console.log(`Атрибутов: ${this.dataAttribute.size}`);
    }

    element_3(
        mode: 'standard' | 'deviation' | 'disabled' | 'reset',
        element: Element,
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
            const el = Array.from(element?.children);
            const rects: Element[] = [];
            const points: Element[] = [];
            const arrows: Element[] = [];
            const texts: Element[] = [];

            let circle: Element;
            let textValue: Element;
            let textPercent: Element;

            // Search
            el?.forEach((elem) => {
                const name = elem.getAttribute('id');
                if (name.includes('rect')) {
                    rects.push(elem);
                }
                if (name.includes('point')) {
                    points.push(elem);
                }
                if (name.includes('text')) {
                    if (name.includes('text_value')) {
                        textValue = elem;
                    } else if (name.includes('text_percent')) {
                        textPercent = elem;
                    } else {
                        texts.push(elem);
                    }
                }
                if (name.includes('arrow-group')) {
                    arrows.push(...this.searchArrow(elem?.children));
                }
                if (name.includes('circle')) {
                    circle = elem;
                }
            });
            element.setAttribute('class', 'element');
            // Event

            rects.forEach((item) => {
                item.classList.remove('standard', 'deviation', 'disabled', 'reset');
                item.classList.add(mode);
            });
            points.forEach((item) => {
                item.classList.remove('standard', 'deviation', 'disabled', 'reset');
                item.classList.add(mode);
            });
            texts.forEach((item) => {
                item.classList.toggle(`${mode}-text`);
                this.addTextToTspan(item, String(text));
            });
            arrows.forEach((item) => {
                item.classList.toggle(`${mode}-arrow`);
            });
            circle?.classList.remove();
            circle?.classList.add(mode);
            this.addTextToTspan(textPercent, `${String(percent)}%`);
            textPercent?.classList.remove(
                'standard-text',
                'deviation-text',
                'disabled-text',
                'reset-text'
            );
            textPercent?.classList.add(`${mode}-text`);
            this.addTextToTspan(textValue, `${String(value)} тн`);
            textValue?.classList.remove(
                'standard-text',
                'deviation-text',
                'disabled-text',
                'reset-text'
            );
            textValue?.classList.add(`${mode}-text`);
            console.log('1');
            if (mode === 'reset') {
                element.addEventListener('click', () => {
                    console.log('2');
                    rects.forEach((item) => {
                        item.classList.toggle('active');
                    });
                    points.forEach((item) => {
                        item.classList.toggle('active');
                    });
                    texts.forEach((item) => {
                        item.classList.toggle('active-text');
                    });
                    arrows.forEach((item) => {
                        item.classList.toggle('active-arrow');
                    });
                    circle?.classList.toggle('active');
                    textPercent?.classList.toggle('active-text');
                    textValue?.classList.toggle('active-text');
                });
            }
        }
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

    searchAttribute(): void {
        this.elementsNode.forEach((element) => {
            const id = element.getAttribute(this.nameAttribute);
            if (id) {
                this.dataAttribute.set(+id, element); // Заполнение Map атрибутом и элементов
            }
        });
    }

    searchElements(elementName: number): Element[] {
        let i = 2; // счетчик элементов
        const localElements: Element[] = [];
        while (i < 100) {
            if (i === 2) {
                // только для первого элемента - id=element-2
                const element = document.querySelector(`#element-${elementName}`);
                if (element) {
                    this.element_3('reset', element);
                    localElements.push(element);
                }
            }
            // поиск по id  - id=element-1_2
            const element1 = document.querySelector(`#element-${elementName}_${i}`);
            if (element1) {
                this.element_3('reset', element1);
                localElements.push(element1);
            } else {
                break;
            }
            i++;
        }
        return localElements;
    }
}

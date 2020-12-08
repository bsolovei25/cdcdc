import { AfterViewInit, Component, OnInit } from '@angular/core';

interface IDataSou {
    id: number;
    deviation: boolean;
    text: string;
    value: number;
}

@Component({
    selector: 'evj-sou-schema',
    templateUrl: './sou-schema.component.html',
    styleUrls: ['./sou-schema.component.scss'],
})
export class SouSchemaComponent implements OnInit, AfterViewInit {
    elementsNode: Element[] = []; // все элементы
    dataAttribute: Map<number, Element> = new Map();

    constructor() {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.loadSchema();
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
        element: Element,
        percent?: number,
        value?: number,
        text?: string,
        active?: boolean,
        deviation?: boolean
    ): void {
        const el = Array.from(element.children);

        const rects = [];
        const points = [];
        const texts = [];
        el.forEach((elem) => {
            const name = elem.getAttribute('id');
            if (name.includes('rect')) {
                rects.push(elem);
            }
            if (name.includes('point')) {
                points.push(elem);
            }
            if (name.includes('text')) {
                texts.push(elem);
            }
        });
        console.log(rects, points, texts);

        element.setAttribute('class', 'element-3');
        element.addEventListener('click', () => {
            rects.forEach((rect) => {
                rect.setAttribute('class', 'active');
            });
            points.forEach((rect) => {
                rect.setAttribute('class', 'active');
            });
            texts.forEach((rect) => {
                rect.setAttribute('class', 'active-text');
            });
        });
    }

    searchAttribute(): void {
        this.elementsNode.forEach((element) => {
            const id = element.getAttribute('node-id');
            if (id) {
                this.dataAttribute.set(+id, element); // Заполнение Map атрибутом и элементовd
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
                    if (elementName === 3) {
                        this.element_3(element);
                    }
                    localElements.push(element);
                }
            }
            // поиск по id  - id=element-1_2
            const element1 = document.querySelector(`#element-${elementName}_${i}`);
            if (element1) {
                localElements.push(element1);
            } else {
                break;
            }
            i++;
        }
        return localElements;
    }
}

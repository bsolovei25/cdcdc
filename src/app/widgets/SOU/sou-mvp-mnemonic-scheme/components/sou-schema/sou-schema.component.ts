import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    Renderer2,
    ViewChild,
    SimpleChange,
    SimpleChanges
} from '@angular/core';
import { SouMvpMnemonicSchemeService } from '@dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';
import { SouSectionData } from '@dashboard/models/SOU/sou-operational-accounting-system.model';

interface IElementFull {
    sectionData?: SouSectionData;
    rects: Element[];
    points: Element[];
    arrows: Element[];
    texts: Element[];
    circle: Element;
    textValue: Element;
    textPercent: Element;
    ellipse: Element;
    flag: boolean;
    textParams?: ITypeTextParams;
}

interface ITypeTextParams {
    lineLength?: number, // Макс. длина строки
    lineHeight?: number, // Высота одной строки в пикселях
    maxTextLength?: number, // Макс. длина текста до усечения
}

type TypeMode = 'standard' | 'deviation' | 'disabled' | 'reset' | 'active';

@Component({
    selector: 'evj-sou-schema',
    templateUrl: './sou-schema.component.html',
    styleUrls: ['./sou-schema.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SouSchemaComponent implements OnChanges {

    elementsNode: Element[] = []; // все элементы
    elementsMap: Map<number, Element> = new Map(); // Svg элементы .element
    elementsFullMap: Map<number, IElementFull> = new Map(); // Распарсеные элементы
    /*
    * @deprecated похоже что это поле не нужно. Можно использовать sectionsData напрямую.
    * */
    dataPark: SouSectionData[] = []; // Данные с бэка

    private typesNeedTextAnchorMiddle: number[] = [4, 12, 13, 14, 16, 17];
    private typesNeedTextAnchorEnd: number[] = [15];
    private typeTextParams: { [typeId: number]: ITypeTextParams } = {
        1: {
            lineLength: 15,
            lineHeight: 14,
            maxTextLength: 30
        },
        2: {
            lineLength: 17,
            lineHeight: 14,
            maxTextLength: 17 * 2
        },
        3: {
            lineLength: 23,
            lineHeight: 12
        },
        4: {
            lineLength: 13,
            lineHeight: 20
        },
        11: {
            maxTextLength: 10
        },
        12: {
            maxTextLength: 7
        },
        13: {
            lineLength: 7,
            lineHeight: 20
        },
        16: {
            maxTextLength: 17
        },
        17: {
            lineLength: 10,
            maxTextLength: 30
        }
    };
    private debugElementCode: number;

    @Input() sectionsData: SouSectionData[];
    @Input() chosenSetting: number = 1;
    @Input() unitName: string;
    @Input() svgName: string;

    @ViewChild('svgContainer') svgContainer: ElementRef<HTMLElement>;

    constructor(public mvpService: SouMvpMnemonicSchemeService, public renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        const unitNameChanges: SimpleChange = changes?.unitName;
        const sectionsDataChanges: SimpleChange = changes?.sectionsData;

        if (!this.unitName || unitNameChanges?.currentValue !== unitNameChanges?.previousValue) {
            // Если не было выбрано установки или пришла установка но она не равна старой локальной
            this.processSvgWhenItIsReady();
            this.resetComponent();
        }

        if (sectionsDataChanges.previousValue !== sectionsDataChanges.currentValue) {
            this.processSectionsData();
        }
    }

    public get svgFileName(): string {
        return this.svgName
            ? `${this.svgName}.svg`
            : null;
    }

    private getSvgElement(): SVGElement {
        return this.svgContainer?.nativeElement?.querySelector('svg');
    }

    // Ждет пока загрузится svg, проверяет ключевой элемент и запускает обработку svg
    private processSvgWhenItIsReady(): void {
        const processSvg = () => {
            this.parseSvg();
            if (this.sectionsData?.length) {
                this.processSectionsData();
            }
        };

        const wait = () => {
            const svg = this.getSvgElement();
            const svgFileName = this.svgFileName;
            const foundKeyElem = svgFileName && svg?.querySelector(`#element-1_1__${svgFileName.replace('.svg', '')}`);

            if (foundKeyElem) {
                processSvg();
            } else {
                setTimeout(() => {
                    wait();
                }, 100);
            }
        };

        wait();
    }

    // Изменение отрисованых данных и дополнение новых (WEBSOCKET)
    setNewDataToSchema(): SouSectionData[] {
        const newArray = [];
        this.sectionsData?.forEach((value) => {
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
        this.elementsMap.clear();
        this.elementsFullMap.clear();
    }

    testsToLogPanel(): void {
        const countZeroId = this.dataPark?.filter((value) => value?.code === 0)?.length;
        const countIsActive = this.dataPark?.filter((value) => value?.isEnable === true)?.length;
        let countRepeat: number = 0;
        const arrayRepeat: number[] = [];
        this.dataPark?.forEach((value) => {
            let idx = 0;
            this.dataPark?.forEach((value2) => {
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

    // Обработка данных с бека
    // Тут можно замокать данные
    private processSectionsData(): void {
        if (this.debugElementCode) {
            this.dataPark = this.sectionsData?.map((item: SouSectionData) => {
                if (item?.code === this.debugElementCode) {
                    console.log(`Отладка элемента: ${item.code}. Данные с бэка:`, item);
                }

                return item;
            });
        } else {
            this.dataPark = this.sectionsData;
        }
        this.updateSvgBySectionData(false);
    }

    // Обновляет svg по данным с бека
    updateSvgBySectionData(reload: boolean): void {
        // tests
        this.testsToLogPanel();
        //
        this.sectionsData?.forEach((data) => {
            data.related = this.relatedArray(data?.related);
            this.updateElementBySectionData(data, reload);
        });
    }

    // Ищет элемент в svg по данным с бека и обновляет его
    private updateElementBySectionData(sectionData: SouSectionData, reload: boolean): void {
        const element = this.elementsMap.get(sectionData?.code);
        const mode = this.getElementMode(sectionData);

        if (reload) {
            if (element?.children) {
                const elementFull = this.elementsFullMap?.get(sectionData?.code);
                this.addClassAndTextToElement(element, elementFull, mode);
            }
        } else {
            this.prepareElement(mode, element, sectionData);
        }
    }

    private getElementMode(sectionData: SouSectionData): TypeMode {
        const isMeasured = sectionData?.tolerance === 0; // Измеряемый
        const { isExceedingConfInterval, isEnable } = sectionData;

        if (isExceedingConfInterval && isEnable && isMeasured) {
            return 'deviation';
        } else if (!isEnable) {
            return 'disabled';
        }

        return 'standard';
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

    // Первоначальный поиск и распознавание элементов в svg
    private parseSvg(): void {
        const svg = this.getSvgElement();
        const elements = svg.querySelectorAll('[id^=element-]');
        const lines = svg?.querySelectorAll(`[id^=line_]`);

        // Обработка линий
        lines?.forEach((line: Element) => {
            const elMatch = line?.id?.match(/line_(\d+)/i);
            const id = elMatch && elMatch[1] && parseInt(elMatch[1], 10);
            if (!this.elementsMap.get(id)) {
                this.elementsMap.set(id, line);
            }
        });

        // Обработка элементов схемы
        elements?.forEach((element: Element) => {
            const id = this.getElementId(element);
            this.prepareElement('reset', element);
            this.elementsMap.set(id, element);

            if (this.debugElementCode && id === this.debugElementCode) {
                console.log(`Отладка элемента: ${id}. Элемент на мнемосхеме:`, element);
            }
        });

        console.log(`Элементов и линий: ${this.elementsMap?.size}`);
    }

    prepareElement(
        mode: TypeMode,
        element: Element,
        sectionData?: SouSectionData
    ): void {
        if (element?.children) {
            const elementFull = this.getElementFull(element, sectionData);

            if (this.debugElementCode && this.getElementId(element) === this.debugElementCode) {
                console.log(`Отладка элемента: ${this.debugElementCode}. Заполнен IElementFull:`, elementFull);
            }

            const elementId = this.getElementId(element);

            if (elementFull) {
                this.elementsFullMap.set(elementId, elementFull);
            }

            this.addClassAndTextToElement(element, elementFull, mode);

            // Event
            if (sectionData) {
                this.addElementClickListener(element, elementFull);
            }

            // Применение класса для текстовых нод
            this.setElementTextNodeClassIfNeed(element);
        }
    }

    // Распарсить элемент и заполнить IElementFull
    private getElementFull(element: Element, sectionData: SouSectionData): IElementFull {
        let elementFull: IElementFull = {
            sectionData,
            rects: [],
            points: [],
            arrows: [],
            texts: [],
            circle: null,
            textValue: null,
            textPercent: null,
            ellipse: null,
            flag: true
        };
        const children = Array.from(element?.children);

        children?.forEach((elementChild: SVGElement) => {
            elementFull = this.recognizeElementChild(elementChild, elementFull);
        });

        return elementFull;
    }

    // Добавление класса и текста для элемента
    private addClassAndTextToElement(
        element: Element,
        elementFull: IElementFull,
        mode: TypeMode
    ): void {
        this.addElemClass(element, ['element']);

        elementFull?.rects?.forEach((item: Element) => {
            this.setElementMode(item, mode);
        });
        elementFull?.points?.forEach((item: Element) => {
            this.setElementMode(item, mode);
        });
        elementFull?.texts?.forEach((item: Element) => {
            this.setElementMode(item, mode, true);

            if (elementFull?.sectionData) {
                if ('productName' in elementFull?.sectionData) {
                    this.addTextToTextElem(item, String(elementFull?.sectionData?.productName));
                } else {
                    this.addTextToTextElem(item, String(elementFull?.sectionData?.name));
                }
            } else {
                this.addTextToTextElem(item, String(name));
            }
        });
        elementFull?.arrows?.forEach((item: Element) => {
            this.addElemClass(item, [`${mode}-arrow`]);
        });
        if (elementFull?.circle) {
            this.setElementMode(elementFull?.circle, mode);
        }
        if (elementFull?.ellipse) {
            this.setElementMode(elementFull?.ellipse, mode);
        }

        // Percent
        if (elementFull?.sectionData) {
            if ('tolerance' in elementFull?.sectionData) {
                if (elementFull?.textPercent) {
                    this.addTextToTextElem(elementFull.textPercent, `${String(elementFull?.sectionData?.tolerance)}%`);
                    this.setElementMode(elementFull?.textPercent, mode, true);
                }
            }
            if ('valueMomentPercent' in elementFull?.sectionData) {
                let valueMet: number = 0;
                switch (this.chosenSetting) {
                    case 0:
                        valueMet = elementFull?.sectionData?.valueMomentPercent;
                        break;
                    case 1:
                        valueMet = elementFull?.sectionData?.valueByHourPercent;
                        break;
                    case 2:
                        valueMet = elementFull?.sectionData?.valueTankPercent;
                        break;
                }
                if (elementFull?.textPercent) {
                    this.addTextToTextElem(elementFull.textPercent, `${String(valueMet)}%`);
                    this.setElementMode(elementFull?.textPercent, mode, true);
                }
                this.setElementMode(elementFull?.textPercent, mode, true);
            }
        } else {
            this.addTextToTextElem(
                elementFull?.textPercent,
                elementFull?.sectionData?.tolerance
                    ? `${String(elementFull?.sectionData?.tolerance)}%`
                    : `0%`
            );
            if (elementFull?.textPercent) {
                this.setElementMode(elementFull?.textPercent, mode, true);
            }
        }

        // Value
        if (elementFull?.sectionData) {
            if ('valueByHour' in elementFull?.sectionData) {
                let valueMet: number = 0;
                switch (this.chosenSetting) {
                    case 0:
                        valueMet = elementFull?.sectionData?.valueMoment;
                        break;
                    case 1:
                        valueMet = elementFull?.sectionData?.valueByHour;
                        break;
                    case 2:
                        valueMet = elementFull?.sectionData?.valueTank;
                        break;
                }
                this.addTextToTextElem(elementFull?.textValue, `${String(valueMet)} тн`);
                if (elementFull?.textValue) {
                    this.setElementMode(elementFull?.textValue, mode, true);
                }
            }
            if ('value' in elementFull?.sectionData) {
                this.addTextToTextElem(elementFull?.textValue, `${String(elementFull?.sectionData?.value)} т`);
            }
        } else {
            this.addTextToTextElem(elementFull?.textValue, `0 тн`);
            this.setElementMode(elementFull?.textValue, mode, true);
        }

        // related elements
        if (typeof elementFull?.sectionData?.related === 'object') {
            elementFull?.sectionData?.related.forEach((id) => {
                const elementRelated = this.elementsMap.get(id);
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
                        ellipse: null,
                        flag: true
                    };
                    // Search
                    elementsRelated?.forEach((elem: SVGElement) => {
                        elementFullRelated = this.recognizeElementChild(elem, elementFullRelated);
                    });
                    elementFullRelated?.rects?.forEach((item: Element) => {
                        this.setElementMode(item, mode);
                    });
                    elementFullRelated?.points?.forEach((item: Element) => {
                        this.setElementMode(item, mode);
                    });
                    elementFullRelated?.texts?.forEach((item: Element) => {
                        this.setElementMode(item, mode, true);
                    });
                    elementFullRelated?.arrows?.forEach((item: Element) => {
                        this.addElemClass(item, [`${mode}-arrow`]);
                    });
                    if (elementFullRelated?.circle) {
                        this.setElementMode(elementFullRelated?.circle, mode);
                    }

                    if (elementRelated.getAttribute('id').includes('line')) {
                        this.setElementMode(elementRelated, mode);
                    }
                }
            });
        }
    }

    // Функция распознает, потомка элемента схемы.
    // Если он является чем то нужным, то кладет его в IElementFull
    recognizeElementChild(element: SVGElement, elementFull: IElementFull): IElementFull {
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
        } else if (name?.includes('point')) {
            elementFull?.points.push(element);
        } else if (name?.includes('text-params_')) {
            const textParams = this.parseTextParamsFromElementName(name);
            if (textParams) {
                elementFull.textParams = textParams;
            }
        } else if (name?.includes('text')) {
            if (name.includes('text_value')) {
                elementFull.textValue = element;
            } else if (name.includes('text_percent')) {
                elementFull.textPercent = element;
            } else {
                elementFull.texts.push(element);
            }
        } else if (name?.includes('arrow-group')) {
            elementFull?.arrows.push(...this.searchArrow(element?.children));
        } else if (name?.includes('circle')) {
            elementFull.circle = element;
        } else if (name?.includes('ellipse')) {
            elementFull.ellipse = element;
        }
        return elementFull;
    }

    // Распознает индивидуальные настройки текста из id элемента
    private parseTextParamsFromElementName(elementChildName: string): ITypeTextParams {
        const match = elementChildName.match(/text-params_(\w+)=(\d+)/i);
        if (match && match[1] && match[2]) {
            const paramName = match[1];
            const value = parseInt(match[2], 10);

            if (paramName && value) {
                return {
                    [paramName]: value
                };
            }
        }

        return null;
    }

    // Добавляет отслеживание клика на элементе
    private addElementClickListener(element: Element, elementFull: IElementFull): void {
        if (elementFull?.flag) {
            elementFull.flag = false;

            if (
                'name' in elementFull.sectionData ||
                'productName' in elementFull.sectionData ||
                'linkId' in elementFull.sectionData
            ) {
                const handler = this.getElementClickHandler(elementFull);
                element.removeEventListener('click', handler);
                element.addEventListener('click', handler);
            }
        }
    }

    // Возвращает коллбек для клика по элементу
    private getElementClickHandler(elementFull: IElementFull): () => void {
        return () => {
            console.log('click', elementFull);
            this.mvpService.redirectMnemonic(elementFull.sectionData.linkId);
            this.elementActive(elementFull);
            if (typeof elementFull.sectionData.related === 'object') {
                elementFull.sectionData?.related?.forEach((value) => {
                    const element = this.elementsMap.get(value);
                    if (element && element.getAttribute('id')?.includes('line')) {
                        this.lineActive(element, elementFull);
                    } else {
                        const elFull = this.elementsFullMap.get(value);
                        if (elFull) {
                            this.elementActive(elFull, elementFull);
                        }
                    }
                });
            }
        };
    }

    lineActive(line: Element, elementFull: IElementFull): void {
        if (!this.hasElemClass(line, `${elementFull?.sectionData?.code}`)) {
            this.addElemClass(line, [`${elementFull?.sectionData?.code}`, 'active']);
        } else {
            const count = this.countElementsInClassList(line);
            if (count > 1) {
                this.removeElemClass(line, [`${elementFull.sectionData.code}`]);
            } else {
                this.removeElemClass(line, [`${elementFull.sectionData.code}`, 'active']);
            }
        }
    }

    // Не совсем понимаю что делает данная функция
    // Считает количество классов элемента, длинна которых не больше трех символов?
    // Видимо, это классы которые соответствуют айдишникам
    private countElementsInClassList(element: Element): number {
        let count = 0;
        element?.classList.forEach((className: string) => {
            if (className.length <= 3) {
                count++;
            }
        });
        return count;
    }

    elementActive(elementFull: IElementFull, element?: IElementFull): void {
        const active = 'active';
        const relatedOrNormal = element ? element : elementFull;
        elementFull.rects.forEach((item: Element) => {
            if (!this.hasElemClass(item, `${relatedOrNormal?.sectionData?.code}`)) {
                this.addElemClass(item, [`${relatedOrNormal?.sectionData?.code}`, active]);
                if ('productName' in relatedOrNormal.sectionData && !element) {
                    this.mvpService.openPopup(this.dataPark, relatedOrNormal?.sectionData?.code);
                }
            } else {
                const count = this.countElementsInClassList(item);
                if (count > 1) {
                    this.removeElemClass(item, [`${relatedOrNormal?.sectionData?.code}`]);
                } else {
                    this.removeElemClass(item, [`${relatedOrNormal?.sectionData?.code}`, active]);
                }
                if ('productName' in relatedOrNormal?.sectionData && !element) {
                    if (this.mvpService?.isOpenPopup) {
                        this.mvpService?.closePopup();
                    }
                }
            }
        });
        elementFull.points.forEach((item) => {
            if (!this.hasElemClass(item, `${relatedOrNormal?.sectionData?.code}`)) {
                this.addElemClass(item, [`${relatedOrNormal?.sectionData?.code}`, active]);
            } else {
                const count = this.countElementsInClassList(item);
                if (count > 1) {
                    this.removeElemClass(item, [`${relatedOrNormal?.sectionData?.code}`]);
                } else {
                    this.removeElemClass(item, [`${relatedOrNormal?.sectionData?.code}`, active]);
                }
            }
        });
        elementFull.texts.forEach((item) => {
            if (!this.hasElemClass(item, `${relatedOrNormal?.sectionData?.code}`)) {
                this.addElemClass(item, [`${relatedOrNormal?.sectionData?.code}`, `${active}-text`]);
            } else {
                const count = this.countElementsInClassList(item);
                if (count > 1) {
                    this.removeElemClass(item, [`${relatedOrNormal?.sectionData?.code}`]);
                } else {
                    this.removeElemClass(item, [`${relatedOrNormal?.sectionData?.code}`, `${active}-text`]);
                }
            }
        });
        elementFull.arrows.forEach((item) => {
            if (!this.hasElemClass(item, `${relatedOrNormal?.sectionData?.code}`)) {
                this.addElemClass(item, [`${relatedOrNormal?.sectionData?.code}`, `${active}-arrow`]);
            } else {
                const count = this.countElementsInClassList(item);
                if (count > 1) {
                    this.removeElemClass(item, [`${relatedOrNormal?.sectionData?.code}`]);
                } else {
                    this.removeElemClass(item, [`${relatedOrNormal?.sectionData?.code}`, `${active}-arrow`]);
                }
            }
        });

        if (!this.hasElemClass(elementFull.circle, `${relatedOrNormal?.sectionData?.code}`)) {
            this.addElemClass(elementFull.circle, [`${relatedOrNormal?.sectionData?.code}`, active]);
        } else {
            const count = this.countElementsInClassList(elementFull?.circle);
            if (count > 1) {
                this.removeElemClass(elementFull?.circle, [`${relatedOrNormal?.sectionData?.code}`]);
            } else {
                this.removeElemClass(elementFull?.circle, [`${relatedOrNormal?.sectionData?.code}`, active]);
            }
        }
        this.toggleElemClass(elementFull?.textPercent, 'active-text');
        this.toggleElemClass(elementFull?.textValue, 'active-text');
    }

    // Добавляет текст для текстовой ноды <text>
    private addTextToTextElem(textElem: SVGElement | Element, text: string): void {
        if (textElem?.children) {
            const textParams = this.getTextElemLayoutParams(textElem as SVGElement);
            this.makeTextElemMultilineIfNeed(textElem as SVGElement, text, textParams);
            const children = Array.from(textElem?.children);
            let truncatedText = text;
            const lineLength = textParams?.lineLength;

            if (textParams?.maxTextLength && text?.length > textParams.maxTextLength) {
                truncatedText = text.slice(0, textParams.maxTextLength - 3) + '...';
                this.addTooltipToTextElem(textElem as SVGElement, text);
            }

            if (text === '') {
                children?.forEach((child: Element) => {
                    this.setTspanText(child, text);
                });
            }

            if (lineLength && truncatedText.length > lineLength) {
                if (children.length > 1) {
                    children.forEach((child: SVGTextPositioningElement, index: number) => {
                        const from = lineLength * index;
                        const to = lineLength * (index + 1);
                        this.setTspanText(child, truncatedText.slice(from, to).trim());
                    });
                } else {
                    this.setTspanText(children[0], truncatedText);
                }
            } else {
                this.setTspanText(children[0], truncatedText);
            }
        }
    }

    private addTooltipToTextElem(textElem: SVGElement, tooltipText: string): void {
        const titleElem = this.renderer.createElement('title', 'http://www.w3.org/2000/svg');
        const text = this.renderer.createText(tooltipText);
        this.renderer.appendChild(titleElem, text);
        this.renderer.appendChild(textElem, titleElem);
    }

    // Сделать текст <text> многострочным для элементов определенных типов
    // Если текст не помещается в одну стоку
    private makeTextElemMultilineIfNeed(textElem: SVGElement, text: string, textParams: ITypeTextParams): void {
        const lineOffsetTopPx = textParams?.lineHeight || 20;
        const lineLength = textParams?.lineLength;
        const maxTextLength = textParams?.maxTextLength;

        if (lineLength) {
            const textLength = (maxTextLength && (text?.length > maxTextLength))
                ? maxTextLength
                : text?.length;
            const linesCount = Math.ceil(textLength / lineLength);
            const children = textElem?.children && Array.from(textElem.children) as SVGTextPositioningElement[];

            if (children?.length < linesCount) {
                const lastTspan = children[children.length - 1];
                const lastTspanY = lastTspan.y.baseVal[0].value;
                const newLinesCount = linesCount - children.length;

                // Добавление новых строк
                for (let i = 0; i < newLinesCount; i++) {
                    const lastTspanClone = lastTspan.cloneNode() as SVGTextPositioningElement;
                    lastTspanClone.y.baseVal[0].value = lastTspanY + (lineOffsetTopPx * (i + 1));
                    this.renderer.appendChild(textElem, lastTspanClone);
                }

                // Если добавлены новые строки, то нужно отцентровать текст по вертикали
                if (newLinesCount !== 0) {
                    this.renderer.setStyle(textElem, 'transform', `translateY(-${(newLinesCount * lineOffsetTopPx / 2)}px)`);
                }
            }
        }
    }

    // Возвращает параметры перестроения текста <text>
    // Или null если ограничений нет
    private getTextElemLayoutParams(textElem: SVGElement): ITypeTextParams {
        const elementTypeId = this.getElementTypeId(textElem?.parentElement);
        let textParams: ITypeTextParams = null;

        if (elementTypeId) {
            textParams = this.typeTextParams[elementTypeId]
                ? Object.assign({}, this.typeTextParams[elementTypeId])
                : null;
            const elementId = this.getElementId(textElem?.parentElement);
            const elementFull = this.elementsFullMap.get(elementId);
            const individualTextParams = elementFull?.textParams;

            if (individualTextParams) {
                textParams = Object.assign(textParams, individualTextParams);
            }
        }

        return textParams;
    }

    // Возвращает ID элемента
    private getElementId(element: SVGElement | Element): number {
        const elMatch = element?.id?.match(/element-(\d+)_(\d+)/i);
        return elMatch && elMatch[2] && parseInt(elMatch[2], 10);
    }

    // Возвращает ID типа элемента
    private getElementTypeId(element: SVGElement | Element): number {
        const elMatch = element?.id?.match(/element-(\d+)_(\d+)/i);
        return elMatch && elMatch[1] && parseInt(elMatch[1], 10);
    }

    // Установка класса для текстовой ноды внутри элемента если нужно (для выравнивания текста)
    private setElementTextNodeClassIfNeed(element: SVGElement | Element): void {
        const elementTypeId = this.getElementTypeId(element);
        let className: string;

        if (elementTypeId) {
            if (this.typesNeedTextAnchorMiddle.includes(elementTypeId)) {
                className = 'text-anchor-middle';
            } else if (this.typesNeedTextAnchorEnd.includes(elementTypeId)) {
                className = 'text-anchor-end';
            }
        }

        if (className) {
            const elementId = this.getElementId(element);
            const elementFull = this.elementsFullMap.get(elementId);
            this.addElemClass(elementFull?.textValue, [className]);
            this.addElemClass(elementFull?.textPercent, [className]);
            elementFull?.texts?.forEach((el: Element) => {
                this.addElemClass(el, [className]);
            });
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

    // Добавляет список классов элементу
    private addElemClass(element: Element, classList: string[]): void {
        if (element && classList) {
            classList.forEach((className: string) => {
                this.renderer.addClass(element, className);
            });
        }
    }

    // Удаляет список классов из элемента
    private removeElemClass(element: Element, classList: string[]): void {
        if (element && classList) {
            classList.forEach((className: string) => {
                this.renderer.removeClass(element, className);
            });
        }
    }

    // Переключает (добавляет или удаляет если уже есть) класс элемента
    private toggleElemClass(element: Element, className: string): void {
        if (element) {
            if (this.hasElemClass(element, className)) {
                this.removeElemClass(element, [className]);
            } else {
                this.addElemClass(element, [className]);
            }
        }
    }

    // Проверяет наличие класса у элемента
    private hasElemClass(element: Element, className: string): boolean {
        return element?.classList?.contains(className);
    }

    // Заполнение tspan элемента текстом
    private setTspanText(element: Element, text: string): void {
        if (element) {
            this.renderer.setProperty(element, 'innerHTML', text);
        }
    }

    // Задает режим отображения элемента
    private setElementMode(element: SVGElement | Element, mode: TypeMode, textPostfix?: boolean): void {
        if (textPostfix) {
            this.removeElemClass(element, [
                'standard-text',
                'deviation-text',
                'disabled-text',
                'reset-text'
            ]);
            this.addElemClass(element as Element, [`${mode}-text`]);
        } else {
            this.removeElemClass(element, [
                'standard',
                'deviation',
                'disabled',
                'reset',
                'active'
            ]);
            this.addElemClass(element as Element, [mode]);
        }

    }

}

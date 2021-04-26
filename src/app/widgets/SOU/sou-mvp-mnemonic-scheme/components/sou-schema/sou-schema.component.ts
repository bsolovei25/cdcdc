import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    Renderer2,
    ViewChild,
    SimpleChange,
    SimpleChanges,
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
}

type TypeMode = 'standard' | 'deviation' | 'disabled' | 'reset' | 'active';

@Component({
    selector: 'evj-sou-schema',
    templateUrl: './sou-schema.component.html',
    styleUrls: ['./sou-schema.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SouSchemaComponent implements OnChanges {

    elementsNode: Element[] = []; // все элементы
    elementsMap: Map<number, Element> = new Map(); // Svg элементы .element
    elementsFullMap: Map<number, IElementFull> = new Map(); // Распарсеные элементы
    dataPark: SouSectionData[] = []; // Данные с бэка

    private debugElementCode: number;

    @Input() sectionsData: SouSectionData[];
    @Input() chosenSetting: number = 1;
    @Input() unitName: string;
    @Input() sectionName: string;

    @ViewChild('svgContainer') svgContainer: ElementRef<HTMLElement>;

    constructor(public mvpService: SouMvpMnemonicSchemeService, public renderer: Renderer2) {}

    ngOnChanges(changes: SimpleChanges): void {
        const unitNameChanges: SimpleChange = changes?.unitName;

        if (!this.unitName || unitNameChanges?.currentValue !== unitNameChanges?.previousValue) {
            // Если не было выбрано установки или пришла установка но она не равна старой локальной
            this.processSvgWhenItIsReady();
            this.resetComponent();
        }

        if (this.dataPark?.length) {
            // Если есть старые данные с бэка
            // 1. Изменяем и дополняем
            this.dataPark.push(...this.setNewDataToSchema());
            // 2. Отрисовываем
            this.updateSvgBySectionData(true);
        } else if (this.elementsMap?.size) {
            // Если данных с бэка небыло, то заполняем
            this.processSectionsData();
        }
    }

    public get svgFileName(): string {
        if (this.unitName) {
            switch (this.unitName) {
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
                case 'ГФУ-2':
                    return 'gfu-2';
                case 'Коллектор Рефлюкса':
                    return 'collector-ref';
                case 'КПА С100':
                    if (this.sectionName === 'КПА С100') {
                        return 'kpa-c100';
                    } else if (this.sectionName === 'Сырье с100') {
                        return 'trx-tit-204';
                    }
                    break;
                case 'Л-35/11-1000':
                    return 'l-35-11-1000';
                case 'Изомалк-2':
                    if (this.sectionName === 'Топливо факел') {
                        return 'izomalk-2-fuel';
                    } else if (this.sectionName === 'Сырьевой парк') {
                        return 'raw-materials-park-4022';
                    }
                    break;
            }
        }

        return null;
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
            const foundKeyElem = svgFileName && svg?.querySelector(`#element-1_1__${svgFileName}`);

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

    // Обработка данных с бека
    // Тут можно замокать данные
    private processSectionsData(): void {
        if (this.debugElementCode) {
            this.dataPark = this.sectionsData.map((item: SouSectionData) => {
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
        this.dataPark?.forEach((data) => {
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
                this.addClassAndTextToElement(element, this.elementsFullMap?.get(sectionData?.code), mode);
            }
        } else {
            this.prepareElement(mode, element, sectionData);
        }
    }

    private getElementMode(data: SouSectionData): TypeMode {
        const {isExceedingConfInterval, isEnable} = data;
        // return !isEnable ? 'disabled' : isExceedingConfInterval ? 'deviation' : 'standard';
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

    // Первоначальный поиск и распознавание элементов в svg
    private parseSvg(): void {
        const svg = this.getSvgElement();
        const elements = svg.querySelectorAll('[id^=element-]');
        const lines = svg?.querySelectorAll(`[id^=line_]`);

        // Обработка линий
        lines?.forEach((line: Element) => {
            const elMatch = line?.id?.match(/line_(\d+)/i);
            const id = elMatch && elMatch[1] && parseInt(elMatch[1], 10);
            this.elementsMap.set(id, line);
        });

        // Обработка элементов схемы
        elements?.forEach((element: Element) => {
            const elMatch = element?.id?.match(/element-(\d+)_(\d+)/i);
            const id = elMatch && elMatch[2] && parseInt(elMatch[2], 10);

            this.prepareElement('reset', element);
            this.elementsMap.set(id, element);

            if (this.debugElementCode && id === this.debugElementCode) {
                console.log(`Отладка элемента: ${id}. Элемент на мнемосхеме:`,  element);
            }
        });

        console.log(`Элементов и линий: ${this.elementsMap?.size}`);
    }

    prepareElement(
        mode: TypeMode,
        element: Element,
        sectionData?: SouSectionData,
    ): void {
        if (element?.children) {
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
                flag: true,
            };
            const children = Array.from(element?.children);
            // Search
            children?.forEach((elem) => {
                elementFull = this.searchElementsInElement(elem, elementFull);
            });
            // add class and text to element
            this.addClassAndTextToElement(element, elementFull, mode);

            // text-anchor для выравнивания текста по центру
            if (this.doesElemNeedTextAnchor(element)) {
                const textAnchorClassName = 'text-anchor';
                this.addElemClass(elementFull?.textValue, [textAnchorClassName]);
                this.addElemClass(elementFull?.textPercent, [textAnchorClassName]);
                elementFull?.texts?.forEach((el: Element) => {
                    this.addElemClass(el, [textAnchorClassName]);
                });
            }

            // Event
            if (sectionData) {
                this.addElementClickListener(element, elementFull);
                this.elementsFullMap.set(sectionData?.code, elementFull);
            }
        }
    }

    // Добавление класса и текста для элемента
    private addClassAndTextToElement(
        element: Element,
        elementFull: IElementFull,
        mode: TypeMode,
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
                        flag: true,
                    };
                    // Search
                    elementsRelated?.forEach((elem) => {
                        elementFullRelated = this.searchElementsInElement(elem, elementFullRelated);
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

    // Функция распознает, чем является элемент. Если чем то нужным, то кладет его в IElementFull
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
        } else if (name?.includes('point')) {
            elementFull?.points.push(element);
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
    // @TODO Element можно заменить на SVGElement
    private addTextToTextElem(textElem: Element, text: string): void {
        if (textElem?.children) {
            this.makeTextElemMultilineIfNeed(textElem as SVGElement, text);
            const textParams = this.getTextElemLayoutParams(textElem as SVGElement);

            const children = Array.from(textElem?.children);

            if (text === '') {
                children?.forEach((child: Element) => {
                    this.setTspanText(child, text);
                });
            }
            if (textParams?.lineLength && text.length > textParams.lineLength) {
                if (children.length > 1) {
                    children.forEach((child: SVGTextPositioningElement, index: number) => {
                        const from = textParams.lineLength * index;
                        const to = textParams.lineLength * (index + 1);
                        this.setTspanText(child, text.slice(from, to).trim());
                    });
                } else {
                    this.setTspanText(children[0], text);
                }
            } else {
                this.setTspanText(children[0], text);
            }
        }
    }

    // Сделать текст <text> многострочным для элементов определенных типов
    // Если текст не помещается в одну стоку
    private makeTextElemMultilineIfNeed(textElem: SVGElement, text: string): void {
        const textParams = this.getTextElemLayoutParams(textElem);
        const lineOffsetTopPx = textParams?.lineHeight || 20;

        if (textParams?.lineLength) {
            const linesCount = Math.ceil(text?.length / textParams.lineLength);
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
    private getTextElemLayoutParams(textElem: SVGElement): {
        lineLength: number, // Максимальное количество символов в строке
        lineHeight: number, // Высота новой строки при переносе
    } {
        const elementTypeId = this.getElementTypeId(textElem?.parentElement);

        switch (elementTypeId) {
            case 1:
                return {
                    lineLength: 15,
                    lineHeight: 14,
                };
            case 2:
                return {
                    lineLength: 20,
                    lineHeight: 14,
                };
            case 3:
                return {
                    lineLength: 23,
                    lineHeight: 12,
                };
            case 4:
                return {
                    lineLength: 13,
                    lineHeight: 20,
                };
            case 13:
                return {
                    lineLength: 7,
                    lineHeight: 20,
                };
        }

        return null;
    }

    // Нужно ли этому элементу выравнивание текста по центру
    private doesElemNeedTextAnchor(element: Element): boolean {
        const typesNeedTextAnchor = [4, 13, 14];
        const elementTypeId = this.getElementTypeId(element);
        return elementTypeId && typesNeedTextAnchor.includes(elementTypeId);
    }

    // Возвращает ID типа элемента
    private getElementTypeId(element: SVGElement | Element): number {
        const elMatch = element?.id?.match(/element-(\d+)_(\d+)/i);
        const typeId = elMatch && elMatch[1] && parseInt(elMatch[1], 10);
        return typeId;
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
                'reset-text',
            ]);
            this.addElemClass(element as Element, [`${mode}-text`]);
        } else {
            this.removeElemClass(element, [
                'standard',
                'deviation',
                'disabled',
                'reset',
                'active',
            ]);
            this.addElemClass(element as Element, [mode]);
        }

    }
}

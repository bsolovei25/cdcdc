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
export class SouSchemaComponent implements OnChanges {
    elementsNode: Element[] = []; // все элементы
    elementsMap: Map<number, Element> = new Map(); // id элемента, элемент
    fullElement: Map<number, IElementFullAndUI> = new Map(); // Исходные элементы + распарсеные
    dataPark: (ISouFlowOut | ISouFlowIn | ISouObjects)[] = []; // Данные с бэка
    private elementsTypesCount: number = 12;

    @Input() sectionsDataPark: (ISouFlowOut | ISouFlowIn | ISouObjects)[];
    @Input() chosenSetting: number = 1;
    @Input() chosenInstall: string; // Выбранная установка

    @ViewChild('svgContainer') svgContainer: ElementRef<HTMLElement>;

    constructor(public mvpService: SouMvpMnemonicSchemeService, public renderer: Renderer2) {}

    ngOnChanges(changes: SimpleChanges): void {
        const chosenInstallChanges: SimpleChange = changes?.chosenInstall;

        if (!this.chosenInstall || chosenInstallChanges?.currentValue !== chosenInstallChanges?.previousValue) {
            // Если не было выбрано установки или пришла установка но она не равна старой локальной
            this.processSvgWhenItIsReady();
            this.resetComponent();
            console.log('choosen install', this.chosenInstall, this.svgFileName);
        }

        if (this.dataPark?.length) {
            // Если есть старые данные с бэка
            // 1. Изменяем и дополняем
            this.dataPark.push(...this.setNewDataToSchema());
            // 2. Отрисовываем
            this.loadData(true);
        } else if (this.elementsMap?.size) {
            // Если данных с бэка небыло, то заполняем
            this.dataPark = this.sectionsDataPark;
            this.loadData(false);
        }
    }

    public get svgFileName(): string {
        if (this.chosenInstall) {
            switch (this.chosenInstall) {
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
                    return 'kpa-c100';
                case 'Л-35/11-1000':
                    return 'l-35-11-1000';
                case 'Сырьевой парк тит. 4022':
                    return 'raw-materials-park-4022';
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
            if (this.sectionsDataPark && this.sectionsDataPark.length) {
                this.dataPark = this.sectionsDataPark;
                this.loadData(false);
            }
        };

        const wait = () => {
            const svg = this.getSvgElement();
            const foundKeyElem = svg?.querySelector(`#element-1_1__${this.svgFileName}`);

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
    setNewDataToSchema(): (ISouFlowOut | ISouFlowIn | ISouObjects)[] {
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
        this.elementsMap.clear();
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
        const element = this.elementsMap.get(data?.code);
        const mode = this.modeToElement(data.isExceedingConfInterval, data.isEnable);
        this.prepareElement(false, mode, element, data);
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

    private parseSvg(): void {
        const svg = this.getSvgElement();
        const elements = svg.querySelectorAll('[id^=element-]');
        const lines = svg?.querySelectorAll(`[id^=line_]`);

        // Обработка элементов схемы
        elements.forEach((element: Element) => {
            const elMatch = element?.id?.match(/element-(\d+)_(\d+)/i);
            const id = elMatch && elMatch[2] && parseInt(elMatch[2], 10);

            this.prepareElement(false, 'reset', element);
            this.elementsMap.set(id, element);
        });

        // Обработка линий
        lines.forEach((line: Element) => {
            const elMatch = line?.id?.match(/line_(\d+)/i);
            const id = elMatch && elMatch[1] && parseInt(elMatch[1], 10);
            this.elementsMap.set(id, line);
            console.log(line, line.id, id);
        });

        console.log(`Элементов и линий: ${this.elementsMap?.size}`, this.elementsMap);
    }

    prepareElement(
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
            const children = Array.from(element?.children);
            // Search
            children?.forEach((elem) => {
                elementFull = this.searchElementsInElement(elem, elementFull);
            });
            // add class and text to element
            this.addClassAndTextToElement(element, elementFull, mode, text, percent, value);
            // Event
            if (metaFile) {
                this.addElementClickListener(element, elementFull);
                const elementFullAndUI: IElementFullAndUI = {
                    element,
                    elementFull,
                };
                this.fullElement.set(metaFile?.code, elementFullAndUI);
            }
        }
    }

    // Добавление класса и текста для элемента
    private addClassAndTextToElement(
        element: Element,
        elementFull: IElementFull,
        mode: TypeMode,
        text: string,
        percent: number,
        value: number
    ): void {
        this.addElemClass(element, ['element']);

        elementFull?.rects?.forEach((item: Element) => {
            this.addElemClass(item, [mode]);
        });
        elementFull?.points?.forEach((item: Element) => {
            this.addElemClass(item, [mode]);
        });
        elementFull?.texts?.forEach((item: Element) => {
            this.addElemClass(item, [`${mode}-text`]);

            if (elementFull?.metaFile) {
                const element4 = this.elementsMap.get(elementFull.metaFile.code);

                if (this.isElemOfFourthType(element4)) {
                    this.addElemClass(item, [`text-anchor`]);
                }
                if ('productName' in elementFull?.metaFile) {
                    this.addTextToElem(item, String(elementFull?.metaFile?.productName));
                } else {
                    this.addTextToElem(item, String(elementFull?.metaFile?.name));
                }
            } else {
                this.addTextToElem(item, String(name));
                const element4 = this.elementsMap.get(elementFull?.metaFile?.code);
                if (this.isElemOfFourthType(element4)) {
                    this.addElemClass(item, [`text-anchor`]);
                }
            }
        });
        elementFull?.arrows?.forEach((item: Element) => {
            this.addElemClass(item, [`${mode}-arrow`]);
        });
        if (elementFull?.circle) {
            this.addElemClass(elementFull?.circle, [mode]);
        }

        // Percent
        if (elementFull?.metaFile) {
            if ('tolerance' in elementFull?.metaFile) {
                if (elementFull?.textPercent) {
                    this.addTextToElem(elementFull.textPercent, `${String(elementFull?.metaFile?.tolerance)}%`);
                    this.removeElemClass(elementFull?.textPercent, [
                        'standard-text',
                        'deviation-text',
                        'disabled-text',
                        'reset-text',
                    ]);
                    this.addElemClass(elementFull?.textPercent, [`${mode}-text`]);
                }
            }
            if ('valueMomentPercent' in elementFull?.metaFile) {
                let valueMet: number = 0;
                switch (this.chosenSetting) {
                    case 0:
                        valueMet = elementFull?.metaFile?.valueMomentPercent;
                        break;
                    case 1:
                        valueMet = elementFull?.metaFile?.valueByHourPercent;
                        break;
                    case 2:
                        valueMet = elementFull?.metaFile?.valueTankPercent;
                        break;
                }
                if (elementFull?.textPercent) {
                    this.addTextToElem(elementFull.textPercent, `${String(valueMet)}%`);
                    this.removeElemClass(elementFull?.textPercent, [
                        'standard-text',
                        'deviation-text',
                        'disabled-text',
                        'reset-text',
                    ]);
                    this.addElemClass(elementFull?.textPercent, [`${mode}-text`]);
                }
                elementFull?.textPercent?.classList.add(`${mode}-text`);
            }
        } else {
            this.addTextToElem(
                elementFull?.textPercent,
                elementFull?.metaFile?.tolerance
                    ? `${String(elementFull?.metaFile?.tolerance)}%`
                    : `${String(percent)}%`
            );
            if (elementFull?.textPercent) {
                this.addElemClass(elementFull?.textPercent, [`${mode}-text`]);
            }
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
                this.addTextToElem(elementFull?.textValue, `${String(valueMet)} тн`);
                if (elementFull?.textValue) {
                    this.addElemClass(elementFull?.textValue, [`${mode}-text`]);
                }
                const element4 = this.elementsMap.get(elementFull?.metaFile?.code);
                if (this.isElemOfFourthType(element4) && elementFull?.textValue) {
                    this.addElemClass(elementFull?.textValue, [`text-anchor`]);
                }
            }
            if ('value' in elementFull?.metaFile) {
                this.addTextToElem(elementFull?.textValue, `${String(elementFull?.metaFile?.value)} т`);
                const element4 = this.elementsMap.get(elementFull.metaFile.code);
                if (this.isElemOfFourthType(element4) && elementFull?.textValue) {
                    this.addElemClass(elementFull?.textValue, [`text-anchor`]);
                }
            }
        } else {
            this.addTextToElem(elementFull?.textValue, `${String(value)} тн`);
            if (elementFull?.textValue) {
                this.removeElemClass(elementFull?.textValue, [
                    'standard-text',
                    'deviation-text',
                    'disabled-text',
                    'reset-text',
                ]);
                this.addElemClass(elementFull?.textValue, [`${mode}-text`]);
            }
            const element4 = this.elementsMap.get(elementFull?.metaFile?.code);
            if (this.isElemOfFourthType(element4) && elementFull?.textValue) {
                this.addElemClass(elementFull?.textValue, [`text-anchor`]);
            }
        }

        // related elements
        if (typeof elementFull?.metaFile?.related === 'object') {
            elementFull?.metaFile?.related.forEach((id) => {
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
                        flag: true,
                    };
                    // Search
                    elementsRelated?.forEach((elem) => {
                        elementFullRelated = this.searchElementsInElement(elem, elementFullRelated);
                    });
                    elementFullRelated?.rects?.forEach((item: Element) => {
                        this.addElemClass(item, [mode]);
                    });
                    elementFullRelated?.points?.forEach((item: Element) => {
                        this.addElemClass(item, [mode]);
                    });
                    elementFullRelated?.texts?.forEach((item: Element) => {
                        this.addElemClass(item, [`${mode}-text`]);
                    });
                    elementFullRelated?.arrows?.forEach((item: Element) => {
                        this.addElemClass(item, [`${mode}-arrow`]);
                    });
                    if (elementFullRelated?.circle) {
                        this.addElemClass(elementFullRelated?.circle, [mode]);
                    }

                    if (elementRelated.getAttribute('id').includes('line')) {
                        this.addElemClass(elementRelated, [mode]);
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

    // Добавляет отслеживание клика на элементе
    private addElementClickListener(element: Element, elementFull: IElementFull): void {
        if (elementFull?.flag) {
            elementFull.flag = false;

            if (
                'name' in elementFull.metaFile ||
                'productName' in elementFull.metaFile ||
                'linkId' in elementFull.metaFile
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
            this.mvpService.redirectMnemonic(elementFull.metaFile.linkId);
            this.elementActive(elementFull);
            if (typeof elementFull.metaFile.related === 'object') {
                elementFull.metaFile?.related?.forEach((value) => {
                    const element = this.elementsMap.get(value);
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
        if (!this.hasElemClass(line, `${elementFull?.metaFile?.code}`)) {
            this.addElemClass(line, [`${elementFull?.metaFile?.code}`, 'active']);
        } else {
            const count = this.countElementsInClassList(line);
            if (count > 1) {
                this.removeElemClass(line, [`${elementFull.metaFile.code}`]);
            } else {
                this.removeElemClass(line, [`${elementFull.metaFile.code}`, 'active']);
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
            if (!this.hasElemClass(item, `${relatedOrNormal?.metaFile?.code}`)) {
                this.addElemClass(item, [`${relatedOrNormal?.metaFile?.code}`, active]);
                if ('productName' in relatedOrNormal.metaFile && !element) {
                    this.mvpService.openPopup(this.dataPark, relatedOrNormal?.metaFile?.code);
                }
            } else {
                const count = this.countElementsInClassList(item);
                if (count > 1) {
                    this.removeElemClass(item, [`${relatedOrNormal?.metaFile?.code}`]);
                } else {
                    this.removeElemClass(item, [`${relatedOrNormal?.metaFile?.code}`, active]);
                }
                if ('productName' in relatedOrNormal?.metaFile && !element) {
                    if (this.mvpService?.isOpenPopup) {
                        this.mvpService?.closePopup();
                    }
                }
            }
        });
        elementFull.points.forEach((item) => {
            if (!this.hasElemClass(item, `${relatedOrNormal?.metaFile?.code}`)) {
                this.addElemClass(item, [`${relatedOrNormal?.metaFile?.code}`, active]);
            } else {
                const count = this.countElementsInClassList(item);
                if (count > 1) {
                    this.removeElemClass(item, [`${relatedOrNormal?.metaFile?.code}`]);
                } else {
                    this.removeElemClass(item, [`${relatedOrNormal?.metaFile?.code}`, active]);
                }
            }
        });
        elementFull.texts.forEach((item) => {
            if (!this.hasElemClass(item, `${relatedOrNormal?.metaFile?.code}`)) {
                this.addElemClass(item, [`${relatedOrNormal?.metaFile?.code}`, `${active}-text`]);
            } else {
                const count = this.countElementsInClassList(item);
                if (count > 1) {
                    this.removeElemClass(item, [`${relatedOrNormal?.metaFile?.code}`]);
                } else {
                    this.removeElemClass(item, [`${relatedOrNormal?.metaFile?.code}`, `${active}-text`]);
                }
            }
        });
        elementFull.arrows.forEach((item) => {
            if (!this.hasElemClass(item, `${relatedOrNormal?.metaFile?.code}`)) {
                this.addElemClass(item, [`${relatedOrNormal?.metaFile?.code}`, `${active}-arrow`]);
            } else {
                const count = this.countElementsInClassList(item);
                if (count > 1) {
                    this.removeElemClass(item, [`${relatedOrNormal?.metaFile?.code}`]);
                } else {
                    this.removeElemClass(item, [`${relatedOrNormal?.metaFile?.code}`, `${active}-arrow`]);
                }
            }
        });

        if (!this.hasElemClass(elementFull.circle, `${relatedOrNormal?.metaFile?.code}`)) {
            this.addElemClass(elementFull.circle, [`${relatedOrNormal?.metaFile?.code}`, active]);
        } else {
            const count = this.countElementsInClassList(elementFull?.circle);
            if (count > 1) {
                this.removeElemClass(elementFull?.circle, [`${relatedOrNormal?.metaFile?.code}`]);
            } else {
                this.removeElemClass(elementFull?.circle, [`${relatedOrNormal?.metaFile?.code}`, active]);
            }
        }
        this.toggleElemClass(elementFull?.textPercent, 'active-text');
        this.toggleElemClass(elementFull?.textValue, 'active-text');
    }

    addTextToElem(element: Element, text: string): void {
        if (element?.children) {
            const children = Array.from(element?.children);

            if (text === '') {
                children?.forEach((child: Element) => {
                    this.setTspanText(child, text);
                });
            }
            if (text.length > 13) {
                if (children.length > 1) {
                    this.setTspanText(children[0], text.slice(0, 13));
                    this.setTspanText(children[1], text.slice(13));
                } else {
                    this.setTspanText(children[0], text);
                }
            } else {
                this.setTspanText(children[0], text);
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

    // Проверяет, является ли элемент 4 типом
    private isElemOfFourthType(element: Element): boolean {
        return element?.id?.includes('-4_');
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

    // Присв
    private setTspanText(element: Element, text: string): void {
        if (element) {
            this.renderer.setProperty(element, 'innerHTML', text);
        }
    }
}

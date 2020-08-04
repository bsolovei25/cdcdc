import {
    Component, ElementRef,
    Inject,
    OnDestroy,
    OnInit,
    QueryList,
    Renderer2,
    ViewChildren
} from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';

export interface IMnemonic {
    id: number;
    name: string;
    value: number;
    engUnits: string;
    description?: string;
    deviation?: number;
    deviationName?: string;
    deviationFact?: number;
    deviationModel?: number;
    deviationEngUnits?: string;
}

export interface IModalIcon {
    id: number;
    x: number;
    y: number;
    callBack: () => void;
    isVisible: boolean;
}


@Component({
    selector: 'evj-cd-mat-balance',
    templateUrl: './cd-mat-balance.component.html',
    styleUrls: ['./cd-mat-balance.component.scss']
})
export class CdMatBalanceComponent extends WidgetPlatform implements OnInit, OnDestroy {

    data: IMnemonic[] = [
        {
            id: 2,
            name: 'dsad',
            value: 200.9,
            engUnits: 'м³/ч',
            deviation: -6.6,
            deviationName: 'FIRCA0955',
            deviationFact: 75,
            deviationModel: 55,
            deviationEngUnits: 'м3/ч'
        },
        {
            id: 3,
            name: 'dsad',
            value: 20,
            engUnits: 'м³/ч'
        },
        {
            id: 4,
            name: 'dsad',
            value: 200.9,
            engUnits: 'ºС',
            deviation: -7.6,
            deviationName: 'FIRCA0956',
            deviationFact: 55,
            deviationModel: 89,
            deviationEngUnits: 'м3/ч'
        }
    ];

    modalIcons: IModalIcon[] = [];

    isSelectedEl: number;

    @ViewChildren('.svg__circle') viewChildren!: QueryList<ElementRef>;

    constructor(
        protected widgetService: WidgetService,
        private renderer2: Renderer2,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
        this.draw();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
    }

    private draw(): void {
        this.drawValue();
        this.drawCircle();
        this.drawEngUnits();

    }

    drawModal(x: number, y: number, deviation: number = 0,
              deviationName: string = '',
              deviationFact: number = 0,
              deviationModel: number = 0,
              deviationEngUnits: string = ''): void {
        const modal = document.querySelector('.svg__modal');
        this.renderer2.removeClass(modal, 'svg__modal--visible');
        const modalTexts = document.querySelectorAll('.svg__modal__text');
        modalTexts.forEach((text) => {
            switch (text.getAttribute('id-modal-text')) {
                case '1':
                    this.renderer2.setProperty(text, 'textContent', deviationName);
                    break;
                case '2':
                    this.renderer2.setProperty(text, 'textContent', deviationFact);
                    break;
                case '3':
                    this.renderer2.setProperty(text, 'textContent', deviationModel);
                    break;
                case '4':
                    this.renderer2.setProperty(text, 'textContent', deviation);
                    break;
                case '5':
                    this.renderer2.setProperty(text, 'textContent', deviationEngUnits);
                    break;
                default:
                    console.log('Нет текста');
            }
        });
        this.renderer2.setAttribute(modal, 'x', String(x - 78));
        this.renderer2.setAttribute(modal, 'y', String(y - 122));
        this.renderer2.addClass(modal, 'svg__modal--visible');
    }

    drawCircle(): void {
        const circles = document.querySelectorAll('.svg__circle');
        circles.forEach(circle => {
            const id = circle.getAttribute('id-circle');
            const elDeviation = this.data.find(val => val.id === +id)?.deviation;
            if (elDeviation) {
                this.renderer2.addClass(circle, 'svg__circle--deviation');
                this.addCircleDeviation(+id, +circle.getAttribute('cx'), +circle.getAttribute('cy'));
            }
        });
    }

    clickIcon(id: number, x: number, y: number): void {
        if (this.isSelectedEl === id) {
            this.isSelectedEl = null;
        } else {
            this.disabledOrEnableCircle(false, this.isSelectedEl);
            this.isSelectedEl = id;
            const el = this.data.find(val => val.id === id);
            this.disabledOrEnableCircle(true, id);
            this.drawModal(x, y, el.deviation, el.deviationName, el.deviationFact, el.deviationModel, el.deviationEngUnits);
        }

    }

    addCircleDeviation(id: number, x: number, y: number, callBack?: () => null): void {
        const locX = x - 28;  // Разница в svg
        const locY = y - 7;
        this.modalIcons.push({
            id, x: locX, y: locY, callBack: () => {
                this.clickIcon(id, x, y);
            }, isVisible: true
        });
    }

    disabledOrEnableCircle(disabled: boolean, id: number): void {
        const circles = document.querySelectorAll('.svg__circle');
        const texts = document.querySelectorAll('.svg__circle__value');
        const engUnits = document.querySelectorAll('.svg__circle__eng-units');

        circles.forEach((circle) => {
            const idEl = circle.getAttribute('id-circle');
            if (id === +idEl) {
                if (disabled) {
                    this.renderer2.addClass(circle, 'svg__circle--disabled');
                } else {
                    this.renderer2.removeClass(circle, 'svg__circle--disabled');
                }
            }
        });
        texts.forEach((text) => {
            const idEl = text.getAttribute('id-text');
            if (id === +idEl) {
                if (disabled) {
                    this.renderer2.addClass(text, 'svg__circle__value--disabled');
                } else {
                    this.renderer2.removeClass(text, 'svg__circle__value--disabled');
                }
            }
        });
        engUnits.forEach((engUnit) => {
            const idEl = engUnit.getAttribute('id-eng-units');
            if (id === +idEl) {
                this.renderer2.addClass(engUnit, 'svg__circle__eng-units--disabled');
            } else {
                this.renderer2.removeClass(engUnit, 'svg__circle__eng-units--disabled');
            }
        });

        this.modalIcons.map(value => {
            if (value.id === id) {
                if (disabled) {
                    value.isVisible = false;
                } else {
                    value.isVisible = true;
                }
            }
        });
    }

    drawEngUnits(): void {
        const engUnits = document.querySelectorAll('.svg__circle__eng-units');
        engUnits.forEach(text => {
            const id = text.getAttribute('id-eng-units');
            const valueEngUnits = this.data.find(val => val.id === +id)?.engUnits;
            if (valueEngUnits) {
                const textCount = text.textContent.length;
                let x = +text.getAttribute('x');
                if (textCount === 2) {
                    x = x + 6;
                } else {
                    x = x + 10;
                }
                const letterValue = valueEngUnits.length;
                const finalX = this.calculationAxisX(x, 2.4 * letterValue);
                this.renderer2.setAttribute(text, 'x', finalX);
                this.renderer2.setProperty(text, 'textContent', valueEngUnits);
            }
        });
    }

    drawValue(): void {
        const texts = document.querySelectorAll('.svg__circle__value');
        texts.forEach(text => {
            const id = text.getAttribute('id-text');
            const el = this.data.find(val => val.id === +id);
            let value = 0;
            if (el?.value) {
                value = el?.value;
            }
            const textCount = text.textContent.length;
            let x = +text.getAttribute('x');
            if (textCount === 4) {
                x = x + 8;
            } else {
                x = x + 10;
            }
            const letterValue = String(value).length * 1.8;
            const finalX = this.calculationAxisX(x, letterValue);
            this.renderer2.setAttribute(text, 'x', finalX);
            this.renderer2.setProperty(text, 'textContent', value);
        });
    }

    private calculationAxisX(x: number, letterSize: number): string {
        const axisX = x - letterSize;
        return axisX.toFixed();
    }

}

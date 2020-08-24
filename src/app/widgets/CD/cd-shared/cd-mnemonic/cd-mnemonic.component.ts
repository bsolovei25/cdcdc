import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { CdMatBalanceService } from '../../../../dashboard/services/widgets/CD/cd-mat-balance.service';
import { ISensors } from '../../cd-mat-balance/cd-mat-balance.component';

export interface IMnemonic {
    id: number;
    name: string;
    value: number;
    engUnits: string;
    description: string;
    deviation: number;
    max: number;
    min: number;
    modelValue: number;
}

export interface IModalIcon {
    id: number;
    x: number;
    y: number;
    callBack: () => void;
    isVisible: boolean;
    isDown: boolean;
}

@Component({
    selector: 'evj-cd-mnemonic',
    templateUrl: './cd-mnemonic.component.html',
    styleUrls: ['./cd-mnemonic.component.scss']
})
export class CdMnemonicComponent implements OnInit {
    @Input() set dataRef(value: ISensors[]) {
        if (value) {
            console.log(value);
            this.data = value;
            this.draw();
        }
    }

    engUnits: boolean = false;

    data: ISensors[] = [];

    modalIcons: IModalIcon[] = [];
    isSelectedEl: { id: number, modal: 'top-right' | 'top-left' | 'down-right', deviation: number };

    constructor(private renderer2: Renderer2, private cdMatBalanceService: CdMatBalanceService) {
    }

    ngOnInit(): void {
    }

    private draw(): void {
        this.drawCircle();
        // if (!this.engUnits) {
        this.engUnits = true;
        this.drawValue();
        // this.drawEngUnits();
        // }
    }

    drawModal(
        x: number,
        y: number,
        deviation: number = 0,
        deviationName: string = '',
        deviationFact: number = 0,
        deviationModel: number = 0,
        deviationEngUnits: string = ''
    ): void {
        let isModal: 'top-right' | 'top-left' | 'down-right' = 'top-right';
        let isDeviation: { x: number, y: number } = { x: 55, y: 100 };
        if (x > 900) {
            isModal = 'top-left';
            isDeviation = { x: 275, y: 100 };
        }
        if (y < 100) {
            isModal = 'down-right';
            isDeviation = { x: 55, y: 13 };
        }
        this.isSelectedEl.modal = isModal;
        this.isSelectedEl.deviation = deviation;
        const modal = document.querySelector(`.svg__modal--${isModal}`);
        const modalTexts = document.querySelectorAll('.svg__modal__text');
        const modalTextsTooltip = document.querySelectorAll('.svg__modal__text__tooltip');
        modalTextsTooltip.forEach((text) => {
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

        modalTexts.forEach((text) => {
            const deviationNameSplice = deviationName.slice(0, 12) + (deviationName.length > 12 ? '...' : '');
            switch (text.getAttribute('id-modal-text')) {
                case '1':
                    this.renderer2.setProperty(text, 'textContent', deviationNameSplice);
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
        this.renderer2.setAttribute(modal, 'x', String(x - isDeviation.x));
        this.renderer2.setAttribute(modal, 'y', String(y - isDeviation.y));
        this.renderer2.addClass(modal, `svg__modal--${isModal}--visible`);
    }

    closeModal(): void {
        this.disabledOrEnableCircle(false, this.isSelectedEl);
        const modal = document.querySelector(`.svg__modal--${this.isSelectedEl?.modal}`);
        if (modal) {
            this.renderer2.removeClass(modal, `svg__modal--${this.isSelectedEl?.modal}--visible`);
        }
        this.isSelectedEl = null;
    }

    drawCircle(): void {
        this.modalIcons = [];
        const circles = document.querySelectorAll('.svg__circle');
        circles.forEach((circle) => {
            const id = circle.getAttribute('id-circle');
            this.renderer2?.removeClass(circle, 'svg__circle--deviation');
            const elDeviation = this.data.find((val) => val.id === +id)?.deviation;
            console.log(elDeviation);
            if (elDeviation) {
                const dev = elDeviation <= 0 ? true : false;
                this.renderer2.addClass(circle, 'svg__circle--deviation');
                this.addCircleDeviation(
                    +id,
                    +circle.getAttribute('cx'),
                    +circle.getAttribute('cy'),
                    dev
                );
            }
        });
    }

    clickIcon(id: number, x: number, y: number): void {
        if (this.isSelectedEl?.id === id) {
            this.isSelectedEl = null;
        } else {
            this.closeModal();
            this.cdMatBalanceService.showDeviation.next(id);
            this.disabledOrEnableCircle(false, this.isSelectedEl);
            const el = this.data.find((val) => val.id === id);
            this.isSelectedEl = { id, modal: 'top-right', deviation: +el?.deviation?.toFixed() };
            this.disabledOrEnableCircle(true, this.isSelectedEl);
            this.drawModal(
                x,
                y,
                +el?.deviation.toFixed(),
                el?.description,
                +el?.modelValue.toFixed(),
                +el?.value.toFixed(),
                el?.engUnits
            );
        }
    }

    addCircleDeviation(id: number, x: number, y: number, isDown: boolean = false, callBack?: () => null): void {
        const locX = x - 28; // Разница в svg
        const locY = y - 7;
        this.modalIcons.push({
            id,
            x: locX,
            y: locY,
            callBack: () => {
                this.clickIcon(id, x, y);
            },
            isVisible: (this.isSelectedEl?.id !== id) ? true : false,
            isDown
        });
    }

    disabledOrEnableCircle(disabled: boolean, el: { id: number, modal: 'top-right' | 'top-left' | 'down-right' }): void {
        const circles = document.querySelectorAll('.svg__circle');
        const texts = document.querySelectorAll('.svg__circle__value');
        const engUnits = document.querySelectorAll('.svg__circle__eng-units');

        circles.forEach((circle) => {
            const idEl = circle.getAttribute('id-circle');
            if (el?.id === +idEl) {
                if (disabled) {
                    this.renderer2.addClass(circle, 'svg__circle--disabled');
                } else {
                    this.renderer2.removeClass(circle, 'svg__circle--disabled');
                }
            }
        });
        texts.forEach((text) => {
            const idEl = text.getAttribute('id-text');
            if (el?.id === +idEl) {
                if (disabled) {
                    this.renderer2.addClass(text, 'svg__circle__value--disabled');
                } else {
                    this.renderer2.removeClass(text, 'svg__circle__value--disabled');
                }
            }
        });
        engUnits.forEach((engUnit) => {
            const idEl = engUnit.getAttribute('id-eng-units');
            if (el?.id === +idEl) {
                if (disabled) {
                    this.renderer2.addClass(engUnit, 'svg__circle__eng-units--disabled');
                } else {
                    this.renderer2.removeClass(engUnit, 'svg__circle__eng-units--disabled');
                }
            }
        });

        this.modalIcons.map((value) => {
            if (value.id === el?.id) {
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
        engUnits.forEach((text) => {
                const id = text.getAttribute('id-eng-units');
                const valueEngUnits = this.data.find((val) => val.id === +id)?.engUnits;
                if (valueEngUnits) {
                    let x = +text.getAttribute('x');
                    if (text.textContent.trim() === 'м³/ч') {
                        x = x + 10;
                    }
                    if (text.textContent.trim() === 'ºС') {
                        x = x + 3;
                    }
                    const finalX = this.calculationAxisX(x);
                    this.renderer2.setAttribute(text, 'x', finalX);
                    this.renderer2.setAttribute(text, 'text-anchor', 'middle');
                    this.renderer2.setProperty(text, 'textContent', valueEngUnits);
                }
            }
        );
    }

    drawValue(): void {
        const texts = document.querySelectorAll('.svg__circle__value');
        texts.forEach((text) => {
            const id = text.getAttribute('id-text');
            const el = this.data.find((val) => val.id === +id);
            let value = 0;
            if (el?.value) {
                value = +el?.value.toFixed(1);
            }
            this.renderer2.setAttribute(text, 'text-anchor', 'middle');
            this.renderer2.setProperty(text, 'textContent', value);
        });
    }

    private calculationAxisX(x: number, letterSize: number = 0): string {
        const axisX = x - letterSize;
        return axisX.toFixed();
    }
}

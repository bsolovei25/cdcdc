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
}

@Component({
    selector: 'evj-cd-mnemonic',
    templateUrl: './cd-mnemonic.component.html',
    styleUrls: ['./cd-mnemonic.component.scss'],
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
    isSelectedEl: number;

    constructor(private renderer2: Renderer2, private cdMatBalanceService: CdMatBalanceService) {}

    ngOnInit(): void {}

    private draw(): void {
        this.drawCircle();
        if (!this.engUnits) {
            this.engUnits = true;
            this.drawValue();
            this.drawEngUnits();
        }
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

    closeModal(): void {
        this.disabledOrEnableCircle(false, this.isSelectedEl);
        const modal = document.querySelector('.svg__modal');
        this.renderer2.removeClass(modal, 'svg__modal--visible');
        this.isSelectedEl = null;
    }

    drawCircle(): void {
        const circles = document.querySelectorAll('.svg__circle');
        circles.forEach((circle) => {
            const id = circle.getAttribute('id-circle');
            const elDeviation = this.data.find((val) => val.id === +id)?.deviation;
            if (elDeviation) {
                this.renderer2.addClass(circle, 'svg__circle--deviation');
                this.addCircleDeviation(
                    +id,
                    +circle.getAttribute('cx'),
                    +circle.getAttribute('cy')
                );
            }
        });
    }

    clickIcon(id: number, x: number, y: number): void {
        if (this.isSelectedEl === id) {
            this.isSelectedEl = null;
        } else {
            this.cdMatBalanceService.showDeviation.next(id);
            this.disabledOrEnableCircle(false, this.isSelectedEl);
            this.isSelectedEl = id;
            const el = this.data.find((val) => val.id === id);
            this.disabledOrEnableCircle(true, id);
            this.drawModal(
                x,
                y,
                +el.deviation.toFixed(),
                el.description,
                +el.modelValue.toFixed(),
                +el.value.toFixed(),
                el.engUnits
            );
        }
    }

    addCircleDeviation(id: number, x: number, y: number, callBack?: () => null): void {
        const locX = x - 28; // Разница в svg
        const locY = y - 7;
        this.modalIcons.push({
            id,
            x: locX,
            y: locY,
            callBack: () => {
                this.clickIcon(id, x, y);
            },
            isVisible: true,
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
                if (disabled) {
                    this.renderer2.addClass(engUnit, 'svg__circle__eng-units--disabled');
                } else {
                    this.renderer2.removeClass(engUnit, 'svg__circle__eng-units--disabled');
                }
            }
        });

        this.modalIcons.map((value) => {
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
        engUnits.forEach((text) => {
            const id = text.getAttribute('id-eng-units');
            const valueEngUnits = this.data.find((val) => val.id === +id)?.engUnits;
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
        texts.forEach((text) => {
            const id = text.getAttribute('id-text');
            const el = this.data.find((val) => val.id === +id);
            let value = 0;
            if (el?.value) {
                value = +el?.value.toFixed(1);
            }
            let textCount = text.textContent.length;
            const dot = text.textContent.includes('.');
            // if (dot) {
            textCount -= 0.5;
            // }
            let x = +text.getAttribute('x');
            x = x + textCount * 1.6;
            // if (textCount === 4) {
            //     x = x + 8;
            // } else {
            //     x = x + 10;
            // }
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

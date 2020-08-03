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
    deviation?: boolean;
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
            deviation: true
        },
        {
            id: 3,
            name: 'dsad',
            value: 20,
            engUnits: 'м³/ч',
            deviation: false
        },
        {
            id: 4,
            name: 'dsad',
            value: 200.9,
            engUnits: 'ºС',
            deviation: true
        }
    ];

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
        this.drawModal();
    }

    drawModal(): void {
        const modal = document.querySelector('.svg__modal');
        const x = 385;
        const y = 627;
        setTimeout(() => {
            this.renderer2.setAttribute(modal, 'x', String(x - 78));
            this.renderer2.setAttribute(modal, 'y', String(y - 122));
            this.renderer2.addClass(modal, 'svg__modal--visible');
        }, 1000);
    }

    drawCircle(): void {
        const circles = document.querySelectorAll('.svg__circle');
        circles.forEach(circle => {
            const id = circle.getAttribute('id-circle');
            const elDeviation = this.data.find(val => val.id === +id)?.deviation;
            if (elDeviation) {
                this.renderer2.addClass(circle, 'svg__circle--deviation');
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
            const value = '2';
            const textCount = text.textContent.length;
            let x = +text.getAttribute('x');
            if (textCount === 4) {
                x = x + 7;
            } else {
                x = x + 9;
            }
            const letterValue = value.length * 1.6;
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

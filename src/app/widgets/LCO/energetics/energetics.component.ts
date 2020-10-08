import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import {
    IEnergeticsEndsLine,
    IEnergeticsCoordinates,
    IEnergeticsLimits,
    IEnergeticsGraph,
    IEnergeticsCard,
    IEnergeticsCircleDiagram,
} from 'src/app/dashboard/models/energetics';
import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';

@Component({
    selector: 'evj-energetics',
    templateUrl: './energetics.component.html',
    styleUrls: ['./energetics.component.scss'],
})
export class EnergeticsComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {

    /* Приблизительная структура, получаемая с бека */

    public data: IEnergeticsGraph = {
        plan: 1000, // план
        lowerBorder: 0.03, // нижняя граница (отклонение в процентах от плана)
        higherBorder: 0.1, // верхняя граница (отклонение в процентах от плана)
        curValue: 1070, // текущее значение
        maxValue: 1500, // максимальное значение (для отрисовки графика)

        /* Вычислить при получении данных */
        // lowerValue = this.data.plan * (1 - this.data.lowerBorder);
        // higherValue = this.data.plan * (1 + this.data.higherBorder);

        lowerValue: 1000 * (1 - 0.03),
        higherValue: 1000 * (1 + 0.1),
    };

    /* Данные с сервера для карточек */

    // термо-карточка
    public termoCard: IEnergeticsCard = {
        plan: 1000, // план
        curValue: 623, // текущее значение
        deviation1: 142.8, // значение отклонения [тыс. Гкал]
        deviation2: 0.1, // значение отклонения [Гкал/тонн]
    };

    // электро-карточка
    public electroCard: IEnergeticsCard = {
        plan: 1500, // план
        curValue: 1230, // текущее значение
        deviation1: 17.7, // значение отклонения [млн. кВт/ч]
        deviation2: 49.9, // значение отклонения [кВт*ч/тонн]
    };

    // топливная-карточка
    public fuelCard: IEnergeticsCard = {
        plan: 2500, // план
        curValue: 2690, // текущее значение
        deviation1: 85.3, // значение отклонения [тыс.т.у.т]
        deviation2: 59.9, // значение отклонения [кг.у.т/тонн]
    };

    /* Параметры для круговых диаграмм */

    public energyCircleDiagram: IEnergeticsCircleDiagram = {
        lowerLimit: 97, // нижний предел на диаграмме в %
        upperLimit: 103, // верхний предел на диаграмме в %
        termo: 102, // процентная доля тепловой энергии
        electro: 87, // процентная доля электро энергии
        fuel: 125, // процентная доля топлива
    };

    public isTermoCardDanger: boolean = false;
    public isElectroCardDanger: boolean = false;
    public isFuelCardDanger: boolean = false;

    /* Цвета для диаграмм */

    public colorMain: string = '#1b1e27';
    public colorBg: string = '#0d1014';
    public colorNormal: string = '#a2e2ff';
    public colorFull: string = '#FFFFFF';
    public colorDeviation: string = '#F4A321';

    /* Координаты центров окружностей */

    public centerX: string = '25';
    public centerY: string = '25';

    /* Радиусы диаграмм */

    public fuelRadius: string = (15.91549430918954).toString();
    public electroRadius: string = (15.91549430918954 + 3).toString();
    public termoRadius: string = (15.91549430918954 + 6).toString();
    public radPoint: string = '0.8';

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'energetics';
        this.widgetUnits = 'гДж';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        this.data = ref;
        this.data.curValue = ref.currentValue;
        this.data.lowerBorder = Math.abs(this.data.lowerBorder - this.data.plan) / this.data.plan;
        this.data.higherBorder = Math.abs(this.data.higherBorder - this.data.plan) / this.data.plan;
        this.data.lowerValue = this.data.plan * (1 - this.data.lowerBorder);
        this.data.higherValue = this.data.plan * (1 + this.data.higherBorder);
        this.energyCircleDiagram = ref.circleDiagram;
        this.termoCard = ref.termoCard;
        this.termoCard.curValue = ref.termoCard.currentValue;
        this.electroCard = ref.electroCard;
        this.electroCard.curValue = ref.electroCard.currentValue;
        this.fuelCard = ref.fuelCard;
        this.fuelCard.curValue = ref.fuelCard.currentValue;

        if (this.termoCard.plan < this.termoCard.curValue) {
            this.isTermoCardDanger = true;
        } else {
            this.isTermoCardDanger = false;
        }
        if (this.electroCard.plan < this.electroCard.curValue) {
            this.isElectroCardDanger = true;
        } else {
            this.isElectroCardDanger = false;
        }
        if (this.fuelCard.plan < this.fuelCard.curValue) {
            this.isFuelCardDanger = true;
        } else {
            this.isFuelCardDanger = false;
        }
    }

    private checkDangerCard(cardData: IEnergeticsCard, dangerFlag: string): void {
        if (cardData.plan < cardData.curValue) {
            EnergeticsComponent[dangerFlag] = true;
        } else {
            EnergeticsComponent[dangerFlag] = false;
        }
    }

    /* Отрисовка линейных графиков в карточках */

    drawGraph(obj: IEnergeticsCard): string {
        return ((obj.curValue / obj.plan) * 100 * 0.8).toString() + '%';
    }

    fillGraph(obj: IEnergeticsCard): string {
        return obj.plan - obj.curValue > 0 ? this.colorNormal : this.colorDeviation;
    }

    /* Отрисовка дуговых диаграмм */

    diaCounter(r: string): string {
        const c: number = 2 * Math.PI * +r;
        return 0.75 * c + ' ' + 0.25 * c;
    }

    diaLine(r: string, line: number): string {
        const c: number = 2 * Math.PI * +r;
        const percent: number = line / 100;
        let lineLength: number = percent * 0.5 * c;
        if (lineLength > 0.75 * c) {
            lineLength = 0.75 * c;
        }
        return lineLength + ' ' + (c - lineLength);
    }

    diaOffset(r: string, line: number): string {
        const c: number = 2 * Math.PI * +r;
        const percent: number = line / 100;
        let lineLength: number = percent * 0.5 * c;
        if (lineLength > 0.75 * c) {
            lineLength = 0.75 * c;
        }
        return (-0.75 * c + lineLength).toString();
    }

    diaLimits(line: number): IEnergeticsLimits {
        const newLine = 100 - line; // отсчет угла от 100%
        const t = (Math.PI * newLine) / 100 + Math.PI / 2;
        const rMin = 13;
        const rMax = 25;
        const limitLine: IEnergeticsLimits = {
            x1: (rMin * Math.cos(t) + +this.centerX).toString(),
            y1: (rMin * Math.sin(t) + +this.centerY).toString(),
            x2: (rMax * Math.cos(t) + +this.centerX).toString(),
            y2: (rMax * Math.sin(t) + +this.centerY).toString(),
        };
        return limitLine;
    }

    diaLimitsLabels(line: number, isLowerLimit: boolean = false): IEnergeticsCoordinates {
        const coords = this.diaLimits(line);
        let returnedCoords: IEnergeticsCoordinates;
        if (isLowerLimit) {
            returnedCoords = {
                x: (+coords.x2 - 5).toString(),
                y: (+coords.y2 + 2).toString(),
            };
        } else {
            returnedCoords = {
                x: coords.x2,
                y: (+coords.y2 + 2).toString(),
            };
        }
        return returnedCoords;
    }

    diaFill(percent: number): string {
        if (percent < this.energyCircleDiagram.lowerLimit) {
            return this.colorDeviation;
        }
        if (
            percent >= this.energyCircleDiagram.lowerLimit &&
            percent < this.energyCircleDiagram.upperLimit
        ) {
            return this.colorNormal;
        }
        if (percent === this.energyCircleDiagram.upperLimit) {
            return this.colorFull;
        }
        if (percent > this.energyCircleDiagram.upperLimit) {
            return this.colorDeviation;
        }
    }

    diaEndsLine(line: number, rad: string): IEnergeticsEndsLine {
        let newLine = 100 - line + +this.radPoint; // отсчет угла от 100%
        if (newLine < -50) {
            newLine = -50 + +this.radPoint * 2;
        }
        const t = (Math.PI * newLine) / 100 + Math.PI / 2;
        const r = +rad;
        const limitLine: IEnergeticsEndsLine = {
            xCen: (r * Math.cos(t) + +this.centerX).toString(),
            yCen: (r * Math.sin(t) + +this.centerY).toString(),
        };
        return limitLine;
    }
}

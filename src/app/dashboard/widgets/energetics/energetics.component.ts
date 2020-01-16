import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';

@Component({
    selector: 'evj-energetics',
    templateUrl: './energetics.component.html',
    styleUrls: ['./energetics.component.scss'],
})
export class EnergeticsComponent implements OnInit {
    aboutWidget;

    static itemCols = 18;
    static itemRows = 14;

    subscription: Subscription;

    /* Приблизительная структура, получаемая с бека */

    data = {
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
    termoCard = {
        plan: 1000, // план
        curValue: 623, // текущее значение
        deviation1: 142.8, // значение отклонения [тыс. Гкал]
        deviation2: 0.1, // значение отклонения [Гкал/тонн]
    };

    // электро-карточка
    electroCard = {
        plan: 1500, // план
        curValue: 1230, // текущее значение
        deviation1: 17.7, // значение отклонения [млн. кВт/ч]
        deviation2: 49.9, // значение отклонения [кВт*ч/тонн]
    };

    // топливная-карточка
    fuelCard = {
        plan: 2500, // план
        curValue: 2690, // текущее значение
        deviation1: 85.3, // значение отклонения [тыс.т.у.т]
        deviation2: 59.9, // значение отклонения [кг.у.т/тонн]
    };

    /* Параметры для круговых диаграмм */

    energyCircleDiagram = {
        lowerLimit: 97, // нижний предел на диаграмме в %
        upperLimit: 103, // верхний предел на диаграмме в %
        termo: 102, // процентная доля тепловой энергии
        electro: 87, // процентная доля электро энергии
        fuel: 125, // процентная доля топлива
    };

    /* Цвета для диаграмм */

    colorMain = '#1b1e27';
    colorBg = '#0d1014';
    colorNormal = '#a2e2ff';
    colorFull = '#FFFFFF';
    colorDeviation = '#F4A321';

    /* Координаты центров окружностей */

    centerX = '25';
    centerY = '25';

    /* Радиусы диаграмм */

    fuelRadius = (15.91549430918954).toString();
    electroRadius = (15.91549430918954 + 3).toString();
    termoRadius = (15.91549430918954 + 6).toString();
    radPoint = '0.8';

    public title;

    constructor(
        private widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscription = this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
            this.title = data.title;
            // this.code = data.code;
            // this.units = data.units;
            // this.name = data.name;
        });
    }

    ngOnInit() {}

    /* Отрисовка линейных графиков в карточках */

    drawGraph(obj): string {
        return ((obj.curValue / obj.plan) * 100 * 0.8).toString() + '%';
    }

    fillGraph(obj): string {
        return obj.plan - obj.curValue > 0 ? this.colorNormal : this.colorDeviation;
    }

    /* Отрисовка дуговых диаграмм */

    diaCounter(r: string): string {
        const c: number = 2 * Math.PI * +r;
        return 0.75 * c + ' ' + 0.25 * c;
    }

    diaLine(r: string, line: number): string {
        const c: number = 2 * Math.PI * +r;
        const per_cent = line / 100;
        return per_cent * 0.5 * c + ' ' + (c - per_cent * 0.5 * c);
    }

    diaOffset(r: string, line: number): string {
        const c: number = 2 * Math.PI * +r;
        const per_cent = line / 100;
        return (-0.75 * c + per_cent * 0.5 * c).toString();
    }

    diaLimits(line: number) {
        const newLine = 100 - line; // отсчет угла от 100%
        const t = (Math.PI * newLine) / 100 + Math.PI / 2;
        const rMin = 13;
        const rMax = 25;
        const limitLine = {
            x1: (rMin * Math.cos(t) + +this.centerX).toString(),
            y1: (rMin * Math.sin(t) + +this.centerY).toString(),
            x2: (rMax * Math.cos(t) + +this.centerX).toString(),
            y2: (rMax * Math.sin(t) + +this.centerY).toString(),
        };
        return limitLine;
    }

    diaLimitsLabels(line: number, isLowerLimit: boolean = false) {
        const coords = this.diaLimits(line);
        let returnedCoords;
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

    diaFill(percent: number) {
        if (percent < this.energyCircleDiagram.lowerLimit) return this.colorDeviation;
        if (
            percent >= this.energyCircleDiagram.lowerLimit &&
            percent < this.energyCircleDiagram.upperLimit
        )
            return this.colorNormal;
        if (percent === this.energyCircleDiagram.upperLimit) return this.colorFull;
        if (percent > this.energyCircleDiagram.upperLimit) return this.colorDeviation;
    }

    diaEndsLine(line: number, rad: string) {
        const newLine = 100 - line + +this.radPoint; // отсчет угла от 100%
        const t = (Math.PI * newLine) / 100 + Math.PI / 2;
        const r = +rad;
        const limitLine = {
            xCen: (r * Math.cos(t) + +this.centerX).toString(),
            yCen: (r * Math.sin(t) + +this.centerY).toString(),
        };
        return limitLine;
    }
}

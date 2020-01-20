import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { NewWidgetService } from '../../services/new-widget.service';
import { Subscription } from 'rxjs';
import {
    EnergyCircleDiagram,
    Production,
    SemicircleEnergy,
    CenterCoords,
    LimitLine,
} from '../../models/semicircle-energy';

@Component({
    selector: 'evj-semicircle-energy',
    templateUrl: './semicircle-energy.component.html',
    styleUrls: ['./semicircle-energy.component.scss'],
})
export class SemicircleEnergyComponent implements OnInit, OnDestroy {
    /* Параметры для круговых диаграмм */

    energyCircleDiagram: EnergyCircleDiagram = {
        lowerLimit: 0, // нижний предел на диаграмме в %
        upperLimit: 0, // верхний предел на диаграмме в %
        production1: 0, // процентная доля Пр-во1
        production2: 0, // процентная доля Пр-во2
        production3: 0, // процентная доля Товарное
        production4: 0, // процентная доля ОЗХ
    };

    public lowerLimit: number = 97;
    public upperLimit: number = 103;

    public iconType: number;

    productionList: Production[] = [
        {
            name: '',
            plan: 0,
            fact: 0,
        },
        {
            name: '',
            plan: 0,
            fact: 0,
        },
        {
            name: '',
            plan: 0,
            fact: 0,
        },
        {
            name: '',
            plan: 0,
            fact: 0,
        },
    ];

    /* Цвета для диаграмм */

    public colorMain: string = '#1b1e27';
    public colorBg: string = '#0d1014';
    public colorNormal: string = '#a2e2ff';
    public colorFull: string = '#FFFFFF';
    public colorDeviation: string = '#F4A321';

    /* Координаты центров окружностей */

    public centerX: string = '25';
    public centerY: string = '30';

    /* Радиусы диаграмм */

    public radProd4: string = (15.91549430918954).toString();
    public radProd3: string = (15.91549430918954 + 3).toString();
    public radProd2: string = (15.91549430918954 + 6).toString();
    public radProd1: string = (15.91549430918954 + 9).toString();
    public radPoint: string = '0.8';

    public diagramLogo: string;
    public diagramLogoDanger: string;
    public isWarning: boolean = false;

    public title: string;
    public units: string = 'кг/м^3';
    public widgetType: string = 'semicircle-energy';
    public previewTitle: string = 'semicircle-energy';
    public code: string = '';

    subscriptions: Subscription[] = [];

    static itemCols: number = 14;
    static itemRows: number = 11;

    constructor(
        private widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscriptions.push(
            this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
                if(data){
                    this.title = data.title;
                    this.code = data.code;
                }
                // this.units = data.units;
                // this.name = data.name;
            })
        );
    }

    ngOnInit(): void {
        if (!this.isMock) {
            this.subscriptions.push(
                this.widgetService
                    .getWidgetLiveDataFromWS(this.id, this.widgetType)
                    .subscribe((data: SemicircleEnergy) => {
                        this.iconType = data.iconType;
                        this.lowerLimit = data.lowerLimit;
                        this.upperLimit = data.upperLimit;
                        this.productionList = data.items.slice();
                        // TODO
                        for (const el of this.productionList) {
                            if (el.fact > 120) {
                                el.fact = 120;
                            } else if (el.fact < 0) {
                                el.fact = 0;
                            }
                        }
                        this.logoType();
                        this.warningControl();
                        this.drawDiagram();
                    })
            );
        }
    }

    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach((subscription) => subscription.unsubscribe());
        }
    }

    drawDiagram(): void {
        let key: string;
        for (let i = 0; i < 4; i++) {
            key = 'production' + (i + 1);
            this.energyCircleDiagram[key] = this.productionList[i]
                ? (this.productionList[i].fact / this.productionList[i].plan) * 100
                : undefined;
        }
        this.energyCircleDiagram.lowerLimit = this.lowerLimit ? this.lowerLimit : 97;
        this.energyCircleDiagram.upperLimit = this.upperLimit ? this.upperLimit : 103;
    }

    logoType(): void {
        switch (this.iconType) {
            case 0:
                this.diagramLogo = '../../../../assets/icons/widgets/energetics/electro.svg';
                this.diagramLogoDanger =
                    '../../../../assets/icons/widgets/energetics/electro_danger.svg';
                return;
            case 1:
                this.diagramLogo = '../../../../assets/icons/widgets/energetics/termo.svg';
                this.diagramLogoDanger =
                    '../../../../assets/icons/widgets/energetics/termo_danger.svg';
                return;
            case 2:
                this.diagramLogo = '../../../../assets/icons/widgets/energetics/fuel.svg';
                this.diagramLogoDanger =
                    '../../../../assets/icons/widgets/energetics/fuel_danger.svg';
                return;
        }
    }

    warningControl(): void {
        let key: string;
        for (let i = 0; i < 4; i++) {
            key = 'production' + (i + 1);
            if (
                this.energyCircleDiagram[key] &&
                (this.energyCircleDiagram[key] < this.lowerLimit ||
                    this.energyCircleDiagram[key] > this.upperLimit)
            ) {
                this.isWarning = true;
                return;
            }
            this.isWarning = false;
        }
    }

    /* Отрисовка дуговых диаграмм */

    diaCounter(r: string): string {
        const c: number = 2 * Math.PI * +r;
        return 0.5 * c + ' ' + 0.5 * c;
    }

    diaLine(r: string, line: number): string {
        line = line > 133 ? (line = 133) : line < 0 ? (line = 0) : line;
        const c: number = 2 * Math.PI * +r;
        const percent = line / 100;
        return ((percent * 3) / 8) * c + ' ' + (1 - (percent * 3) / 8) * c;
    }

    diaOffset(r: string, line: number): string {
        const c: number = 2 * Math.PI * +r;
        return (0.5 * c).toString();
    }

    diaLimits(line: number): LimitLine {
        const newLine = 100 - line; // отсчет угла от 100%
        const t = (((1.5 * Math.PI) / 2) * newLine) / 100 + (2.5 * Math.PI) / 2;
        const rMin = 13.7;
        const rMax = 27.3;
        const limitLine: LimitLine = {
            x1: (-rMin * Math.cos(t) + +this.centerX).toString(),
            y1: (rMin * Math.sin(t) + +this.centerY).toString(),
            x2: (-rMax * Math.cos(t) + +this.centerX).toString(),
            y2: (rMax * Math.sin(t) + +this.centerY).toString(),
        };
        return limitLine;
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

    diaEndsLine(line: number, rad: string): CenterCoords {
        const newLine = 100 - line + +this.radPoint; // отсчет угла от 100%
        const t = (((1.5 * Math.PI) / 2) * newLine) / 100 + (2.5 * Math.PI) / 2;
        const r = +rad;
        const centerOfTheEnd: CenterCoords = {
            xCen: (-r * Math.cos(t) + +this.centerX).toString(),
            yCen: (r * Math.sin(t) + +this.centerY).toString(),
        };
        return centerOfTheEnd;
    }
}

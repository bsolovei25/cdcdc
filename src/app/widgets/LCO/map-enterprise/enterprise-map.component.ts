import {
    Component,
    OnInit,
    Inject,
    AfterViewInit,
    ViewChild,
    ElementRef,
    OnDestroy,
} from '@angular/core';

import { IEnterpriseMap } from 'src/app/dashboard/models/enterprise-map';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';

export interface IBuilding {
    id: number;
    name: string;
}

interface IValue {
    x: string;
    y: string;
    width?: string;
    height?: string;
    class: string;
    value: number | string;
}

const bulds: IBuilding[] = [
    {
        id: 1,
        name: 'Факельная установка(вод.тушение)',
    },
    {
        id: 4,
        name: 'АБ-городок Промфинстрой',
    },
    {
        id: 10,
        name: 'ОПС-14',
    },
    {
        id: 11,
        name: 'Установка УУГ',
    },
    {
        id: 18,
        name: 'ОПС-13',
    },
    {
        id: 23,
        name: 'Установка УПА',
    },
    {
        id: 31,
        name: 'ТАМЭ',
    },
    {
        id: 42,
        name: 'ОПС-8',
    },
    {
        id: 24,
        name: 'АБК-4 Автоматика-Сервис',
    },
    {
        id: 26,
        name: 'ЭЛОУ-2',
    },
    {
        id: 30,
        name: 'Реагентное хозяйство',
    },
    {
        id: 33,
        name: 'ОПС-9',
    },
    {
        id: 43,
        name: 'ГОБКК',
    },
    {
        id: 35,
        name: 'Здание ТП-10 УГЭ',
    },
    {
        id: 37,
        name: 'ОПС-10',
    },
    {
        id: 38,
        name: 'УПБ',
    },
    {
        id: 39,
        name: 'ПКК-75/24',
    },
    {
        id: 40,
        name: 'Раздаточный блок',
    },
    {
        id: 41,
        name: 'Здание Промжелдортранс',
    },
    {
        id: 46,
        name: 'ОПС 11',
    },
    {
        id: 44,
        name: 'ОПС-12',
    },
    {
        id: 32,
        name: 'ОПС-7',
    },
    {
        id: 49,
        name: 'БОВ №5',
    },
    {
        id: 50,
        name: 'УПВ',
    },
    {
        id: 51,
        name: 'БОВ №4',
    },
    {
        id: 48,
        name: 'ЗМОС',
    },
    {
        id: 52,
        name: 'Г-43-107',
    },
    {
        id: 55,
        name: 'ЦОК-3',
    },
    {
        id: 54,
        name: 'УОСЩС',
    },
    {
        id: 56,
        name: 'УПС',
    },
    {
        id: 57,
        name: 'ОПС-6',
    },
    {
        id: 58,
        name: 'ОПС-15',
    },
    {
        id: 59,
        name: 'ЛЧ-24-5',
    },
    {
        id: 60,
        name: 'Изомеризация',
    },
    {
        id: 62,
        name: 'ДЕ-100',
    },
    {
        id: 63,
        name: 'Котельная 4007',
    },
    {
        id: 64,
        name: 'АБК пр-ва 1',
    },
    {
        id: 65,
        name: 'ЛЧ-24-2000',
    },
    {
        id: 66,
        name: 'БОВ-6',
    },
    {
        id: 67,
        name: 'АСН',
    },
    {
        id: 68,
        name: 'ГРС',
    },
    {
        id: 78,
        name: 'ОПС 5',
    },
    {
        id: 77,
        name: 'ХВО',
    },
    {
        id: 76,
        name: 'ЛЧ-35/11-1000',
    },
    {
        id: 74,
        name: 'КЦА',
    },
    {
        id: 92,
        name: 'ОПС 4',
    },
    {
        id: 89,
        name: 'МТБЭ',
    },
    {
        id: 83,
        name: 'ЛЧ-22/4',
    },
    {
        id: 84,
        name: 'ГФУ-2',
    },
    {
        id: 82,
        name: 'ЭЛОУ АВТ-6',
    },
    {
        id: 72,
        name: 'АТ-ВБ',
    },
    {
        id: 81,
        name: 'АВТ-3',
    },
    {
        id: 80,
        name: 'ОПС 2',
    },
    {
        id: 79,
        name: 'БОВ-2',
    },
    {
        id: 69,
        name: 'БОС',
    },
    {
        id: 25,
        name: 'Насосная тит.1094',
    },
];

@Component({
    selector: 'evj-enterprise-map',
    templateUrl: './enterprise-map.component.html',
    styleUrls: ['./enterprise-map.component.scss'],
})
export class EnterpriseMapComponent extends WidgetPlatform<unknown>
    implements OnInit, OnDestroy, AfterViewInit {
    values: IValue[] = [];
    data: IEnterpriseMap = {
        build: [
            { id: 58, name: 'УУГ', options: { nonCritical: 200, diagnostics: 6, prognosis: 2 } },
            { id: 4, name: 'УУГ', options: { nonCritical: 200, diagnostics: 6, prognosis: 2 } },
            {
                id: 13,
                name: 'Станция смешения',
                options: { nonCritical: 0, diagnostics: 68, prognosis: 0 },
            },
            {
                id: 15,
                name: 'Станция смешения',
                options: { nonCritical: 0, diagnostics: 0, prognosis: 20 },
            },
            {
                id: 21,
                name: 'Станция смешения',
                options: { nonCritical: 11, diagnostics: 0, prognosis: 20 },
            },
            {
                id: 24,
                name: 'Станция смешения',
                options: { nonCritical: 0, diagnostics: 10, prognosis: 20 },
            },
            { id: 26, name: 'ДТ', options: { nonCritical: 0, diagnostics: 0, prognosis: 20 } },
            { id: 29, name: 'ДТ', options: { nonCritical: 0, diagnostics: 0, prognosis: 48 } },
            { id: 36, name: 'ДТ', options: { nonCritical: 0, diagnostics: 29, prognosis: 20 } },
            { id: 38, name: 'ДТ', options: { nonCritical: 1, diagnostics: 0, prognosis: 20 } },
            { id: 41, name: 'Бензин', options: { nonCritical: 25, diagnostics: 6, prognosis: 2 } },
        ],
        weather: { temperature: 15, direction: 320, wind: 5.1, pressure: 741 },
    };

    @ViewChild('maps') maps: ElementRef;

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'map';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    ngAfterViewInit(): void {
        if (!this.isMock) {
            this.draw();
        }
    }

    protected dataHandler(ref: any): void {
        // this.data = ref;
    }

    private draw(): void {
        this.settingsCompass();

        const buildings = document.querySelectorAll('.build');

        buildings.forEach((b) => {
            let options: {
                nonCritical: number;
                diagnostics: number;
                prognosis: number;
            } | null;
            const dataId = b.getAttribute('data-id');
            const idx: number = this.data.build.findIndex((d) => d.id === +dataId);
            if (idx !== -1) {
                options = this.data.build[idx].options;
            }
            if (options) {
                const allOptions: number =
                    options.diagnostics + options.nonCritical + options.prognosis;
                const widthNumber: number = allOptions.toString().length;
                if (b.tagName === 'polygon' || b.tagName === 'polyline') {
                    const id = b.getAttribute('data-id');
                    const dataPolygon = [
                        { id: 1, x: `${256 - widthNumber * 6}`, y: '29' },
                        { id: 6, x: '543', y: '29' },
                        { id: 7, x: `${182 - widthNumber * 6}`, y: '88' },
                        { id: 8, x: `${257 - widthNumber * 6}`, y: '88' },
                        { id: 12, x: '526', y: '89' },
                        { id: 13, x: `${182 - widthNumber * 6}`, y: '144' },
                        { id: 18, x: '605', y: '145' },
                        { id: 19, x: `${182 - widthNumber * 6}`, y: '203' },
                        { id: 25, x: '604', y: '238' },
                        { id: 35, x: `${510 - widthNumber * 6}`, y: '348' },
                        { id: 42, x: '835', y: '348' },
                        { id: 50, x: '797', y: '442' },
                        { id: 57, x: '597', y: '510' },
                        { id: 58, x: '597', y: '577' },
                    ];
                    const idxPolygon: number = dataPolygon.findIndex((i) => i.id === +id);
                    if (idxPolygon !== -1) {
                        this.values.push({
                            x: dataPolygon[idxPolygon].x.toString(),
                            y: dataPolygon[idxPolygon].y.toString(),
                            class: 'number',
                            value: allOptions ? allOptions : '',
                        });
                    }
                }
                const xBuild = b.getAttribute('x');
                const yBuild = b.getAttribute('y');
                const widthBuild = b.getAttribute('width');

                const x = (+xBuild + +widthBuild - widthNumber * 6).toString();
                const y = (+yBuild + 10).toString();
                const width = b.getAttribute('width');
                const height = b.getAttribute('height');

                this.values.push({
                    x,
                    y,
                    width,
                    height,
                    class: 'number',
                    value: allOptions ? allOptions : '',
                });

                if (options.nonCritical !== 0) {
                    b.classList.add('status-nonCritical');
                } else if (options.diagnostics !== 0) {
                    b.classList.add('status-diagnostics');
                } else if (options.prognosis !== 0) {
                    b.classList.add('status-prognosis');
                }

                const textArray = document.querySelectorAll('.text');

                textArray.forEach((tx) => {
                    if (+dataId === +tx.getAttribute('data-id')) {
                        if (options.nonCritical !== 0) {
                            tx.classList.add('text-nonCritical');
                        } else if (options.diagnostics !== 0) {
                            tx.classList.add('text-diagnostics');
                        } else if (options.prognosis !== 0) {
                            tx.classList.add('text-prognosis');
                        }
                    }
                });
            } else {
                b.classList.add(`status-standard`);
            }
        });
    }

    private settingsCompass(): void {
        const data = this.data.weather.direction;
        const lines = document.querySelectorAll('.compass-line');
        const values = document.querySelectorAll('.compass__value');
        lines.forEach((line) => {
            line.setAttribute(
                'style',
                `transform: translate(874.21px, 472.66px)
                 rotate(${data}deg);transform-origin: 61px 86px 0`
            );
        });

        let atr = '';
        if (data >= 0 && data <= 11) {
            atr = 'N';
        }
        if (data >= 12 && data <= 33) {
            atr = 'NNE';
        }
        if (data >= 34 && data <= 56) {
            atr = 'NE';
        }
        if (data >= 57 && data <= 78) {
            atr = 'ENE';
        }
        if (data >= 79 && data <= 101) {
            atr = 'E';
        }
        if (data >= 102 && data <= 123) {
            atr = 'ESE';
        }
        if (data >= 124 && data <= 146) {
            atr = 'SE';
        }
        if (data >= 147 && data <= 168) {
            atr = 'SSE';
        }
        if (data >= 169 && data <= 191) {
            atr = 'S';
        }
        if (data >= 192 && data <= 213) {
            atr = 'SSW';
        }
        if (data >= 214 && data <= 236) {
            atr = 'SW';
        }
        if (data >= 237 && data <= 258) {
            atr = 'WSW';
        }
        if (data >= 259 && data <= 281) {
            atr = 'W';
        }
        if (data >= 282 && data <= 303) {
            atr = 'WNW';
        }
        if (data >= 304 && data <= 326) {
            atr = 'NW';
        }
        if (data >= 327 && data <= 348) {
            atr = 'NNW';
        }
        if (data >= 349 && data <= 360) {
            atr = 'N';
        }
        values.forEach((value) => {
            value.append(atr);
            value.setAttribute('x', `${937 - atr.length * 5}`);
        });
    }
}

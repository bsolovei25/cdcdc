import {
    Component,
    OnInit,
    Inject,
    AfterViewInit,
    ViewChild,
    ElementRef,
    OnDestroy,
} from '@angular/core';

import { NewWidgetService } from '../../services/new-widget.service';
import { NewUserSettingsService } from '../../services/new-user-settings.service';
import { Subscription } from 'rxjs';

export interface IEnterpriseMap {
    build: {
        id: number;
        name: string;
        options: {
            nonCritical: number;
            diagnostics: number;
            prognosis: number;
        };
    }[];
    weather: {
        temperature: number;
        wind: number;
        direction: number;
        pressure: number;
    };
}

export interface IBuilding {
    id: number;
    name: string;
}

const bulds: IBuilding[] = [
    {
        id: 1,
        name: 'Факельная установка(вод.тушение)'
    },
    {
        id: 4,
        name: 'АБ-городок Промфинстрой'
    },
    {
        id: 10,
        name: 'ОПС-14'
    },
    {
        id: 11,
        name: 'Установка УУГ'
    },
    {
        id: 18,
        name: 'ОПС-13'
    },
    {
        id: 23,
        name: 'Установка УПА'
    },
    {
        id: 31,
        name: 'ТАМЭ'
    },
    {
        id: 42,
        name: 'ОПС-8'
    },
    {
        id: 24,
        name: 'АБК-4 Автоматика-Сервис'
    },
    {
        id: 26,
        name: 'ЭЛОУ-2'
    },
    {
        id: 30,
        name: 'Реагентное хозяйство'
    },
    {
        id: 33,
        name: 'ОПС-9'
    },
    {
        id: 43,
        name: 'ГОБКК'
    },
    {
        id: 35,
        name: 'Здание ТП-10 УГЭ'
    },
    {
        id: 37,
        name: 'ОПС-10'
    },
    {
        id: 38,
        name: 'УПБ'
    },
    {
        id: 39,
        name: 'ПКК-75/24'
    },
    {
        id: 40,
        name: 'Раздаточный блок'
    },
    {
        id: 41,
        name: 'Здание Промжелдортранс'
    },
    {
        id: 46,
        name: 'ОПС 11'
    },
    {
        id: 44,
        name: 'ОПС-12'
    },
    {
        id: 32,
        name: 'ОПС-7'
    },
    {
        id: 49,
        name: 'БОВ №5'
    },
    {
        id: 50,
        name: 'УПВ'
    },
    {
        id: 51,
        name: 'БОВ №4'
    },
    {
        id: 48,
        name: 'ЗМОС'
    },
    {
        id: 52,
        name: 'Г-43-107'
    },
    {
        id: 55,
        name: 'ЦОК-3'
    },
    {
        id: 54,
        name: 'УОСЩС'
    },
    {
        id: 56,
        name: 'УПС'
    },
    {
        id: 57,
        name: 'ОПС-6'
    },
    {
        id: 58,
        name: 'ОПС-15'
    },
    {
        id: 59,
        name: 'ЛЧ-24-5'
    },
    {
        id: 60,
        name: 'Изомеризация'
    },
    {
        id: 62,
        name: 'ДЕ-100'
    },
    {
        id: 63,
        name: 'Котельная 4007'
    },
    {
        id: 64,
        name: 'АБК пр-ва 1'
    },
    {
        id: 65,
        name: 'ЛЧ-24-2000'
    },
    {
        id: 66,
        name: 'БОВ-6'
    },
    {
        id: 67,
        name: 'АСН'
    },
    {
        id: 68,
        name: 'ГРС'
    },
    {
        id: 78,
        name: 'ОПС 5'
    },
    {
        id: 77,
        name: 'ХВО'
    },
    {
        id: 76,
        name: 'ЛЧ-35/11-1000'
    },
    {
        id: 74,
        name: 'КЦА'
    },
    {
        id: 92,
        name: 'ОПС 4'
    },
    {
        id: 89,
        name: 'МТБЭ'
    },
    {
        id: 83,
        name: 'ЛЧ-22/4'
    },
    {
        id: 84,
        name: 'ГФУ-2'
    },
    {
        id: 82,
        name: 'ЭЛОУ АВТ-6'
    },
    {
        id: 72,
        name: 'АТ-ВБ'
    },
    {
        id: 81,
        name: 'АВТ-3'
    },
    {
        id: 80,
        name: 'ОПС 2'
    },
    {
        id: 79,
        name: 'БОВ-2'
    },
    {
        id: 69,
        name: 'БОС'
    },
    {
        id: 25,
        name: 'Насосная тит.1094'
    },
];

@Component({
    selector: 'evj-enterprise-map',
    templateUrl: './enterprise-map.component.html',
    styleUrls: ['./enterprise-map.component.scss'],
})
export class EnterpriseMapComponent implements OnInit, OnDestroy, AfterViewInit {
    title: string = '';

    values: any[] = [];

    public previewTitle: string;

    data: IEnterpriseMap = {
        build: [
            { id: 1, name: 'УУГ', options: { nonCritical: 2, diagnostics: 6, prognosis: 2 } },
            {
                id: 10,
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
        weather: { temperature: 15, direction: 0, wind: 5.1, pressure: 741 },
    };

    svgData: any[] = [];

    @ViewChild('maps', { static: false }) maps: ElementRef;

    static itemCols = 30;
    static itemRows = 21;
    private subscription: Subscription;

    constructor(
        public userSettings: NewUserSettingsService,
        public widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscription = this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
            this.title = data.title;
            this.previewTitle = data.widgetType;
        });

    }

    ngOnInit() {

        bulds.map(val => console.log(val)
        );
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

    }

    ngAfterViewInit() {
        if (!this.isMock) {
            this.draw();
        }
    }

    private settingsCompass() {
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
        if (data >= 12 && data <= 33) {
            atr = 'NNE';
        }
        if (data >= 34 && data <= 56) {
            atr = 'NE';
        }
        if (data >= 34 && data <= 56) {
            atr = 'ENE';
        }
        if (data >= 57 && data <= 78) {
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
        if (data >= 349 && data <= 11) {
            atr = 'N';
        }
        values.forEach((value) => {
            value.append(atr);
            value.setAttribute('x', `${930 - (atr.length * 2 + 5)}`);
        });
    }

    draw() {
        const buildings = document.querySelectorAll('.build');
        const textArray = document.querySelectorAll('.text');
        this.settingsCompass();

        buildings.forEach((b) => {
            let value:
                | {
                    nonCritical: number;
                    diagnostics: number;
                    prognosis: number;
                }
                | undefined;
            const dataId = b.getAttribute('data-id');
            const idx: number = this.data.build.findIndex((d) => d.id === +dataId);
            if (idx !== -1) {
                value = this.data.build[idx].options;
            }
            if (value) {
                const allBuild: number = value.diagnostics + value.nonCritical + value.prognosis;
                const widthNumber: number = allBuild.toString().length;

                if (b.tagName === 'polygon') {
                    const id = b.getAttribute('data-id');
                    const dataPolygon = [
                        { id: 1, x: `${196 - (widthNumber * 6 + 5)}`, y: '102' },
                        { id: 7, x: '626', y: '192' },
                        { id: 8, x: `${196 - (widthNumber * 6 + 5)}`, y: '129' },
                        { id: 17, x: `${116 - (widthNumber * 6 + 5)}`, y: '193' },
                        { id: 34, x: '854', y: '354' },
                        { id: 36, x: `${239 - (widthNumber * 6 + 5)}`, y: '424' },
                        { id: 42, x: `${838 - (widthNumber * 6 + 5)}`, y: '424' },
                    ];
                    const idx = dataPolygon.findIndex((i) => i.id === +id);
                    if (idx !== -1) {
                        this.values.push({
                            x: dataPolygon[idx].x,
                            y: dataPolygon[idx].y,
                            class: 'number',
                            value: allBuild ? allBuild : '',
                        });
                    }
                }

                const xBuild = b.getAttribute('x');
                const yBuild = b.getAttribute('y');
                const widthBuild = b.getAttribute('width');

                const x = +xBuild + +widthBuild - (widthNumber * 6 + 5);
                const y = +yBuild + 14;
                const width = b.getAttribute('width');
                const height = b.getAttribute('height');

                this.values.push({
                    x,
                    y,
                    width,
                    height,
                    class: 'number',
                    value: allBuild ? allBuild : '',
                });

                textArray.forEach((tx) => {
                    if (+dataId === +tx.getAttribute('data-id')) {
                        if (value.nonCritical !== 0) {
                            tx.classList.add('text-nonCritical');
                        } else if (value.diagnostics !== 0) {
                            tx.classList.add('text-diagnostics');
                        } else if (value.prognosis !== 0) {
                            tx.classList.add('text-prognosis');
                        }
                        if (allBuild === 0) {
                            tx.classList.add(`text-standard`);
                        }
                    }
                });

                if (value.nonCritical !== 0) {
                    b.classList.add('status-nonCritical');
                } else if (value.diagnostics !== 0) {
                    b.classList.add('status-diagnostics');
                } else if (value.prognosis !== 0) {
                    b.classList.add('status-prognosis');
                }
                if (allBuild === 0) {
                    b.classList.add(`status-standard`);
                }
            } else {
                b.classList.add(`status-standard`);
            }
        });
    }
}

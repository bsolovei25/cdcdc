import { Component, OnInit, Inject, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

import { NewWidgetService } from '../../services/new-widget.service';
import { NewUserSettingsService } from '../../services/new-user-settings.service';
import { Subscription } from 'rxjs';


export interface IEnterpriseMap {
    build: {
        id: number,
        name: string,
        options: {
            nonCritical: number,
            diagnostics: number,
            prognosis: number
        }
    }[],
    weather: {
        temperature: number,
        wind: number,
        direction: number,
        pressure: number
    }

}

@Component({
    selector: 'evj-enterprise-map',
    templateUrl: './enterprise-map.component.html',
    styleUrls: ['./enterprise-map.component.scss']
})
export class EnterpriseMapComponent implements OnInit, OnDestroy, AfterViewInit {

    title: string = '';

    values: any[] = [];

    data: IEnterpriseMap =
        {
            build: [
                { id: 1, name: 'УУГ', options: { nonCritical: 2, diagnostics: 6, prognosis: 2 } },
                { id: 10, name: 'Станция смешения', options: { nonCritical: 0, diagnostics: 68, prognosis: 0 } },
                { id: 15, name: 'Станция смешения', options: { nonCritical: 0, diagnostics: 0, prognosis: 20 } },
                { id: 21, name: 'Станция смешения', options: { nonCritical: 11, diagnostics: 0, prognosis: 20 } },
                { id: 24, name: 'Станция смешения', options: { nonCritical: 0, diagnostics: 10, prognosis: 20 } },
                { id: 26, name: 'ДТ', options: { nonCritical: 0, diagnostics: 0, prognosis: 20 } },
                { id: 29, name: 'ДТ', options: { nonCritical: 0, diagnostics: 0, prognosis: 48 } },
                { id: 36, name: 'ДТ', options: { nonCritical: 0, diagnostics: 29, prognosis: 20 } },
                { id: 38, name: 'ДТ', options: { nonCritical: 1, diagnostics: 0, prognosis: 20 } },
                { id: 41, name: 'Бензин', options: { nonCritical: 25, diagnostics: 6, prognosis: 2 } }],
            weather: { temperature: 15, direction: 20, wind: 5.1, pressure: 741 }
        };

    svgData: any[] = [];

    @ViewChild("maps", { static: false }) maps: ElementRef;

    static itemCols = 30;
    static itemRows = 21;
    private subscription: Subscription;

    constructor(
        public userSettings: NewUserSettingsService,
        public widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string
    ) {
        this.subscription = this.widgetService.getWidgetChannel(this.id).subscribe(data => {
            this.title = data.title;
        });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    ngAfterViewInit() {
        if (!this.isMock) {
            this.draw();
        }
    }

    settingsСompass() {
        const data = this.data.weather.direction;
        const lines = document.querySelectorAll('.compass-line');
        const values = document.querySelectorAll('.compass__value');
        lines.forEach(line => {
            line.setAttribute('style', `transform: translate(834.21px, 486.66px) rotate(${data}deg);transform-origin: 84px 84px 0`);
        })

        let atr = '';
        if (data >= 0 && data <= 90) {
            if (data === 0) {
                atr = 'N';
            } else if (data === 90) {
                atr = 'E';
            } else {
                atr = 'NE';
            }
        }
        if (data >= 91 && data <= 180) {
            if (data === 180) {
                atr = 'S';
            } else {
                atr = 'ES';
            }
        }
        if (data >= 181 && data <= 270) {
            if (data === 270) {
                atr = 'W';
            } else {
                atr = 'SW';
            }
        }
        if (data >= 271 && data <= 359) {
            atr = 'WN';
        }
        values.forEach(value => {
            value.append(atr);
            value.setAttribute('x', `${982 - (atr.length * 2 + 5)}`);
        })

    }

    draw() {
        const buildings = document.querySelectorAll('.build');
        const textArray = document.querySelectorAll('.text');
        this.settingsСompass();

        buildings.forEach(b => {
            let value: {
                nonCritical: number,
                diagnostics: number,
                prognosis: number
            } | undefined;
            const dataId = b.getAttribute('data-id');
            const idx: number = this.data.build.findIndex(d => d.id === +dataId);
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
                        { id: 42, x: `${838 - (widthNumber * 6 + 5)}`, y: '424' }
                    ];
                    const idx = dataPolygon.findIndex(i => i.id === +id);
                    if (idx !== -1) {
                        this.values.push({ x: dataPolygon[idx].x, y: dataPolygon[idx].y, class: 'number', value: allBuild ? allBuild : '' })
                    }
                }

                const xBuild = b.getAttribute('x');
                const yBuild = b.getAttribute('y');
                const widthBuild = b.getAttribute('width');

                const x = +xBuild + +widthBuild - (widthNumber * 6 + 5);
                const y = +yBuild + 14;
                const width = b.getAttribute('width');
                const height = b.getAttribute('height');

                this.values.push({ x, y, width, height, class: 'number', value: allBuild ? allBuild : '' });

                textArray.forEach(tx => {
                    if (+dataId === +tx.getAttribute('data-id')) {
                        if (value.nonCritical !== 0) {
                            tx.classList.add('text-nonCritical');
                        } else if (value.diagnostics !== 0) {
                            tx.classList.add('text-diagnostics');
                        } else if (value.prognosis !== 0) {
                            tx.classList.add('text-prognosis');
                        } if (allBuild === 0) {
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
                } if (allBuild === 0) {
                    b.classList.add(`status-standard`);
                }
            } else {
                b.classList.add(`status-standard`);
            }
        })
    }

}


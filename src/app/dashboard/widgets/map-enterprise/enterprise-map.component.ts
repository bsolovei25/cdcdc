import { Component, OnInit, Inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { NewWidgetService } from '../../services/new-widget.service';
import { NewUserSettingsService } from '../../services/new-user-settings.service';


export interface IEnterpriseMap {
    id: number,
    name: string,
    options: {
        nonCritical: number,
        diagnostics: number,
        prognosis: number
    }
}

@Component({
    selector: 'evj-enterprise-map',
    templateUrl: './enterprise-map.component.html',
    styleUrls: ['./enterprise-map.component.scss']
})
export class EnterpriseMapComponent implements OnInit, AfterViewInit {

    title: string = "Интегрированный экран критических показателей";


    texts: any[] = [];


    data: IEnterpriseMap[] = [
        { id: 1, name: 'УУГ', options: { nonCritical: 2, diagnostics: 6, prognosis: 2 } },
        { id: 2, name: 'Станция смешения', options: { nonCritical: 0, diagnostics: 40, prognosis: 100 } },
        { id: 3, name: 'ДТ', options: { nonCritical: 2, diagnostics: 100, prognosis: 999 } },
        { id: 4, name: 'Бензин', options: { nonCritical: 444, diagnostics: 8, prognosis: 99 } },
    ]

    svgData: any[] = [];

    static itemCols = 30;
    static itemRows = 20;

    @ViewChild('maps', { static: true }) private mapSvg: ElementRef;

    constructor(
        public userSettings: NewUserSettingsService,
        public widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string
    ) { }

    ngOnInit() {


    }

    ngAfterViewInit() {
        if (!this.isMock) {
            this.draw();
        }

    }

    settingsСompass() {
        const data = { value: 350 }
        const compass: HTMLElement = document.getElementById('compass');
        const line = compass.querySelector('.compass-line');
        const value = compass.querySelector('.compass__value');
        line.setAttribute('style', `transform: translate(834.21px, 486.66px) rotate(${data.value}deg);transform-origin: 84px 84px 0`);

        let atr = '';
        if (data.value >= 0 && data.value <= 90) {
            if (data.value === 0) {
                atr = 'N';
            } else if (data.value === 90) {
                atr = 'E';
            } else {
                atr = 'NE';
            }
        }
        if (data.value >= 91 && data.value <= 180) {
            if (data.value === 180) {
                atr = 'S';
            } else {
                atr = 'ES';
            }
        }
        if (data.value >= 181 && data.value <= 270) {
            if (data.value === 270) {
                atr = 'W';
            } else {
                atr = 'SW';
            }
        }
        if (data.value >= 271 && data.value <= 359) {
            atr = 'WN';
        }
        value.append(atr);
        value.setAttribute('x', `${982 - (atr.length * 2 + 5)}`);
    }

    draw() {

        const map: HTMLElement = document.getElementById('svg5866');
        const buildings = map.querySelectorAll('.build');
        const textArray = map.querySelectorAll('.text');
        this.settingsСompass();
        // const info = map.querySelector('.builds');

        let i = 0;
        buildings.forEach(b => {

            const value: string = '500';
            const widthNumber: number = value.length;

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
                    this.texts.push({ x: dataPolygon[idx].x, y: dataPolygon[idx].y, class: 'number', value })
                }
            }

            i++;
            const id = b.getAttribute('data-id');
            const xBuild = b.getAttribute('x');
            const yBuild = b.getAttribute('y');
            const widthBuild = b.getAttribute('width');


            const x = +xBuild + +widthBuild - (widthNumber * 6 + 5);

            const y = +yBuild + 14;
            const width = b.getAttribute('width');
            const height = b.getAttribute('height');

            this.texts.push({ x, y, width, height, class: 'number', value });

            b.classList.add(`status-standard`);
            if (i > 10 && i < 13) {
                b.classList.remove('status-standard');
                b.classList.add('status-prognosis');
            }
            if (i > 20 && i < 25) {
                b.classList.remove('status-standard');
                b.classList.add('status-diagnostics');
            }

            if (i > 25 && i < 30) {
                b.classList.remove('status-standard');
                b.classList.add('status-nonCritical');
            }

            if (id) {
                const idx = this.data.findIndex(d => d.id === Number(id));
                if (idx !== -1) {
                }
            }
        })

        const idRect = document.getElementById('polygon3921');
        const id = idRect.getAttribute('data-id');

    }



}


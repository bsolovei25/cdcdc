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

    draw() {
        const data = {
            id_0: { price: '3000', status: 'service' },
            id_1: { price: '3000', status: 'available' },
            id_2: { price: '2000', status: 'reserved' },
            id_3: { price: '5000', status: 'available' },
            id_4: { price: '2500', status: 'available' },
            id_5: { price: '2500', status: 'reserved' },
            messages: {
                'available': 'Доступно для аренды',
                'reserved': 'Зарезервировано',
                'service': 'Доступно через 1-2 дня'
            }
        };

        // --------------------------------------------------------------------
        //  Используемые элементы на странице
        // --------------------------------------------------------------------

        const map: HTMLElement = document.getElementById('svg5866');
        // const svg = document.querySelector('svg');
        // const buildingsLayer = map.querySelector('.buildings_layer');
        const buildings = map.querySelectorAll('.build');
        const textArray = map.querySelectorAll('.text');
        // const info = map.querySelector('.builds');

        let i = 0;
        buildings.forEach(b => {

            const value: string = '5';

            if (b.tagName === 'polygon') {
                const id = b.getAttribute('data-id');
                const dataPolygon = [
                    { id: 1, x: '184', y: '102' },
                    { id: 7, x: '626', y: '190' },
                    { id: 8, x: '184', y: '129' },
                    { id: 17, x: '104', y: '193' },
                    { id: 34, x: '854', y: '354' },
                    { id: 36, x: '227', y: '424' },
                    { id: 42, x: '830', y: '425' }
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
            const heightBuild = b.getAttribute('height');


            const widthNumber: number = value.length;

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


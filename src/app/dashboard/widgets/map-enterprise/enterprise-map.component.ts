import { Component, OnInit, Inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { NewWidgetService } from '../../services/new-widget.service';
import { NewUserSettingsService } from '../../services/new-user-settings.service';


@Component({
    selector: 'evj-enterprise-map',
    templateUrl: './enterprise-map.component.html',
    styleUrls: ['./enterprise-map.component.scss']
})
export class EnterpriseMapComponent implements OnInit, AfterViewInit {

    title: string = "Интегрированный экран критических показателей";

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

        const map = document.getElementById('my-map');
        // const svg = document.querySelector('svg');
        // const buildingsLayer = map.querySelector('.buildings_layer');
        const buildings = map.querySelectorAll('.build');
        // const info = map.querySelector('.builds');
        console.log(buildings);


        const idRect = document.getElementById('polygon3921');
        const id = idRect.getAttribute('data-id');

        console.log(id);


        // console.log(map);


        // --------------------------------------------------------------------
        //  Шаг №1: Инициализируем здания и линии от leader-line.js
        // --------------------------------------------------------------------

        // const lines = [];

        // for (let building of buildings) {
        //     const id = building.getAttribute('data-building-id');

        //     const status = data[`id_${id}`].status;
        //     const price = data[`id_${id}`].price;

        //     building.classList.add(`-${status}`);


        //     building.addEventListener('click', () => {
        //         console.log(id);
        //     });

        // }


        // --------------------------------------------------------------------
        //  Шаг №2: Добавляем Hammer.js и перемещение карты
        // --------------------------------------------------------------------

        // const hammertime = new Hammer(buildingsLayer);

        // hammertime.get('pan').set({
        //     direction: Hammer.DIRECTION_ALL
        // });

        // hammertime.get('swipe').set({ enable: false });


        // let translateX = 0;
        // let translateY = 0;


        // hammertime.on('pan', (e) => {
        //     const layer = buildingsLayer.getBoundingClientRect();
        //     const parent = svg.getBoundingClientRect();

        //     const offsets = {
        //         top: layer.top - parent.top,
        //         bottom: layer.bottom - parent.bottom,
        //         right: layer.right - parent.right,
        //         left: layer.left - parent.left,
        //     };

        //     const speedX = e.velocityX * 20;
        //     const speedY = e.velocityY * 20;

        //     if (speedX > 0 && offsets.left < 0) {
        //         if (speedX < -offsets.left) {
        //             translateX += speedX;
        //         } else {
        //             translateX += -offsets.left * speedX / 100;
        //         }
        //     } else if (speedX < 0 && offsets.right > 0) {
        //         if (speedX > -offsets.right) {
        //             translateX += speedX;
        //         } else {
        //             translateX += offsets.right * speedX / 100;
        //         }
        //     }

        //     if (speedY > 0 && offsets.top < 0) {
        //         if (speedY < -offsets.top) {
        //             translateY += speedY;
        //         } else {
        //             translateY += -offsets.top * speedY / 100;
        //         }
        //     } else if (speedY < 0 && offsets.bottom > 0) {
        //         if (speedY > -offsets.bottom) {
        //             translateY += speedY;
        //         } else {
        //             translateY += offsets.bottom * speedY / 100;
        //         }
        //     }

        //     buildingsLayer.setAttribute('transform', `translate(${translateX} ${translateY})`);
        // });


        // hammertime.on('panstart', (e) => {
        //     lines.forEach((line) => {
        //         line.hide();
        //     });
        // });


        // hammertime.on('panend', (e) => {
        //     lines.forEach((line) => {
        //         line.position();
        //     });
        // });



        // --------------------------------------------------------------------
        //  Не забываем сбрасывать все при изменении размера окна
        // --------------------------------------------------------------------


        // window.addEventListener('resize', () => {
        //    const translateX = 0;
        //    const translateY = 0;

        //     buildingsLayer.setAttribute('transform', `translate(${translateX} ${translateY})`);
        // });


    }



}


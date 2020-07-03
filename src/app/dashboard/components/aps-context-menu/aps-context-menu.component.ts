import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { INavItem } from '../aps-dropdown-menu/aps-dropdown-menu.component';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
    selector: 'evj-aps-context-menu',
    templateUrl: './aps-context-menu.component.html',
    styleUrls: ['./aps-context-menu.component.scss'],
})
export class ApsContextMenuComponent {

    @ViewChild('clickHoverMenuTrigger') clickHoverMenuTrigger: MatMenuTrigger;

    @Input('items')
    public items: INavItem[] = [
        {
            name: 'Администрирование',
            value: 0,
        },
        {
            name: 'Рабочий процесс',
            value: 0,
            children: [
                {
                    name: 'Участники процесса',
                    value: 0,
                },
                {
                    name: 'Действия',
                    value: 0,
                    children: [
                        {
                            name: 'Корректировка объемного плана',
                            value: 0,
                        },
                        {
                            name: 'Корректировка исходных данных',
                            value: 0,
                        },
                        {
                            name: 'Корректировка графика поставки нефти',
                            value: 0,
                        },
                        {
                            name: 'Корректировка графика поставки КГС',
                            value: 0,
                        }
                    ]
                },
                {
                    name: 'Матрица ролей',
                    value: 0,
                },
                {
                    name: 'Согласование графика',
                    value: 0,
                }
            ]
        },
        {
            name: 'Данные СИ',
            value: 0,
            children: [
                {
                    name: 'НСИ',
                    value: 0,
                    children: [
                        {
                            name: 'ЕСУ НСИ',
                            value: 0,
                        },
                        {
                            name: 'КСУ НСИ',
                            value: 0,
                        },
                    ]
                },
                {
                    name: 'Мастер данные',
                    value: 0,
                    children: [
                        {
                            name: 'SAP TOPO',
                            value: 0,
                        },
                        {
                            name: 'LIMS',
                            value: 0,
                        },
                        {
                            name: 'PIMS',
                            value: 0,
                        },
                        {
                            name: 'АС КУБ',
                            value: 0,
                        }
                    ]
                },
                {
                    name: 'Плановые данные',
                    value: 0,
                    children: [
                        {
                            name: 'PIMS',
                            value: 0,
                        },
                    ]
                },
                {
                    name: 'Результаты АСКПП',
                    value: 0,
                },
                {
                    name: 'Фактические данные',
                    value: 0,
                    children: [
                        {
                            name: 'АС КУБ',
                            value: 0,
                        },
                    ]
                },
            ]
        },
        {
            name: 'Ручной ввод',
            value: 0,
            children: [
                {
                    name: 'Мастер данные',
                    value: 0,
                    children: [
                        {
                            name: 'АСКПП',
                            value: 0,
                        },
                    ]
                },
                {
                    name: 'Плановые данные',
                    value: 0,
                    children: [
                        {
                            name: 'АСКПП',
                            value: 0,
                        },
                    ]
                },
            ]
        },
        {
            name: 'Алгоритмы',
            value: 0,
            children: [
                {
                    name: 'Алгоритмы СИ',
                    value: 0,
                },
                {
                    name: 'Ручной ввод',
                    value: 0,
                },
            ]
        }
    ];

    public menuX: number = 0;

    public menuY: number = 0;

    @ViewChild(MatMenuTrigger, {static: false})
    public menu: MatMenuTrigger;

    @ViewChild('container', {static: false})
    public container: ElementRef;

    public triggerContextMenu(event: any): void {
        event.preventDefault();
        this.menu.closeMenu();
        const offsetX = this.container.nativeElement.getBoundingClientRect().x;
        const offsetY = this.container.nativeElement.getBoundingClientRect().y;
        this.menuX = event.clientX - offsetX;
        this.menuY = event.clientY - offsetY;
        this.menu.openMenu();
    }
}

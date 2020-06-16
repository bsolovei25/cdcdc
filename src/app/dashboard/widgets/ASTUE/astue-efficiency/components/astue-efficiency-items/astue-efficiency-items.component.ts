import { Component, OnInit } from '@angular/core';
import { IAsEfCard } from '../../../../../models/ASTUE/astue-efficiency.model';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'evj-astue-efficiency-items',
    templateUrl: './astue-efficiency-items.component.html',
    styleUrls: ['./astue-efficiency-items.component.scss'],
})
export class AstueEfficiencyItemsComponent implements OnInit {
    public data: IAsEfCard[] = [
        {
            name: 'Пар',
        },
        {
            name: 'Азот',
        },
        {
            name: 'Химически очищенная вода',
        },
        {
            name: 'Воздух технический',
        },
        {
            name: 'Воздух КИП',
        },
        {
            name: 'Топливный газ природный',
        },
        {
            name: 'Топливный газ',
        },
        {
            name: 'Вода теплофикации',
        },
    ];

    public cardSelection: SelectionModel<IAsEfCard> = new SelectionModel<IAsEfCard>();

    constructor() {}

    public ngOnInit(): void {
        this.iconMap();
        this.cardSelection.select(this.data[0]);
    }

    public iconMap(): void {
        this.data.forEach((item) => {
            switch (item.name) {
                case 'Пар':
                    item.icon = 'steam';
                    break;
                case 'Азот':
                    item.icon = 'nitrogen';
                    break;
                case 'Химически очищенная вода':
                    item.icon = 'cleaned-water';
                    break;
                case 'Воздух технический':
                    item.icon = 'tech-air';
                    break;
                case 'Воздух КИП':
                    item.icon = 'kip-air';
                    break;
                case 'Топливный газ природный':
                    item.icon = 'nature-gaz';
                    break;
                case 'Топливный газ':
                    item.icon = 'gaz';
                    break;
                case 'Вода теплофикации':
                    item.icon = 'term-water';
                    break;
                default:
                    item.icon = 'steam';
                    break;
            }
        });
    }
}

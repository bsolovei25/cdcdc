import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { IAsEfCard } from '../../../../../models/ASTUE/astue-efficiency.model';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';

@Component({
    selector: 'evj-astue-efficiency-items',
    templateUrl: './astue-efficiency-items.component.html',
    styleUrls: ['./astue-efficiency-items.component.scss'],
})
export class AstueEfficiencyItemsComponent implements OnChanges, OnInit {
    @Input() public data: IAsEfCard[] = [
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

    @Output() private selectProduct: EventEmitter<string> = new EventEmitter<string>();

    public cardSelection: SelectionModel<IAsEfCard> = new SelectionModel<IAsEfCard>();

    private subscriptions: Subscription[] = [];

    constructor() {}

    public ngOnChanges(): void {
        this.iconMap();

        if (this.cardSelection.isEmpty() && this.data.length) {
            this.cardSelection.select(this.data[0]);
        }
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.cardSelection.changed.subscribe((data) => {
                this.selectProduct.emit(data.added[0].name);
            })
        );
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

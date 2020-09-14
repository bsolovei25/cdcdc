import { ITankInformation, ITankCardValue } from './../../dashboard/models/tank-information';
import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';
import { WidgetService } from './../../dashboard/services/widget.service';
import { Inject, Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'evj-nk-tank-information',
    templateUrl: './nk-tank-information.component.html',
    styleUrls: ['./nk-tank-information.component.scss']
})
export class NkTankInformationComponent extends WidgetPlatform implements
    OnInit, OnDestroy, OnChanges {

    cardsData: ITankInformation[] = []; // Вся инфа по карточкам с сервера
    cardsDataFiltered: ITankCardValue[] = []; // Карточки отфильтрованные по type
    filterList: string[] = ['Все резервуары']; // Список доступных фильтров
    selectedFilter: string = 'Все резервуары';

    getFilter(filter: string): void {
        this.selectedFilter = filter;

        this.cardsDataFiltered = [];

        this.cardsData.forEach(item => {
            if ( this.selectedFilter === 'Все резервуары' ) {
                this.cardsDataFiltered = [...this.cardsDataFiltered, ...item.tank];
            } else if (item.type === this.selectedFilter) {
                this.cardsDataFiltered = [...this.cardsDataFiltered, ...item.tank];
            }
        });
    }

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private http: HttpClient
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnChanges(): void {
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    dataHandler(ref: {items: ITankInformation[]}): void {
        this.cardsData = [];
        this.filterList = [];

        // Получаем массив фильтров
        this.filterList = ['Все резервуары', ...Array.from(new Set(ref.items.map(i => i.type)))];

        this.cardsData = [...this.cardsData, ...ref.items];
        // Проверка соответствия фильтров

        if (!this.filterList.includes(this.selectedFilter)) {
            this.selectedFilter = 'Все резервуары';
        }

        // Фильтруем
        this.getFilter(this.selectedFilter);


        ref.items.forEach( (item, i) => {
            if ( !this.filterList.includes(item.type) ) {
                this.filterList.push(item.type);
            }
        });

    }
}

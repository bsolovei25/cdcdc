import { ITankInformation, ITankCardValue } from '@dashboard/models/NK/tank-information';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '@dashboard/services/widget.service';
import { Inject, Component, OnInit, OnDestroy, OnChanges } from '@angular/core';

interface INkTankInformationAttributes {
    IsVideoWall: boolean;
    FilterFrequency: number;
}

@Component({
    selector: 'evj-nk-tank-information',
    templateUrl: './nk-tank-information.component.html',
    styleUrls: ['./nk-tank-information.component.scss'],
})
export class NkTankInformationComponent
    extends WidgetPlatform<INkTankInformationAttributes>
    implements OnInit, OnDestroy, OnChanges {
    private readonly defaultFilterFrequency: number = 30;

    cardsData: ITankInformation[] = []; // Вся инфа по карточкам с сервера
    cardsDataFiltered: ITankCardValue[] = [];
    // Карточки отфильтрованные по name
    filterList: string[] = ['Все резервуары']; // Список доступных фильтров
    selectedFilter: string = 'Все резервуары';

    timer: ReturnType<typeof setTimeout>;
    count: number = 0;

    constructor(
        protected widgetService: WidgetService,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnChanges(): void {}

    ngOnDestroy(): void {
        super.ngOnDestroy();
        clearInterval(this.timer);
    }

    protected dataConnect(): void {
        super.dataConnect();
        const interval = (this.attributes.FilterFrequency ?? this.defaultFilterFrequency) * 1000;

        if (this.attributes.IsVideoWall) {
            this.timer = setInterval(() => {
                this.selectedFilter = this.filterList[this.count % this.filterList.length] ?? 'Все резервуары';
                this.count++;
                this.getFilter(this.selectedFilter);
            }, interval);
        } else {
            clearInterval(this.timer);
        }
    }

    dataHandler(ref: { items: ITankInformation[] }): void {
        this.cardsData = [];
        this.filterList = [];

        // Получаем массив фильтров
        this.filterList = ['Все резервуары', ...Array.from(new Set(ref.items.map((i) => i.name)))];

        this.cardsData = [...this.cardsData, ...ref.items];
        // Проверка соответствия фильтров

        if (!this.filterList.includes(this.selectedFilter)) {
            this.selectedFilter = 'Все резервуары';
        }

        // Фильтруем
        this.getFilter(this.selectedFilter);

        ref.items.forEach((item, i) => {
            if (!this.filterList.includes(item.name)) {
                this.filterList.push(item.name);
            }
        });
    }

    public getFilter(filter: string): void {
        this.selectedFilter = filter;

        this.cardsDataFiltered = [];

        this.cardsData.forEach((item) => {
            if (this.selectedFilter === 'Все резервуары') {
                this.cardsDataFiltered = [...this.cardsDataFiltered, ...item.tank];
            } else if (item.name === this.selectedFilter) {
                this.cardsDataFiltered = [...this.cardsDataFiltered, ...item.tank];
            }
        });
    }
}

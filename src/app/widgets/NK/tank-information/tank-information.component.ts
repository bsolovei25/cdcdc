import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import {
    ITankInformation,
    ITankInformationDtoFn,
    ITankFilter,
    ITankResaultFilter
} from '../../../dashboard/models/tank-information';

@Component({
    selector: 'evj-tank-information',
    templateUrl: './tank-information.component.html',
    styleUrls: ['./tank-information.component.scss']
})
export class TankInformationComponent extends WidgetPlatform implements OnInit, OnDestroy {

    public data: ITankInformation[];

    public dataSave: ITankInformation[];
    public sendFilterData: ITankFilter[] = [];
    public filterData: ITankFilter[] = [];

    isFilter: boolean;

    type: string[] = [];

    temp = false;

    public isFilterTable: boolean = false;

    constructor(
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'reference';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    protected dataHandler(ref: any): void {
        if (this.temp) {
            return;
        }
        this.dataSave = ref.items.map(e => ITankInformationDtoFn(e));
        this.mapData(this.dataSave);
        this.temp = true;
    }

    mapData(data: ITankInformation[]): void {
        if (this.isFilter) {
            this.data = this.mapDataFilter(data);
        } else {
            this.data = data;
        }
        this.mapTypeData(this.dataSave);
    }

    mapTypeData(data: ITankInformation[]): void {
        this.type = [];
        for (const item of data) {
            if (!this.type.includes(item.type)) {
                this.type.push(item.type);
            }
        }
        if (this.type.length > 0) {
            this.sendFilterData = this.mapNameData(data);
        }
    }

    mapNameData(data: ITankInformation[]): ITankFilter[] {
        const array = [];
        this.type.forEach(sType => {
            const arrayNameInType = [];
            data.forEach(item => {
                if (item.type === sType && !arrayNameInType.includes(item.name)) {
                    arrayNameInType.push(item.name);
                }
            });
            const obj = {
                type: sType,
                tanks: arrayNameInType
            };
            array.push(obj);
        });
        return array;
    }

    mapDataFilter(data: ITankInformation[]): ITankInformation[] {
        const array = [];

        for (const item of data) {
            if (this.type.includes(item.type)) {
                const resultFind = this.filterData.find(i => item.type === i.type);
                if (!resultFind) {
                    continue;
                }
                for (const nameTank of resultFind.tanks) {
                    if (item.name === nameTank.name && nameTank.active) {
                        array.push(item);
                    }
                }
            } else {
                array.push(item);
            }
        }

        return array;
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    openFilterTable(event: boolean): void {
        this.isFilterTable = event;
    }

    closeFilter(event: ITankResaultFilter): void {
        this.isFilter = event.filter;
        if (this.isFilter) {
            this.filterData = event.dataFilter;
            this.data = this.mapDataFilter(this.dataSave);
        }
        this.isFilterTable = event.close;
    }
}

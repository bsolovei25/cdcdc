import { Component, OnInit, Input } from '@angular/core';
import { ITransfer } from 'src/app/dashboard/models/petroleum-products-movement.model';
import { PetroleumScreenService } from 'src/app/dashboard/services/widgets/petroleum-screen.service';
import { IUdTableDict } from '../petroleum-reference.component';
import { IFilterSetting } from '../../components/filter-popup/filter-popup.component';

@Component({
    selector: 'evj-info-screen',
    templateUrl: './info-screen.component.html',
    styleUrls: ['./info-screen.component.scss'],
})
export class InfoScreenComponent implements OnInit {
    @Input() title: string[];
    @Input() keys: string[];
    @Input() dictionary: IUdTableDict[] = [];
    @Input() filterSetting: IFilterSetting;

    constructor(public petroleumService: PetroleumScreenService) {}

    ngOnInit(): void {}

    public transferClick(uid: string): void {
        console.log(uid);
        this.petroleumService.chooseTransfer(uid, true);
    }

    public showFilter(item: IUdTableDict): void {
        const itemFilterValue = item.filter.isActive;
        this.dictionary.forEach((el) => {
            el.filter.isActive = false;
        });
        item.filter.isActive = !itemFilterValue;
    }
    public setSortFilter(isUp: boolean, item: IUdTableDict): void {
        this.petroleumService.sortTransfersByColumn(item.key, item.type, isUp);
    }

    public getFilterParams(item: IUdTableDict): IFilterSetting {
        const currentFilter = this.petroleumService.currentFilter;
        const filterSetting: IFilterSetting = {
            isUp: null,
            isDown: null,
            text: null,
        };
        if (item.key === currentFilter?.sortFilter?.key) {
            currentFilter.sortFilter.isUp
                ? filterSetting.isUp = true
                : filterSetting.isDown = true;
        }
        return filterSetting;
    }
}

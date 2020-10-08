import { Component, Input, OnInit, Output } from '@angular/core';
import { IUdTableDict } from '../../petroleum-reference/petroleum-reference.component';
import { ITransfer } from 'src/app/dashboard/models/petroleum-products-movement.model';
import { IFilterSetting } from '../filter-popup/filter-popup.component';
import { PetroleumScreenService } from 'src/app/dashboard/services/widgets/petroleum-screen.service';

@Component({
  selector: 'evj-transfer-table',
  templateUrl: './transfer-table.component.html',
  styleUrls: ['./transfer-table.component.scss']
})
export class TransferTableComponent {
    @Input() dictionary: IUdTableDict[] = [];
    @Input() transfers: ITransfer[] = [];

    constructor(private petroleumService: PetroleumScreenService) { }

    public transferClick(uid: string): void {
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
    public setTextFilter(text: string, item: IUdTableDict): void {
        console.log(text);
        this.petroleumService.filterTransfersByColumn(item.key, text);
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
        if (item.key === currentFilter?.textFilter?.key) {
            filterSetting.text = currentFilter.textFilter.value;
        }
        return filterSetting;
    }
}

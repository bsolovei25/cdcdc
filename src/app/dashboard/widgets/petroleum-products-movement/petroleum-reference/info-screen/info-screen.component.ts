import { Component, OnInit, Input } from '@angular/core';
import { ITransfer } from 'src/app/dashboard/models/petroleum-products-movement.model';
import { PetroleumScreenService } from '../../../../services/petroleum-screen.service';
import { IUdTableDict } from '../petroleum-reference.component';

@Component({
    selector: 'evj-info-screen',
    templateUrl: './info-screen.component.html',
    styleUrls: ['./info-screen.component.scss'],
})
export class InfoScreenComponent implements OnInit {
    @Input() title: string[];
    @Input() keys: string[];
    @Input() dictionary: IUdTableDict[] = [];

    constructor(public petroleumScreenService: PetroleumScreenService) {}

    ngOnInit(): void {}

    public transferClick(uid: string): void {
        console.log(uid);
        this.petroleumScreenService.chooseTransfer(uid, true);
    }

    public showFilter(item: IUdTableDict): void {
        const itemFilterValue = item.filter.isActive;
        this.dictionary.forEach((el) => {
            el.filter.isActive = false;
        });
        item.filter.isActive = !itemFilterValue;
    }
}

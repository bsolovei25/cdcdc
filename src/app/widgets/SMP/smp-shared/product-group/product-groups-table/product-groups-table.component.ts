import {
    Component,
    OnInit,
    Input,
    ChangeDetectorRef,
    ElementRef,
    ViewChild,
    OnChanges,
    ChangeDetectionStrategy,
    AfterViewChecked,
} from '@angular/core';
import { IProductGroups } from '../../../../../dashboard/models/SMP/product-groups.model';

@Component({
    selector: 'evj-product-groups-table',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './product-groups-table.component.html',
    styleUrls: ['./product-groups-table.component.scss'],
})
export class ProductGroupsTableComponent implements OnInit, OnChanges, AfterViewChecked {
    @ViewChild('lines') lines: ElementRef;

    @Input() widgetType: string;
    @Input() data: IProductGroups[];

    public datas: IProductGroups[] = [];

    scrollLine: boolean = false;

    botScrollWidth: number = 0;

    constructor(private cdRef: ChangeDetectorRef) {}

    ngOnInit(): void {}

    ngOnChanges(): void {
        if (this.datas.length > 0) {
            return;
        }
        if (this.data) {
            this.datas = this.map(this.data);
        }
    }

    ngAfterViewChecked(): void {
        try {
            this.botScrollWidth = document.getElementById('botscroll').scrollWidth;
            if (!this.cdRef['destroyed']) {
                this.cdRef.detectChanges();
            }
        } catch (error) {}
    }

    map(data: IProductGroups[]): IProductGroups[] {
        this.datas = [];
        for (const item of data) {
            switch (item.groupName.toLowerCase()) {
                case 'бензины':
                    item.typeImage = 'benzin';
                    this.datas.push(item);
                    break;
                case 'дт':
                    item.typeImage = 'benzin';
                    this.datas.push(item);
                    break;
                case 'тс':
                    item.typeImage = 'plane';
                    this.datas.push(item);
                    break;
                case 'судовое/мазут':
                    item.typeImage = 'ship';
                    this.datas.push(item);
                    break;
                case 'битумы':
                    item.typeImage = 'car';
                    this.datas.push(item);
                    break;
                case 'суг':
                    item.typeImage = 'fire';
                    this.datas.push(item);
                    break;
                case 'ароматика':
                    item.typeImage = 'cube';
                    this.datas.push(item);
                    break;
                default:
                    item.typeImage = 'water';
                    this.datas.push(item);
            }
        }

        return this.datas;
    }

    isClickedFunc(item): void {}

    public isScroll(data): void {
        for (const item of data) {
            if (item.products.length > 5) {
                this.scrollLine = true;
            }
        }
    }

    onTopScroll(event): void {
        document.getElementById('botscroll').scrollLeft = event.currentTarget.scrollLeft;
    }
    onBottomScroll(event): void {
        document.getElementById('topscroll').scrollLeft = event.currentTarget.scrollLeft;
    }

    rowsById(item: IProductGroups): number {
        return item.id;
    }
}

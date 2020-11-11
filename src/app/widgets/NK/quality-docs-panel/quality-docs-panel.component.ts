import { Component, OnInit, Inject, HostListener, OnDestroy } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { ITableGridFilter } from '../../../dashboard/components/table-grid/components/table-grid-filter/table-grid-filter.component';
import { IOilFilter } from '../../../dashboard/models/oil-operations';
import { OilOperationsService } from '../../../dashboard/services/widgets/oil-operations.service';

export interface IQualityDocsRecord {
    id: number;
    numberR: number;
    rR: number;
    pasportId: number;
    date: string; /// DATE
    codeSAP: number;
    product: string[];
    group: string;
    park: string;
    creator: string;
    arm: number;
    blocked?: boolean;
}

@Component({
    selector: 'evj-quality-docs-panel',
    templateUrl: './quality-docs-panel.component.html',
    styleUrls: ['./quality-docs-panel.component.scss']
})
export class QualityDocsPanelComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {

    public filterByProduct: ITableGridFilter<IOilFilter> =
        {
            name: 'Продукты',
            type: 'products-document-panel',
            data: null,
        };

    public filterByProductValue: any;

    public data: IQualityDocsRecord[] = [
        {
            id: 1,
            numberR: 4643,
            rR: 422,
            pasportId: 168,
            date: '25.02.2019 12:23',
            codeSAP: 4324325231268,
            product: [
                'ДТ EВРО сорт F, вид III(ДТ-Е-К5) ДТ ЕВРО',
                'ДТ EВРО сорт F, вид III(ДТ-Е-К5) ДТ ЕВРО'
            ],
            group: 'СУГ',
            park: 'СУГ',
            creator: 'Иванов И.И. Оператор АСУ ТП',
            arm: 3252516436117
        },
        {
            id: 2,
            numberR: 4643,
            rR: 422,
            pasportId: 168,
            date: '25.02.2019 12:23',
            codeSAP: 4324325231268,
            product: [
                'ДТ EВРО сорт F, вид III(ДТ-Е-К5) ДТ ЕВРО',
                'ДТ EВРО сорт F, вид III(ДТ-Е-К5) ДТ ЕВРО',
                'ДТ EВРО сорт F, вид III(ДТ-Е-К5) ДТ ЕВРО'
            ],
            group: 'СУГ',
            park: 'СУГ',
            creator: 'Иванов И.И. Оператор АСУ ТП',
            arm: 3252516436117
        },
        {
            id: 3,
            numberR: 4643,
            rR: 422,
            pasportId: 168,
            date: '25.02.2019 12:23',
            codeSAP: 4324325231268,
            product: [
                'ДТ EВРО сорт F, вид III(ДТ-Е-К5) ДТ ЕВРО',
                'ДТ EВРО сорт F, вид III(ДТ-Е-К5) ДТ ЕВРО'
            ],
            group: 'СУГ',
            park: 'СУГ',
            creator: 'Иванов И.И. Оператор АСУ ТП',
            arm: 3252516436117
        },
        {
            id: 4,
            numberR: 4643,
            rR: 422,
            pasportId: 168,
            date: '25.02.2019 12:23',
            codeSAP: 4324325231268,
            product: [
                'ДТ EВРО сорт F, вид III(ДТ-Е-К5) ДТ ЕВРО',
                'ДТ EВРО сорт F, вид III(ДТ-Е-К5) ДТ ЕВРО'
            ],
            group: 'СУГ',
            park: 'СУГ',
            creator: 'Иванов И.И. Оператор АСУ ТП',
            arm: 3252516436117
        },

    ];

    public isFilter: boolean = false;

    public isTanksInput: boolean = false;
    public isPasportInput: boolean = false;
    public isProductInput: boolean = false;

    constructor(
        public widgetService: WidgetService,
        private oilOperationService: OilOperationsService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.isRealtimeData = false;
        this.widgetIcon = 'reference';
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.getFilterList();
    }

    protected dataHandler(ref: any): void {
        // this.data = ref;
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        this.setStyleScroll();
    }

    public setStyleScroll(): void {
        const scroll = document.getElementById('scrollQualityDocsPanel');
        if (scroll) {
            if (scroll.scrollHeight !== scroll.clientHeight) {
                scroll.classList.remove('scrollON');
                scroll.classList.add('scrollOFF');
            } else {
                scroll.classList.remove('scrollOFF');
                scroll.classList.add('scrollON');
            }
        }
    }

    public openFilter(open: any): void {
        console.log(open);
        /*const value = open.filter ? open.filter.name : null;
        switch (open.type) {
            case 'product':
                this.filterByProductValue = value;
                break;
        }*/
        /*this.getLeftTable().then((result) => {
            this.data.tableLeft = result;
        });
        this.active('isFilter');*/
    }

    public searchRecords(event: Event): void {
    }

    public closeFilter(event: boolean): void {
        this.isFilter = event;
    }

    private async getFilterList(): Promise<void> {
        this.filterByProduct.data = await this.oilOperationService.getFilterList<IOilFilter[]>('products');
    }
}

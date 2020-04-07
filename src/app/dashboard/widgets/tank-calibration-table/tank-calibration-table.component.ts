import { Component, OnInit, Inject, OnDestroy, HostListener, ViewChild, ElementRef } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { WidgetPlatform } from '../../models/widget-platform';
import { SelectionModel } from '@angular/cdk/collections';

interface ICalibrationTable {
    name: string;
    values: {
        name: string;
        startDate: Date;
        endDate: Date;
        action: any;
    }[];
}

@Component({
    selector: 'evj-tank-calibration-table',
    templateUrl: './tank-calibration-table.component.html',
    styleUrls: ['./tank-calibration-table.component.scss'],
})
export class TankCalibrationTableComponent extends WidgetPlatform implements OnInit, OnDestroy {

    columnsToDisplay: string[] = [
        'Наименование',
        'Дата начала калибровки',
        'Дата окончания калибровки',
        'Действия с калибровками'
    ];

    static itemCols: number = 18;
    static itemRows: number = 14;

    expandedElement: SelectionModel<any> = new SelectionModel(true);

    data;
    dataSource: ICalibrationTable[] = [
        {
            name: 'ГФУ-2',
            values: [
                {
                    name: 'Резерв 1213',
                    startDate: new Date(),
                    endDate: new Date(),
                    action: ''
                },
                {
                    name: 'Резерв 2131',
                    startDate: new Date(),
                    endDate: new Date(),
                    action: ''
                }
            ]
        },
        {
            name: 'ГФУ-3',
            values: [
                {
                    name: 'Резерв 1123',
                    startDate: new Date(),
                    endDate: new Date(),
                    action: ''
                },
                {
                    name: 'Резерв 12132',
                    startDate: new Date(),
                    endDate: new Date(),
                    action: ''
                }
            ]
        }
    ];
    endTr = [];

    @HostListener('document:resize', ['$event'])
    OnResize(event) {
        this.blockNeed();
    }

    @ViewChild('tableBody') table: ElementRef;

    constructor(
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        if (ref) {
            this.data = ref;
        }
    }

    getChildrenRows(element: any): any {
        return [...element.values];
    }

    blockNeed() {
        this.endTr = [];
        const heightTemplate = this.dataSource.length * 28;
        const heihtOut = (this.table.nativeElement.clientHeight - heightTemplate) / 28;
        for (let i = 0; i < heihtOut - 1; i++) {
            this.endTr.push(i);
        }
    }


}

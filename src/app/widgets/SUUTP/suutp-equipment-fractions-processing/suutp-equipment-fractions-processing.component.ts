import { Component, OnInit, ChangeDetectionStrategy, Inject } from "@angular/core";
import { Subject } from 'rxjs';
import { WidgetPlatform } from "@dashboard/models/@PLATFORM/widget-platform";
import { WidgetService } from "@dashboard/services/widget.service";

export interface ITableDataRow {
    value: string;
    isWarning?: boolean;
}

export interface ITableData {
    cells: any[];
}

export interface ITableHeaders {
    [key: string]: string;
}

export interface ITableMain {
    headers: ITableHeaders[];
    rows: any[];
    displayedColumns: string[];
}

@Component({
    selector: 'evj-suutp-equipment-fractions-processing',
    templateUrl: './suutp-equipment-fractions-processing.component.html',
    styleUrls: ['./suutp-equipment-fractions-processing.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuutpEquipmentFractionsProcessingComponent  extends WidgetPlatform<unknown> implements OnInit {
    mockData: ITableMain = {
        headers: [
            { name: '', unit: 'id' },
            { name: 'Название переменной', unit: 'name' },
            { name: 'Режим работы', unit: 'workTime' },
            { name: 'Тек. знач. по парамет.', unit: 'value' },
            { name: 'Задание от MV', unit: 'mvValue' },
            { name: 'Прогноз. значение CV', unit: 'cv' },
            { name: 'Нижний предел Верхний предел', unit: 'downValue' },
        ],
        rows: [
            {
                groupName: 'Ч1-231',
            },
            {
                cells: [
                    { value: 'MV1' },
                    { value: 'Расход1 острого орошения К-1 (FIRC0955)' },
                    { value: 'Режим работы' },
                    { value: 'Тек. знач. по парамет.' },
                    { value: 'Задание от MV' },
                    { value: 'Прогноз. значение CV' },
                    { value: 'Нижний предел Верхний предел' },
                ],
            },
            {
                cells: [
                    { value: 'MV2' },
                    { value: 'Расход1 острого орошения К-1 (FIRC0955)' },
                    { value: 'Режим работы' },
                    { value: 'Тек. знач. по парамет.' },
                    { value: 'Задание от MV' },
                    { value: 'Прогноз. значение CV' },
                    { value: 'Нижний предел Верхний предел' },
                ],
            },
            {
                cells: [
                    { value: 'MV3' },
                    { value: 'Расход1 острого орошения К-1 (FIRC0955)' },
                    { value: 'Режим работы' },
                    { value: 'Тек. знач. по парамет.' },
                    { value: 'Задание от MV' },
                    { value: 'Прогноз. значение CV' },
                    { value: 'Нижний предел Верхний предел' },
                ],
            },
            {
                cells: [
                    { value: 'MV4' },
                    { value: 'Расход1 острого орошения К-1 (FIRC0955)' },
                    { value: 'Режим работы' },
                    { value: 'Тек. знач. по парамет.' },
                    { value: 'Задание от MV' },
                    { value: 'Прогноз. значение CV' },
                    { value: 'Нижний предел Верхний предел' },
                ],
            },
            {
                groupName: 'Ч2-231',
            },
            {
                cells: [
                    { value: 'MV2' },
                    { value: 'Расход2 острого орошения К-1 (FIRC0955)' },
                    { value: 'Режим работы' },
                    { value: 'Тек. знач. по парамет.' },
                    { value: 'Задание от MV' },
                    { value: 'Прогноз. значение CV' },
                    { value: 'Нижний предел Верхний предел' },
                ],
            },
            {
                groupName: 'Ч3-231',
            },
            {
                cells: [
                    { value: 'MV3' },
                    { value: 'Расход3 острого орошения К-1 (FIRC0955)' },
                    { value: 'Режим работы' },
                    { value: 'Тек. знач. по парамет.' },
                    { value: 'Задание от MV' },
                    { value: 'Прогноз. значение CV' },
                    { value: 'Нижний предел Верхний предел' },
                ],
            },
        ],
        displayedColumns: [],
    };
    tables$: Subject<ITableMain> = new Subject<ITableMain>();

    constructor(
        protected widgetService: WidgetService,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }


    isGroup(index: number, item: any): boolean{
        return item.groupName;
    }

    protected dataHandler(ref: unknown) {}

    ngOnInit(): void {
        this.mockData.displayedColumns = this.mockData.headers.map((item, index) => '' + index);
        setTimeout(() => {
            this.tables$.next(this.mockData);
        });
    }
}

import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { WidgetService } from '@dashboard/services/widget.service';
import { ITableMain } from '@widgets/SUUTP/suutp-complexes-table/suutp-complexes-table.interface';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';

@Component({
  selector: 'evj-suutp-complexes-table',
  templateUrl: './suutp-complexes-table.component.html',
  styleUrls: ['./suutp-complexes-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuutpComplexesTableComponent extends WidgetPlatform<unknown> implements OnInit {

    mockData: ITableMain = {
        headers: [
            { name: '', unit: 'id' },
            { name: 'Название переменной', unit: 'name' },
            { name: 'Режим работы', unit: 'workTime' },
            { name: 'Тек. знач. по парамет.', unit: 'value' },
            { name: 'Задание от MV', unit: 'mvValue' },
            { name: 'Прогноз. значение CV', unit: 'cv' },
            { name: 'Нижний предел', unit: 'downValue' },
            { name: 'Верхний предел', unit: 'upValue' },
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
                    { value: 'Нижний предел' },
                    { value: 'Верхний предел' },
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
                    { value: 'Нижний предел' },
                    { value: 'Верхний предел' },
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
                    { value: 'Нижний предел' },
                    { value: 'Верхний предел' },
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
                    { value: 'Нижний предел' },
                    { value: 'Верхний предел' },
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
                    { value: 'Нижний предел' },
                    { value: 'Верхний предел' },
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
                    { value: 'Нижний предел' },
                    { value: 'Верхний предел' },
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

    protected dataHandler(ref: unknown): void {}

    ngOnInit(): void {
        this.mockData.displayedColumns = this.mockData.headers.map((item, index) => '' + index);
        setTimeout(() => {
            this.tables$.next(this.mockData);
        });
    }

}

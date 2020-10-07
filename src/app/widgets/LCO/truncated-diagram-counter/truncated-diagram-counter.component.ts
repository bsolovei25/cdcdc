import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';

@Component({
    selector: 'evj-truncated-diagram-counter',
    templateUrl: './truncated-diagram-counter.component.html',
    styleUrls: ['./truncated-diagram-counter.component.scss'],
})
export class TruncatedDiagramCounterComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public static itemCols: number = 29;
    public static itemRows: number = 7;
    public static minItemCols: number = 29;
    public static minItemRows: number = 7;

    public datas: any;
    constructor(
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'triangle';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        this.datas = ref.values;
        this.map(this.datas);
    }

    map(data: any): void {
        for (const item of data) {
            switch (item.name.toLowerCase()) {
                case 'загазованность':
                    item.image = 'fabric';
                    break;
                case 'деблокировочные ключи':
                    item.image = 'key';
                    break;
                case 'пожарная сигнализация':
                    item.image = 'fire';
                    break;
                case 'блокировки и сигнализации':
                    item.image = 'signal';
                    break;
                case 'пид-регуляторы':
                    item.image = 'regul';
                    break;
                case 'вибродиагностика':
                    item.image = 'ring';
                    break;
                case 'электрообогрев':
                    item.image = 'temp';
                    break;
                default:
                    item.image = 'fabric';
            }
        }
    }
}

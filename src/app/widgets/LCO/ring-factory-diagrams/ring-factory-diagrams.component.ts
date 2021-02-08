import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { UserSettingsService } from 'src/app/dashboard/services/user-settings.service';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { RingFactoryWidget } from '../../../dashboard/models/widget.model';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';

@Component({
    selector: 'evj-ring-factory-diagrams',
    templateUrl: './ring-factory-diagrams.component.html',
    styleUrls: ['./ring-factory-diagrams.component.scss'],
})
export class RingFactoryDiagramsComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    datas: RingFactoryWidget[] = [
        {
            id: '1',
            title: 'Комплекс атмосферно-вакуумной переработки нефти и газофракционирования',
            typeFabric: 0,
            values: [
                { name: 'ЭЛОУ-АВТ-6', plan: 100, fact: 100 },
                { name: 'ГФУ-2', plan: 100, fact: 100 },
            ],
            buttons: [],
        },
        {
            id: '2',
            title: 'Комплекс атмосферно-вакуумной переработки нефти, висбрекинга и стабилизации бензина',
            typeFabric: 1,
            values: [
                { name: 'АВТ-3', plan: 89, fact: 100 },
                { name: 'ЭЛОУ-2', plan: 100, fact: 100 },
                { name: 'Висбрекинг', plan: 79, fact: 92 },
                { name: 'Л-22/4', plan: 100, fact: 100 },
            ],
            buttons: [
                { typeButton: 1, critical: 1, notCritical: 2 },
                { typeButton: 4, critical: 3, notCritical: 7 },
            ],
        },
        {
            id: '3',
            title: 'Комплекс гидроочистки дизельного топлива и каталитического риформирования',
            typeFabric: 2,
            values: [
                { name: 'ЭЛОУ-АВТ-6', plan: 100, fact: 100 },
                { name: 'ГФУ-2', plan: 100, fact: 100 },
                { name: 'Висбрекинг', plan: 79, fact: 92 },
                { name: 'Л-22/4', plan: 100, fact: 100 },
            ],
            buttons: [
                { typeButton: 1, critical: 2, notCritical: 2 },
                { typeButton: 2, critical: 2, notCritical: 2 },
                { typeButton: 4, critical: 3, notCritical: 7 },
                { typeButton: 5, critical: 3, notCritical: 7 },
            ],
        },
        {
            id: '4',
            title: 'Комплекс атмосферно-вакуумной переработки нефти и газофракционирования',
            typeFabric: 3,
            values: [
                { name: 'ЭЛОУ-АВТ-6', plan: 100, fact: 100 },
                { name: 'ГФУ-2', plan: 100, fact: 100 },
                { name: 'Висбрекинг', plan: 100, fact: 100 },
                { name: 'Л-22/4', plan: 100, fact: 100 },
            ],
            buttons: [],
        },
        {
            id: '5',
            title: 'Комплекс атмосферно-вакуумной переработки нефти и газофракционирования',
            typeFabric: 4,
            values: [
                { name: 'ЭЛОУ-АВТ-6', plan: 100, fact: 100 },
                { name: 'ГФУ-2', plan: 100, fact: 100 },
            ],
            buttons: [],
        },
        {
            id: '6',
            title: 'Комплекс гидроочистки дизельного топлива и каталитического риформирования',
            typeFabric: 5,
            values: [
                { name: 'ЭЛОУ-АВТ-6', plan: 100, fact: 100 },
                { name: 'ГФУ-2', plan: 100, fact: 100 },
                { name: 'Висбрекинг', plan: 79, fact: 92 },
                { name: 'Л-22/4', plan: 100, fact: 100 },
            ],
            buttons: [
                { typeButton: 1, critical: 2, notCritical: 2 },
                { typeButton: 5, critical: 3, notCritical: 7 },
            ],
        },
    ];

    constructor(
        public widgetService: WidgetService,
        public service: UserSettingsService,
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
        this.datas = ref.items;
    }
}

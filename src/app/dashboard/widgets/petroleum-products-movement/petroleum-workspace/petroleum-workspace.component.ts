import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'evj-petroleum-workspace',
    templateUrl: './petroleum-workspace.component.html',
    styleUrls: ['./petroleum-workspace.component.scss'],
})
export class PetroleumWorkspaceComponent implements OnInit {
    @Output() isClick = new EventEmitter<string>();
    public isChangeParam: boolean = false;

    public data = [
        'Баланс по продуктам',
        'Накопительный баланс',
        'Оперативный лист',
        'Остатки в резервуарах',
        'Список операций',
        'Список операций',
        'Список операций',
    ];

    public dataAdditionally = [
        'Экспортировать в Excel',
        'Печать',
    ]

    constructor() {}

    ngOnInit() {}

    createOperation(type: string): void {
        this.isClick.emit(type);
    }

    updateParam(type: string): void {
        this.isChangeParam = true;
        this.isClick.emit(type);
    }
}

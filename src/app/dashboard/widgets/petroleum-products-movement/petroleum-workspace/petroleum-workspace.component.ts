import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'evj-petroleum-workspace',
    templateUrl: './petroleum-workspace.component.html',
    styleUrls: ['./petroleum-workspace.component.scss'],
})
export class PetroleumWorkspaceComponent implements OnInit {

    @Output() isClick = new EventEmitter<boolean>();
    public data = [
        'Баланс по продуктам',
        'Накопительный баланс',
        'Оперативный лист',
        'Остатки в резервуарах',
        'Список операций',
        'Список операций',
        'Список операций',
    ];

    constructor() {}

    ngOnInit() {}

    createOperation(el: boolean): void {
       this.isClick.emit(el);
    }
}

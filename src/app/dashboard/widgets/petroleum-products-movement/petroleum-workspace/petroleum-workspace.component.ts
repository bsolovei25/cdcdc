import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'evj-petroleum-workspace',
    templateUrl: './petroleum-workspace.component.html',
    styleUrls: ['./petroleum-workspace.component.scss'],
})
export class PetroleumWorkspaceComponent implements OnInit {
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
}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'evj-system-path-edit',
    templateUrl: './system-path-edit.component.html',
    styleUrls: ['./system-path-edit.component.scss'],
})
export class SystemPathEditComponent implements OnInit {
    @Output() public result: EventEmitter<any> = new EventEmitter<any>();

    public data: any = [
        {
            id: 1,
            name: 'C/auth',
            catalog: [
                {
                    id: 1,
                    mail: 'test1@test.ru',
                },
                {
                    id: 2,
                    mail: 'test2@test.ru',
                },
            ],
        },
        {
            id: 2,
            name: 'D/auth',
            catalog: [
                {
                    id: 3,
                    mail: 'test3@test.ru',
                },
                {
                    id: 4,
                    mail: 'test4@test.ru',
                },
            ],
        },
    ];

    public dataSend: any = [];

    public userBlock: boolean = false;
    public itemChooseId: number;

    constructor() {}

    ngOnInit(): void {}

    close(): void {
        const obj = {
            close: false,
            type: 'pathEdit',
        };
        this.result.emit(obj);
    }

    save(): void {
        const obj = {
            close: true,
            type: 'pathEdit',
        };
        this.result.emit(obj);
    }

    blockItem(item) {}

    deleteItem(item) {}

    itemOpen(item) {
        item.open = !item.open;
    }

    onClickItem(item): void {
        this.itemChooseId = item.id;
    }

    openUserBlock(): void {
        if (this.itemChooseId) {
            this.userBlock = true;
            this.dataSend = this.data.find((e) => e.id === this.itemChooseId).catalog;
        }
    }

    closeUserBlock(event): void {
        this.data.find((e) => e.id === this.itemChooseId).catalog = event.data;
        this.userBlock = event.close;
    }
}

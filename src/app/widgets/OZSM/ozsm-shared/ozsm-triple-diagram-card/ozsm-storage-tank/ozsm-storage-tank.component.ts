import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'evj-ozsm-storage-tank',
    templateUrl: './ozsm-storage-tank.component.html',
    styleUrls: ['./ozsm-storage-tank.component.scss'],
})
export class OzsmStorageTankComponent implements OnInit {
    @Input()
    public value: number = 0;

    constructor() {}

    public ngOnInit(): void {}
}

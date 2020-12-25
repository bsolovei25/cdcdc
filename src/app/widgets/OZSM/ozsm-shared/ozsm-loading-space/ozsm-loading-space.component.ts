import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'evj-ozsm-loading-space',
    templateUrl: './ozsm-loading-space.component.html',
    styleUrls: ['./ozsm-loading-space.component.scss'],
})
export class OzsmLoadingSpaceComponent implements OnInit {
    @Input() set percentage(value: number) {
        // value = value > 100 ? 100 : value < 100 ? 0 : value;
        this.level = value / this.len;
    }
    public level: number = 1;

    private readonly len: number = 10;
    public readonly arrayOfCells: number[] = new Array(this.len);

    constructor() {}

    ngOnInit(): void {}
}

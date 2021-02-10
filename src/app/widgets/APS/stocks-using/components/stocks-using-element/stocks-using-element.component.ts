import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'evj-stocks-using-element',
    templateUrl: './stocks-using-element.component.html',
    styleUrls: ['./stocks-using-element.component.scss'],
})
export class StocksUsingElementComponent implements OnInit {
    @Input() public data: {
        productTitle: string;
        capacity: number;
        using: number;
        rest: number;
    } = null;

    constructor() {}

    ngOnInit(): void {}
}

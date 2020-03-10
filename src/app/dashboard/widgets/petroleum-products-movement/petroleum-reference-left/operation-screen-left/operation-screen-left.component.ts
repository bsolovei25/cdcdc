import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'evj-operation-screen-left',
    templateUrl: './operation-screen-left.component.html',
    styleUrls: ['./operation-screen-left.component.scss'],
})
export class OperationScreenLeftComponent implements OnInit {
    @Input() data: any;

    constructor() {}

    ngOnInit(): void {}
}

import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'evj-operation-park-screen-left',
    templateUrl: './operation-park-screen-left.component.html',
    styleUrls: ['./operation-park-screen-left.component.scss'],
})
export class OperationParkScreenLeftComponent implements OnInit {
    @Input() data: any;

    constructor() {}

    ngOnInit(): void {}
}

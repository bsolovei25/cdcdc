import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'evj-operation-park-screen-right',
    templateUrl: './operation-park-screen-right.component.html',
    styleUrls: ['./operation-park-screen-right.component.scss'],
})
export class OperationParkScreenRightComponent implements OnInit {
    @Input() data: any;

    constructor() {}

    ngOnInit(): void {}
}

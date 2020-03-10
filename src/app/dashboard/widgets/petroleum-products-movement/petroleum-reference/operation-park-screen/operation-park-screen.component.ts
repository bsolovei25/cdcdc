import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'evj-operation-park-screen',
    templateUrl: './operation-park-screen.component.html',
    styleUrls: ['./operation-park-screen.component.scss'],
})
export class OperationParkScreenComponent implements OnInit {
    @Input() data: any;

    constructor() {}

    ngOnInit(): void {}
}

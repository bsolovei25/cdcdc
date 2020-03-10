import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'evj-operation-screen',
    templateUrl: './operation-screen.component.html',
    styleUrls: ['./operation-screen.component.scss'],
})
export class OperationScreenComponent implements OnInit {
    @Input() data: any;

    constructor() {}

    ngOnInit(): void {}
}

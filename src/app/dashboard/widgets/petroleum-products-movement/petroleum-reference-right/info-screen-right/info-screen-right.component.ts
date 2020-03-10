import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'evj-info-screen-right',
    templateUrl: './info-screen-right.component.html',
    styleUrls: ['./info-screen-right.component.scss'],
})
export class InfoScreenRightComponent implements OnInit {
    @Input() data: any;

    constructor() {}

    ngOnInit(): void {}
}

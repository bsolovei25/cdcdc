import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'evj-petroleum-reference-right',
    templateUrl: './petroleum-reference-right.component.html',
    styleUrls: ['./petroleum-reference-right.component.scss'],
})
export class PetroleumReferenceRightComponent implements OnInit {
    @Input() typeScreen: string;
    @Input() data: any;

    constructor() {}

    ngOnInit(): void {}
}

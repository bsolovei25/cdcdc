import { Component, OnInit, Input } from '@angular/core';
import { IOperation } from 'src/app/dashboard/models/petroleum-products-movement.model';

@Component({
    selector: 'evj-info-screen',
    templateUrl: './info-screen.component.html',
    styleUrls: ['./info-screen.component.scss'],
})
export class InfoScreenComponent implements OnInit {
    @Input() data: IOperation;
    @Input() title: string[];

    constructor() {}

    objectKeys: any = Object.keys;
    objectEntries: any = Object.entries;

    ngOnInit(): void {}
}

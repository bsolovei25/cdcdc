import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ISOUProduct } from '../../../../../dashboard/models/SOU/sou-operational-accounting-system.model';

@Component({
    selector: 'evj-sou-production-table',
    templateUrl: './sou-production-table.component.html',
    styleUrls: ['./sou-production-table.component.scss'],
})
export class SouProductionTableComponent implements OnInit {
    @Input() products: ISOUProduct[] = [];

    constructor() {}

    ngOnInit(): void {}
}

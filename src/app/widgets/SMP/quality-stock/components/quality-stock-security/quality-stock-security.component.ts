import { Component, OnInit, Input } from '@angular/core';
import { IQualityStockSecurity } from '../../quality-stock.component';

@Component({
    selector: 'evj-quality-stock-security',
    templateUrl: './quality-stock-security.component.html',
    styleUrls: ['./quality-stock-security.component.scss'],
})
export class QualityStockSecurityComponent implements OnInit {
    @Input() data: IQualityStockSecurity;

    constructor() {}

    ngOnInit(): void {}
}

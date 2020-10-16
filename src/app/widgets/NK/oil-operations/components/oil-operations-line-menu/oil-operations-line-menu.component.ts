import { Component, OnInit } from '@angular/core';
import { NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { CUSTOM_DATE_FORMATS } from '@shared/components/time-data-picker/time-data-picker.component';

@Component({
    selector: 'evj-oil-operations-line-menu',
    templateUrl: './oil-operations-line-menu.component.html',
    styleUrls: ['./oil-operations-line-menu.component.scss'],
    providers: [{ provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }],
})
export class OilOperationsLineMenuComponent implements OnInit {
    public dateNow: Date = new Date();

    constructor() {}

    ngOnInit(): void {}
}

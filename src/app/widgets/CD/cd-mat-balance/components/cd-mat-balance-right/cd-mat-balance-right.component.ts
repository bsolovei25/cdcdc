import { Component, OnInit, Input } from '@angular/core';
import { IStreams } from '../../cd-mat-balance.component';

@Component({
    selector: 'evj-cd-mat-balance-right',
    templateUrl: './cd-mat-balance-right.component.html',
    styleUrls: ['./cd-mat-balance-right.component.scss'],
})
export class CdMatBalanceRightComponent implements OnInit {
    @Input() data: IStreams[] = [];

    constructor() {}

    ngOnInit(): void {}
}

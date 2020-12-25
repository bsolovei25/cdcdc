import { Component, Input, OnInit } from '@angular/core';
import { IOzsmLoadingPark } from '../../../../../../dashboard/models/OZSM/ozsm-shared.model';

@Component({
    selector: 'evj-ozsm-loading-parks-body',
    templateUrl: './ozsm-loading-parks-body.component.html',
    styleUrls: ['./ozsm-loading-parks-body.component.scss'],
})
export class OzsmLoadingParksBodyComponent implements OnInit {
    @Input() data: IOzsmLoadingPark = null;

    constructor() {}

    ngOnInit(): void {}
}

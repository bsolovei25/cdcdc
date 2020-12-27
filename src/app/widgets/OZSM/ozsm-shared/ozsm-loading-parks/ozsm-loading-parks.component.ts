import { Component, Input, OnInit } from '@angular/core';
import { IOzsmLoadingPark } from '../../../../dashboard/models/OZSM/ozsm-shared.model';

@Component({
    selector: 'evj-ozsm-loading-parks',
    templateUrl: './ozsm-loading-parks.component.html',
    styleUrls: ['./ozsm-loading-parks.component.scss'],
})
export class OzsmLoadingParksComponent implements OnInit {
    @Input() data: IOzsmLoadingPark = null;

    constructor() {}

    ngOnInit(): void {}
}

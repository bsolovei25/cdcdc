import { Component, Input, OnInit } from '@angular/core';
import { IOzsmLoadingParkItem } from '../../../../../../dashboard/models/OZSM/ozsm-shared.model';

@Component({
    selector: 'evj-ozsm-loading-parks-diagram',
    templateUrl: './ozsm-loading-parks-diagram.component.html',
    styleUrls: ['./ozsm-loading-parks-diagram.component.scss'],
})
export class OzsmLoadingParksDiagramComponent implements OnInit {
    @Input() data: IOzsmLoadingParkItem = null;

    constructor() {}

    ngOnInit(): void {}
}

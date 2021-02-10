import { Component, Input, OnInit } from '@angular/core';
import { IFacilityDeviationElement } from '../../../../dashboard/models/APS/facility-deviation.model';

@Component({
    selector: 'evj-facility-deviation-element',
    templateUrl: './facility-deviation-element.component.html',
    styleUrls: ['./facility-deviation-element.component.scss'],
})
export class FacilityDeviationElementComponent implements OnInit {
    @Input() data: IFacilityDeviationElement = null;

    ngOnInit(): void {}
}

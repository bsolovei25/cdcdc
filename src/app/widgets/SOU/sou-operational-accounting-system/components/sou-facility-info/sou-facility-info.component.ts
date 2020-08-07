import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'evj-sou-facility-info',
    templateUrl: './sou-facility-info.component.html',
    styleUrls: ['./sou-facility-info.component.scss']
})
export class SouFacilityInfoComponent implements OnInit {

    @Input() facilityTitle: string = 'АВТ-10-АБ';

    constructor() {
    }

    ngOnInit(): void {
    }

}

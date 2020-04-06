import { Component, OnInit, Input } from '@angular/core';
import {
    ITankInfo,
    IFacilityInfo,
    IPetroleumObject,
} from 'src/app/dashboard/models/petroleum-products-movement.model';
import { PetroleumScreenService } from '../../../../services/petroleum-screen.service';

@Component({
    selector: 'evj-operation-park-screen-left',
    templateUrl: './operation-park-screen-left.component.html',
    styleUrls: ['./operation-park-screen-left.component.scss'],
})
export class OperationParkScreenLeftComponent implements OnInit {
    @Input() titlePark: string = 'Парк';

    public currentObject: IPetroleumObject = null;
    public data: IPetroleumObject[];

    constructor(public petroleumService: PetroleumScreenService) {}

    ngOnInit(): void {
        this.petroleumService.objectsAll$.subscribe((ref: IPetroleumObject[]) => {
            this.data = ref;
            this.setObjectActive(this.currentObject);
        });
    }

    public setObjectActive(object: IPetroleumObject): void {
        if (!object) {
            object = this.data[0];
        }
        this.currentObject = object;
        this.petroleumService.setTankParam(object.objectName);
    }
}

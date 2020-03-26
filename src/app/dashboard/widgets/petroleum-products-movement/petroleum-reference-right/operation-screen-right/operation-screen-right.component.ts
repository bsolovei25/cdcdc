import { Component, OnInit, Input } from '@angular/core';
import {
    ITankInfo,
    IFacilityInfo, IPetroleumObject
} from 'src/app/dashboard/models/petroleum-products-movement.model';
import { PetroleumScreenService } from '../../../../services/petroleum-screen.service';

@Component({
    selector: 'evj-operation-screen-right',
    templateUrl: './operation-screen-right.component.html',
    styleUrls: ['./operation-screen-right.component.scss'],
})
export class OperationScreenRightComponent implements OnInit {
    // dataTank: ITankInfo[] = [
    //     {
    //         title: 'Резервуар 201',
    //         state: 'in',
    //     },
    //     {
    //         title: 'Резервуар 202',
    //         state: 'in',
    //     },
    //     {
    //         title: 'Резервуар 203',
    //         state: 'in',
    //     },
    //     {
    //         title: 'Резервуар 204',
    //         state: 'in',
    //     },
    //     {
    //         title: 'Резервуар 205',
    //         state: 'in',
    //     },
    // ];
    //
    // dataFacil: IFacilityInfo[] = [
    //     {
    //         title: 'Резервуар 201',
    //         state: 'in',
    //     },
    //     {
    //         title: 'Резервуар 202',
    //         state: 'in',
    //     },
    //     {
    //         title: 'Резервуар 203',
    //         state: 'in',
    //     },
    //     {
    //         title: 'Резервуар 204',
    //         state: 'in',
    //     },
    //     {
    //         title: 'Резервуар 205',
    //         state: 'in',
    //     },
    // ];

    public tanks: IPetroleumObject[];
    public units: IPetroleumObject[];

    isShowFacilities: boolean = true;
    isShowTank: boolean = true;

    constructor(private petroleumService: PetroleumScreenService) {}

    public ngOnInit(): void {
        this.petroleumService.objectsReceiver$.subscribe(
            ref => {
                this.tanks = ref.filter((item: IPetroleumObject) => item.objectType === 'Tank');
                this.units = ref.filter((item: IPetroleumObject) => item.objectType === 'Unit');
            }
        );
    }

    public async objectClick(objectName: string): Promise<void> {
        await this.petroleumService.chooseObject(objectName, false);
    }
}

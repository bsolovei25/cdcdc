import { Component, OnInit, Input } from '@angular/core';
import {
    ITankInfo,
    IFacilityInfo, IPetroleumObject
} from 'src/app/dashboard/models/petroleum-products-movement.model';
import { PetroleumScreenService } from '../../../../services/petroleum-screen.service';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'evj-operation-screen-left',
    templateUrl: './operation-screen-left.component.html',
    styleUrls: ['./operation-screen-left.component.scss'],
})
export class OperationScreenLeftComponent implements OnInit {
    titlePark: string = 'Источник';
    isShowFacilities: boolean = true;
    isShowTank: boolean = true;

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

    public tanks: IPetroleumObject[] = [];
    public units: IPetroleumObject[] = [];

    constructor(public petroleumService: PetroleumScreenService) {}

    ngOnInit(): void {
        this.petroleumService.objectsSource$.subscribe(
            ref => {
                this.tanks = ref.filter((item: IPetroleumObject) => item.objectType === 'Tank');
                this.units = ref.filter((item: IPetroleumObject) => item.objectType === 'Unit');
            }
        );
    }
}

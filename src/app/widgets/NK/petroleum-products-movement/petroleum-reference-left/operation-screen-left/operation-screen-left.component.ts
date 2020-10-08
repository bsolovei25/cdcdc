import { Component, OnInit, Input } from '@angular/core';
import {
    ITankInfo,
    IFacilityInfo,
    IPetroleumObject,
} from 'src/app/dashboard/models/petroleum-products-movement.model';
import { PetroleumScreenService } from 'src/app/dashboard/services/widgets/petroleum-screen.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'evj-operation-screen-left',
    templateUrl: './operation-screen-left.component.html',
    styleUrls: ['./operation-screen-left.component.scss'],
    animations: [
        trigger('Branch', [
            state(
                'collapsed',
                style({
                    height: 0,
                    opacity: 0,
                    width: '100%',
                    overflow: 'hidden',
                    display: 'block',
                })
            ),
            state(
                'expanded',
                style({
                    height: 100,
                    width: '100%',
                    display: 'block',
                    opacity: 1,
                })
            ),
            transition('collapsed => expanded', animate('150ms ease-in')),
            transition('expanded => collapsed', animate('150ms ease-out')),
        ]),
    ],
})
export class OperationScreenLeftComponent implements OnInit {
    titlePark: string = 'Источник';
    isShowFacilities: boolean = true;
    isShowTank: boolean = true;

    public tanks: IPetroleumObject[] = [];
    public units: IPetroleumObject[] = [];

    constructor(public petroleumService: PetroleumScreenService) {}

    ngOnInit(): void {
        this.petroleumService.objectsSource$.subscribe((ref) => {
            this.tanks = ref.filter((item: IPetroleumObject) => item.objectType === 'Tank');
            this.units = ref.filter((item: IPetroleumObject) => item.objectType === 'Unit');
        });
    }

    public async objectClick(objectName: string): Promise<void> {
        await this.petroleumService.chooseObject(objectName, true);
    }
}

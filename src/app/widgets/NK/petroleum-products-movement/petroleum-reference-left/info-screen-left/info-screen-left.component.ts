import { Component, OnInit, Input } from '@angular/core';
import { ITankInfo } from 'src/app/dashboard/models/NK/petroleum-products-movement.model';
import { PetroleumScreenService } from 'src/app/dashboard/services/widgets/petroleum-screen.service';

@Component({
    selector: 'evj-info-screen-left',
    templateUrl: './info-screen-left.component.html',
    styleUrls: ['./info-screen-left.component.scss'],
})
export class InfoScreenLeftComponent implements OnInit {
    @Input() titlePark: string = 'Парк';

    // data: ITankInfo[] = [
    //     {
    //         title: 'Резервуар 201',
    //         state: 'in',
    //     },
    //     {
    //         title: 'Резервуар 202',
    //         state: 'repair',
    //     },
    //     {
    //         title: 'Резервуар 203',
    //         state: 'hold',
    //     },
    //     {
    //         title: 'Резервуар 204',
    //         state: 'out',
    //     },
    //     {
    //         title: 'Резервуар 205',
    //         state: 'inout',
    //     },
    // ];

    constructor(public petroleumScreenService: PetroleumScreenService) {}

    ngOnInit(): void {}
}

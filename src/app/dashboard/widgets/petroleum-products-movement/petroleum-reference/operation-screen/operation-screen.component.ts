import { Component, OnInit, Input } from '@angular/core';
import { PetroleumScreenService } from 'src/app/dashboard/services/petroleum-screen.service';
import { ITransfer, TransfersFilter } from '../../../../models/petroleum-products-movement.model';
import { IUdTableDict } from '../petroleum-reference.component';

@Component({
    selector: 'evj-operation-screen',
    templateUrl: './operation-screen.component.html',
    styleUrls: ['./operation-screen.component.scss'],
})
export class OperationScreenComponent implements OnInit {
    @Input() title: string[];
    @Input() keys: string[];
    @Input() dictionary: IUdTableDict[];
    public isOpen: boolean;

    constructor(public petroleumService: PetroleumScreenService) {}

    public ngOnInit(): void {
        this.filterHandler();
    }

    public returnMenu(): void {
        this.petroleumService.openScreen('info');
    }

    public transferClick(uid: string): void {
        console.log(uid);
        this.petroleumService.chooseTransfer(uid);
    }

    private filterHandler(): void {
        this.petroleumService.currentTransfersFilter$.subscribe(
            (item) => {
                switch (item) {
                    case 'open':
                        this.isOpen = true;
                        break;
                    case 'all':
                        this.isOpen = false;
                        break;
                }
            }
        );
    }

    public filterClick(isOpen: boolean): void {
        this.petroleumService.isLoad$.next(true);
        let filterType: TransfersFilter;
        if (isOpen) {
            filterType = 'open';
        } else {
            filterType = 'all';
        }
        this.petroleumService.currentTransfersFilter$.next(filterType);
    }
}

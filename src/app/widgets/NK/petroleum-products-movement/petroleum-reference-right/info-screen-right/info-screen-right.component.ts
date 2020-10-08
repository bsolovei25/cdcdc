import { Component, OnInit, Input } from '@angular/core';
import { PetroleumScreenService } from 'src/app/dashboard/services/widgets/petroleum-screen.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { TransfersFilter } from 'src/app/dashboard/models/petroleum-products-movement.model';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'evj-info-screen-right',
    templateUrl: './info-screen-right.component.html',
    styleUrls: ['./info-screen-right.component.scss'],
})
export class InfoScreenRightComponent implements OnInit {
    @Input() data: any;
    public isOpen: boolean;

    constructor(private petroleumService: PetroleumScreenService) {}

    ngOnInit(): void {
        this.filterHandler();
    }

    createOperation(): void {
        this.petroleumService.openScreen('operation');
        this.petroleumService.createTransfer();
    }

    changeParam(): void {
        this.petroleumService.openScreen('park-operation');
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
        let filterType: TransfersFilter;
        if (isOpen) {
            filterType = 'open';
        } else {
            filterType = 'all';
        }
        this.petroleumService.currentTransfersFilter$.next(filterType);
    }
}

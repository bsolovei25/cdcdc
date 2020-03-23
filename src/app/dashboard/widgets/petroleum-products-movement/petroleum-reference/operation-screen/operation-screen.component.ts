import { Component, OnInit, Input } from '@angular/core';
import { PetroleumScreenService } from 'src/app/dashboard/services/petroleum-screen.service';
import { ITransfer } from '../../../../models/petroleum-products-movement.model';

@Component({
    selector: 'evj-operation-screen',
    templateUrl: './operation-screen.component.html',
    styleUrls: ['./operation-screen.component.scss'],
})
export class OperationScreenComponent implements OnInit {
    @Input() data: ITransfer[];
    @Input() title: string[];
    @Input() keys: string[];

    constructor(private petroleumService: PetroleumScreenService) {}

    objectKeys: any = Object.keys;
    objectEntries: any = Object.entries;

    ngOnInit(): void {}

    returnMenu(): void {
        this.petroleumService.openScreen('info');
    }
}

import { Component, OnInit, Input } from '@angular/core';
import { PetroleumScreenService } from 'src/app/dashboard/services/petroleum-screen.service';
import { ITransfer } from '../../../../models/petroleum-products-movement.model';

@Component({
    selector: 'evj-operation-screen',
    templateUrl: './operation-screen.component.html',
    styleUrls: ['./operation-screen.component.scss'],
})
export class OperationScreenComponent implements OnInit {
    @Input() title: string[];
    @Input() keys: string[];

    constructor(public petroleumService: PetroleumScreenService) {}

    ngOnInit(): void {}

    returnMenu(): void {
        this.petroleumService.openScreen('info');
    }

    public transferClick(uid: string): void {
        console.log(uid);
        this.petroleumService.chooseTransfer(uid);
    }
}

import { Component, OnInit, Input } from '@angular/core';
import { ITransfer } from 'src/app/dashboard/models/petroleum-products-movement.model';
import { PetroleumScreenService } from '../../../../services/petroleum-screen.service';

@Component({
    selector: 'evj-info-screen',
    templateUrl: './info-screen.component.html',
    styleUrls: ['./info-screen.component.scss'],
})
export class InfoScreenComponent implements OnInit {
    @Input() title: string[];
    @Input() keys: string[];

    constructor(private petroleumScreenService: PetroleumScreenService) {}

    ngOnInit(): void {}

    public transferClick(uid: string): void {
        console.log(uid);
        this.petroleumScreenService.chooseTransfer(uid);
    }
}

import { Component, OnInit, Input } from '@angular/core';
import { PetroleumScreenService } from 'src/app/dashboard/services/widgets/petroleum-screen.service';

@Component({
    selector: 'evj-operation-park-screen-right',
    templateUrl: './operation-park-screen-right.component.html',
    styleUrls: ['./operation-park-screen-right.component.scss'],
})
export class OperationParkScreenRightComponent implements OnInit {
    dataAdditionally: any = ['Экспортировать в Excel', 'Печать'];

    constructor(private petroleumService: PetroleumScreenService) {}

    ngOnInit(): void {}

    createOperation(): void {
        this.petroleumService.openScreen('operation');
        this.petroleumService.createTransfer();
    }

    changeParam(): void {
        this.petroleumService.openScreen('park-operation');
    }
}

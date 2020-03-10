import { Component, OnInit, Input } from '@angular/core';
import { PetroleumScreenService } from 'src/app/dashboard/services/petroleum-screen.service';

@Component({
    selector: 'evj-operation-park-screen-right',
    templateUrl: './operation-park-screen-right.component.html',
    styleUrls: ['./operation-park-screen-right.component.scss'],
})
export class OperationParkScreenRightComponent implements OnInit {
    @Input() data: any;

    constructor(private petroleumService: PetroleumScreenService) {}

    ngOnInit(): void {}

    createOperation(): void {
        this.petroleumService.openScreen("operation");
    }

    changeParam(): void {
        this.petroleumService.openScreen("park-operation");
    }
}

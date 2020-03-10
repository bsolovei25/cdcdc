import { Component, OnInit, Input } from '@angular/core';
import { PetroleumScreenService } from 'src/app/dashboard/services/petroleum-screen.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'evj-info-screen-right',
    templateUrl: './info-screen-right.component.html',
    styleUrls: ['./info-screen-right.component.scss'],
})
export class InfoScreenRightComponent implements OnInit {
    @Input() data: any;

    constructor(private petroleumService: PetroleumScreenService) {}

    ngOnInit(): void {}

    createOperation(): void {
        this.petroleumService.openScreen('operation');
    }

    changeParam(): void {
        this.petroleumService.openScreen('park-operation');
    }
}

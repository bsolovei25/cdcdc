import { Component, OnInit, Input } from '@angular/core';
import { PetroleumScreenService } from 'src/app/dashboard/services/petroleum-screen.service';

@Component({
    selector: 'evj-operation-park-screen',
    templateUrl: './operation-park-screen.component.html',
    styleUrls: ['./operation-park-screen.component.scss'],
})
export class OperationParkScreenComponent implements OnInit {
    @Input() data: any;
    @Input() title: string[];

    constructor(private petroleumService: PetroleumScreenService) { }

    ngOnInit(): void { }

    clickActive(item): void {
        item.active = !item.active;
    }

    returnMenu(): void {
        this.petroleumService.openScreen('info');
    }
}

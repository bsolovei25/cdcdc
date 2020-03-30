import { Component, OnInit, Input } from '@angular/core';
import { PetroleumScreenService } from 'src/app/dashboard/services/petroleum-screen.service';
import { ITankAttribute } from '../../../../models/petroleum-products-movement.model';

@Component({
    selector: 'evj-operation-park-screen',
    templateUrl: './operation-park-screen.component.html',
    styleUrls: ['./operation-park-screen.component.scss'],
})
export class OperationParkScreenComponent implements OnInit {
    @Input() title: string[];
    public data: ITankAttribute[];

    constructor(private petroleumService: PetroleumScreenService) {}

    public ngOnInit(): void {
        this.petroleumService.currentTankParam.subscribe(
            (item) => this.data = item.objectAttributes
        );
    }

    clickActive(item): void {
        item.active = !item.active;
    }

    returnMenu(): void {
        this.petroleumService.openScreen('info');
    }
}

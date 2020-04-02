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
            (item) => {
                // const regexp = /[A-Z]/;
                // this.data = item.objectAttributes
                //     .filter((el) =>
                //         (el.paramTitle.toUpperCase().search(regexp) === -1) &&
                //         (el.paramValue.toUpperCase().search(regexp) === -1)
                //     );
                this.data = item.objectAttributes;
            }
        );
    }

    clickActive(item: ITankAttribute): void {
        this.data.forEach(el => el.active = false);
        item.active = !item.active;
    }

    returnMenu(): void {
        this.petroleumService.openScreen('info');
    }
}

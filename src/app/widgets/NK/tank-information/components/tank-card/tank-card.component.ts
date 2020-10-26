import {
    Component,
    OnInit,
    Input,
    ChangeDetectionStrategy,
    OnChanges
} from '@angular/core';
import { ITankCardValue } from 'src/app/dashboard/models/NK/tank-information';
import { TooltipService } from '@shared/components/tooltip/service/tooltip.service';

@Component({
    selector: 'evj-tank-card',
    templateUrl: './tank-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./tank-card.component.scss']
})
export class TankCardComponent implements OnInit, OnChanges {
    @Input() public data: ITankCardValue;
    @Input() public idLine: ITankCardValue;

    public heightCard: number;
    public readonly heightValue: number = 20;

    operation = {
        in: 'Заполнение',
        out: 'Отгрузка',
        inOut: 'Проток',
        unknown: 'Неизвестно',
        hold: 'Отстой',
        // standart: 'Без изменений',
        // repair: 'Ремонт',
        // work: 'В работе'
    };

    constructor(private tooltipService: TooltipService) {
    }

    ngOnChanges(): void {
        // this.data.objectStatus = 'inOut';
        if (!this.operation[this.data.objectStatus]) {
            this.data.objectStatus = 'unknown';
        }
        if (this.data.fillLevelPercentage > 100) {
            this.data.fillLevelPercentage = 100;
        } else if (this.data.fillLevelPercentage < 0) {
            this.data.fillLevelPercentage = 0;
        }
        this.heightCard = (this.data.attributes.length) * this.heightValue + 40;
        this.tooltipService.close();
    }

    ngOnInit(): void {
    }
}

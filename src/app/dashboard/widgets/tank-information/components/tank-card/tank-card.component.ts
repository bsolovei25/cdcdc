import {
    Component,
    OnInit,
    Input,
    AfterViewInit,
    ChangeDetectionStrategy,
    OnChanges
} from '@angular/core';
import { ITankCardValue } from 'src/app/dashboard/models/tank-information';
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
    public heightValue: number = 20;

<<<<<<< Updated upstream
    public readonly operation: any = {
=======
    operation = {
>>>>>>> Stashed changes
        filling: 'Заполнение',
        shipment: 'Отгрузка',
        standart: 'Без изменений',
        unknown: 'Неизвестно',
        in: 'Налив',
        out: 'Слив',
        repair: 'Ремонт',
        hold: 'Отстой',
        inOut: 'Проток',
        work: 'В работе'
    };

<<<<<<< Updated upstream
    constructor(private tooltipService: TooltipService) { }

    ngOnChanges(): void {
        this.heightCard = (this.data.attributes.length) * this.heightValue + 40;
        this.tooltipService.close();
    }
=======
    constructor(private tooltipService: TooltipService) {
    }

    ngOnChanges(): void {
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
>>>>>>> Stashed changes

    ngOnInit(): void {
    }
}

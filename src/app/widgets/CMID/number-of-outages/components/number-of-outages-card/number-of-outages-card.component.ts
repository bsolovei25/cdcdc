import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { INumberOfOutagesModel, IPlant } from "@widgets/CMID/number-of-outages/models/number-of-outages.model";

@Component({
    selector: 'evj-number-of-outages-card',
    templateUrl: './number-of-outages-card.component.html',
    styleUrls: ['./number-of-outages-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberOfOutagesCardComponent {
    @Input() groups: INumberOfOutagesModel;

    getIconType(plant: IPlant): string {
        if (plant.unauthorized > 0) {
            return 'plant-unauthorized.svg'
        }
        if (plant.unauthorized === 0 && plant.expired > 0) {
            return 'plant-expired.svg'
        }
        if (plant.expired === 0 && plant.total > 0) {
            return 'plant-active.svg'
        }

        return 'plant-default.svg'
    }
}

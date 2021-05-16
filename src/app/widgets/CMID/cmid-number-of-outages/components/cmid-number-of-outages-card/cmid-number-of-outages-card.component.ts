import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { INumberOfOutagesModel, IPlant } from "@widgets/CMID/cmid-number-of-outages/models/cmid-number-of-outages.model";

@Component({
    selector: 'evj-number-of-outages-card',
    templateUrl: './cmid-number-of-outages-card.component.html',
    styleUrls: ['./cmid-number-of-outages-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmidNumberOfOutagesCardComponent {
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

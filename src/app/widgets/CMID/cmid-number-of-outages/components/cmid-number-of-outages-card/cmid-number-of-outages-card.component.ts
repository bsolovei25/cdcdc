import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { INumberOfOutagesModel, IPlant } from "@widgets/CMID/cmid-number-of-outages/models/cmid-number-of-outages.model";
import { OutageIconClassesList } from "@widgets/CMID/cmid-number-of-outages/components/cmid-number-of-outages-card/enums/outage-icon-classes";

@Component({
    selector: 'evj-number-of-outages-card',
    templateUrl: './cmid-number-of-outages-card.component.html',
    styleUrls: ['./cmid-number-of-outages-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmidNumberOfOutagesCardComponent {
    @Input() groups: INumberOfOutagesModel;

    public readonly outageIconClasses: { [key in OutageIconClassesList]: string } = {
        unauthorized: 'outage__icon_unauthorized',
        expired: 'outage__icon_expired',
        active: 'outage__icon_active'
    };

    getIconClass(plant: IPlant): string {
        if (plant.unauthorized > 0) {
            return this.outageIconClasses.unauthorized;
        }
        if (plant.unauthorized === 0 && plant.expired > 0) {
            return this.outageIconClasses.expired;
        }
        if (plant.expired === 0 && plant.total > 0) {
            return this.outageIconClasses.active;
        }
    }
}

import { Component, Inject, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import {
    IApsProgressBarSettings
} from '@shared/components/aps-progress-bar/aps-progress-bar.component';

export interface IDeviation {
    name: string;
    valuePositive: number;
    valueNegative?: number;
    progressBar?: IApsProgressBarSettings;
}

@Component({
    selector: 'evj-deviation-details',
    templateUrl: './deviation-details.component.html',
    styleUrls: ['./deviation-details.component.scss'],
})
export class DeviationDetailsComponent extends WidgetPlatform<unknown> implements OnInit {

    public deviations: IDeviation[] = [
        {
            name: 'АВТ-6',
            valuePositive: 127020,
            valueNegative: -258,
        },
        {
            name: 'АВТ-7',
            valuePositive: 67099,
            valueNegative: -162,
        },
        {
            name: 'АВТ-8',
            valuePositive: 257232,
            valueNegative: -393,
        },
        {
            name: 'АВТ-9',
            valuePositive: 382665,
            valueNegative: -78,
        },
        {
            name: 'АВТ-10',
            valuePositive: 701785,
            valueNegative: -244,
        },
        {
            name: 'Л-24-6',
            valuePositive: 56606,
            valueNegative: -457,
        },
        {
            name: 'Л-24-7',
            valuePositive: 20160,
            valueNegative: -133,
        },
        {
            name: 'Л-24-9',
            valuePositive: 190456,
        },
        {
            name: 'Л-24-10',
            valuePositive: 264544,
        },
        {
            name: 'Л-35/11-1000',
            valuePositive: 70358,
            valueNegative: -112,
        },
        {
            name: 'ГОБКК',
            valuePositive: 56046,
            valueNegative: -265,
        },
        {
            name: '25/12',
            valuePositive: 24193,
            valueNegative: -58,
        },
        {
            name: 'Изомалк 2',
            valuePositive: 28211,
            valueNegative: -225,
        },
        {
            name: '43-103',
            valuePositive: 97158,
            valueNegative: -756,
        },
    ];


    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
        this.deviations.forEach((deviation) => {
            deviation = this.countProgressBarValue(deviation);
            if (deviation.progressBar.value === 100) {
                deviation.progressBar.barColor = '#008DEB';
            }
        });
    }

    private countProgressBarValue(deviation: IDeviation): IDeviation {
        const newProgressBar = deviation.progressBar ? deviation.progressBar : {};
        if (deviation.valueNegative) {
            newProgressBar.value = Math.round((1 - Math.abs(deviation.valueNegative) * 100 / deviation.valuePositive) * 100);
        } else {
            newProgressBar.value = 100;
        }
        deviation.progressBar = newProgressBar;
        return deviation;
    }

    protected dataHandler(ref: any): void {
    }

    public onClick(): void {
        console.log('click');
    }
}

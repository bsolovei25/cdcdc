import { Component, Inject, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IApsProgressBarSettings } from '@shared/components/aps-progress-bar/aps-progress-bar.component';

export interface IProductionDetails {
    name: string;
    valuePositive: number;
    valueNegative?: number;
    progressBar?: IApsProgressBarSettings;
}

@Component({
    selector: 'evj-production-details',
    templateUrl: './production-details.component.html',
    styleUrls: ['./production-details.component.scss'],
})
export class ProductionDetailsComponent extends WidgetPlatform<unknown> implements OnInit {
    public details: IProductionDetails[] = [
        {
            name: 'Алкилат 25/12',
            valuePositive: 22795,
            valueNegative: -244,
        },
        {
            name: 'смесь бенз.риформ.',
            valuePositive: 61409,
            valueNegative: -107,
        },
        {
            name: 'Бензин ГОБКК',
            valuePositive: 55549,
            valueNegative: -221,
        },
        {
            name: 'МТБЭ',
            valuePositive: 4896,
            valueNegative: -97,
        },
        {
            name: 'Гексан. изомеризат',
            valuePositive: 10588,
            valueNegative: -21,
        },
        {
            name: 'Бутан нормальный',
            valuePositive: 12732,
            valueNegative: -118,
        },
        {
            name: 'Смесь ББФ и изобутан',
            valuePositive: 5324,
            valueNegative: -132,
        },
        {
            name: 'Компонент.ТС-1 АТ-9',
            valuePositive: 31885,
            valueNegative: -15,
        },
        {
            name: 'Компонент.ТС-1 АВТ-10',
            valuePositive: 54697,
            valueNegative: -76,
        },
        {
            name: 'Фр.ДТ "ЗИМ." Г/О 24-6',
            valuePositive: 20105,
            valueNegative: -44,
        },
        {
            name: 'Фр.ДТ "ЛЕТ." ГОДТ-10',
            valuePositive: 248045,
        },
        {
            name: 'Фр.ДТ "АРК." Г/О 24-6',
            valuePositive: 23275,
            valueNegative: -65,
        },
        {
            name: 'Компонент Кот. топ-ва КТ',
            valuePositive: 61902,
            valueNegative: -54,
        },
        {
            name: 'Смесь гудрона',
            valuePositive: 41536,
            valueNegative: -341,
        },
    ];

    constructor(
        protected widgetService: WidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
        this.details.forEach((deviation) => {
            deviation = this.countProgressBarValue(deviation);
            if (deviation.progressBar.value === 100) {
                deviation.progressBar.barColor = '#008DEB';
            }
        });
    }

    private countProgressBarValue(details: IProductionDetails): IProductionDetails {
        const newProgressBar = details.progressBar ? details.progressBar : {};
        if (details.valueNegative) {
            newProgressBar.value = Math.round(
                (1 - (Math.abs(details.valueNegative) * 100) / details.valuePositive) * 100
            );
        } else {
            newProgressBar.value = 100;
        }
        details.progressBar = newProgressBar;
        return details;
    }

    protected dataHandler(ref: any): void {}

    public onClick(): void {
        console.log('click');
    }
}

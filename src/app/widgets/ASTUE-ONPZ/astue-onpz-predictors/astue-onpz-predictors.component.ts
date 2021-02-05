import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { SelectionModel } from '@angular/cdk/collections';
import { AstueOnpzService, IAstueOnpzPredictor } from '../astue-onpz-shared/astue-onpz.service';
import {
    AstueOnpzConventionalFuelService,
    IAstueOnpzConventionalFuelSelectOptions,
} from '../astue-onpz-conventional-fuel/astue-onpz-conventional-fuel.service';

interface IPredictors {
    isHidden: boolean;
    id: string;
    name: string;
    label: string;
    colorIndex: number;
    isActive?: boolean;
    tag: string;
    unitId: number;
    unitName: string;
}

@Component({
    selector: 'evj-astue-onpz-predictors',
    templateUrl: './astue-onpz-predictors.component.html',
    styleUrls: ['./astue-onpz-predictors.component.scss'],
})
export class AstueOnpzPredictorsComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    selectPredictors: SelectionModel<string> = new SelectionModel<string>(true);
    data: IPredictors[] = [];
    colors: Map<string, number>;

    constructor(
        private conventionalFuelService: AstueOnpzConventionalFuelService,
        protected widgetService: WidgetService,
        private astueOnpzService: AstueOnpzService,
        private cdRef: ChangeDetectorRef,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.astueOnpzService.clearColors();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.setOptionsWs(this.id);
        this.subscriptions.push(
            this.conventionalFuelService.selectedOptions?.subscribe((ref) => {
                this.selectPredictors.clear();
                this.astueOnpzService.setPredictors(this.id, []);
                this.data = [];
                this.optionsHandler(ref).then();
            })
        );
    }

    setOptionsWs(predictorWidgetId: string): void {
        this.astueOnpzService.setPredictors(predictorWidgetId, []);
    }

    protected dataHandler(ref: { predictors: IPredictors[] }): void {
        this.data = ref.predictors.filter((item) => !item.isHidden);
        if (ref.predictors[0]?.id === '0') {
            console.log('ID предиктора равна 0'); // проверка данных с backend
        }
        this.subscriptions.push(
            this.astueOnpzService.colors$.subscribe((value) => {
                this.colors = value;
            })
        );
    }

    changeToggle(item: IPredictors, color: number): void {
        this.selectPredictors.toggle(item.id);
        if (!this.selectPredictors.isSelected(item.id)) {
            this.astueOnpzService.deleteTagToColor(color, item.tag);
        }
        const arr: IAstueOnpzPredictor[] = [];
        this.selectPredictors.selected.forEach((id) => {
            const el: IPredictors = this.data.find((value) => value.id === id);
            arr.push({ name: el?.name, id: el?.id, colorIndex: el?.colorIndex });
            if (!this.astueOnpzService.colors$.getValue()?.has(el?.tag)) {
                this.astueOnpzService.addTagToColor(el?.tag);
            }
        });

        this.astueOnpzService.setPredictors(this.id, arr);
        this.cdRef.detectChanges();
    }

    private async optionsHandler(options: IAstueOnpzConventionalFuelSelectOptions): Promise<void> {
        const channels = await this.widgetService.getAvailableChannels<{
            name: string;
            id: string;
        }>(this.widgetId);
        const subchannelId = channels.find((x) => x.name === options.fuel).id;
        this.setWsOptions({ subchannelId });
    }
}

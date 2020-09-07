import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { SelectionModel } from '@angular/cdk/collections';
import {
    AstueOnpzService,
    IAstueOnpzPredictorsOptions
} from '../astue-onpz-shared/astue-onpz.service';

interface IPredictors {
    id: number;
    name: string;
    label: string;
    colorIndex: number;
    isActive?: boolean;
}

@Component({
    selector: 'evj-astue-onpz-predictors',
    templateUrl: './astue-onpz-predictors.component.html',
    styleUrls: ['./astue-onpz-predictors.component.scss']
})
export class AstueOnpzPredictorsComponent extends WidgetPlatform implements OnInit, OnDestroy {

    selectPredictors: SelectionModel<number> = new SelectionModel<number>(true);
    data: IPredictors[] = [];

    constructor(
        protected widgetService: WidgetService,
        private astueOnpzService: AstueOnpzService,
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
    }

    protected dataHandler(ref: { predictors: IPredictors[] }): void {
        if (this.selectPredictors.selected.length === 0) {
            this.data = ref.predictors;
            ref.predictors.forEach(value => value.isActive ?
                this.selectPredictors.select(value.id) : null);
        } else {
            ref.predictors.forEach(value => {
                this.selectPredictors.isSelected(value.id) ?
                    value.isActive = true : value.isActive = false;
            });
            this.data = ref.predictors;
        }
        this.changeToggle();
    }

    changeToggle(): void {
        const arr: IAstueOnpzPredictorsOptions[] = [];
        this.selectPredictors.selected.forEach(id => {
            const el = this.data.find(value => value.id === id);
            arr.push({ name: el?.name, id: el?.id, colorIndex: el?.colorIndex });
        });
        this.astueOnpzService.setPredictors(arr);
    }

}

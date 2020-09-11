import {
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    OnInit
} from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { SelectionModel } from '@angular/cdk/collections';
import {
    AstueOnpzService, IAstueOnpzColors,
    IAstueOnpzPredictorsOptions
} from '../astue-onpz-shared/astue-onpz.service';

interface IPredictors {
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
    styleUrls: ['./astue-onpz-predictors.component.scss']
})
export class AstueOnpzPredictorsComponent extends WidgetPlatform implements OnInit, OnDestroy {
    selectPredictors: SelectionModel<string> = new SelectionModel<string>(true);
    data: IPredictors[] = [];
    colors: Map<string, number>;

    constructor(
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
    }

    protected dataHandler(ref: { predictors: IPredictors[] }): void {
        this.data = ref.predictors;
        console.log(ref.predictors);
        if (ref.predictors[0]?.id === '0') {
            console.log('ID предиктора равна 0');  // проверка данных с backend
        }
        this.subscriptions.push(
            this.astueOnpzService.colors$.subscribe((value) => {
                this.colors = value;
            })
        );
    }

    changeToggle(item: IPredictors, color: number): void {
        this.selectPredictors.toggle(item.id);
        if (this.selectPredictors.isSelected(item.id)) {
            this.astueOnpzService.deleteTagToColor(color);
        }
        const arr: IAstueOnpzPredictorsOptions[] = [];

        this.selectPredictors.selected.forEach((id) => {
            const el: IPredictors = this.data.find((value) => value.id === id);
            arr.push({ name: el?.name, id: el?.id, colorIndex: el?.colorIndex });
            if (!this.astueOnpzService.colors$.getValue()?.has(el?.tag)) {
                this.astueOnpzService.addTagToColor(el?.tag);
            }
        });

        this.astueOnpzService.setPredictors(arr);
        this.cdRef.detectChanges();
    }
}

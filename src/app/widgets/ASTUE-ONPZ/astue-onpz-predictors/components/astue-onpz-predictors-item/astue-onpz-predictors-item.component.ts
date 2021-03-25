import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { ChannelPlatform } from "../../../../../dashboard/models/@PLATFORM/channel-platform";
import { WidgetService } from "../../../../../dashboard/services/widget.service";
import { AstueOnpzService, IAstueOnpzPredictor } from "../../../astue-onpz-shared/astue-onpz.service";
import { SelectionModel } from "@angular/cdk/collections";
import { IPredictors } from "../../astue-onpz-predictors.component";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: 'evj-astue-onpz-predictors-item',
    templateUrl: './astue-onpz-predictors-item.component.html',
    styleUrls: ['./astue-onpz-predictors-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AstueOnpzPredictorsItemComponent extends ChannelPlatform<{ predictors: IPredictors[] }> implements OnInit, OnDestroy {
    public selectPredictors: SelectionModel<string> = new SelectionModel<string>(true);
    public data$: BehaviorSubject<IPredictors[]> = new BehaviorSubject<IPredictors[]>([]);
    public colors: Map<string, number>;

    constructor(
        protected widgetService: WidgetService,
        private astueOnpzService: AstueOnpzService,
        private cdRef: ChangeDetectorRef,
        @Inject('widgetId') public widgetId: string,
        @Inject('channelId') public channelId: string,
    ) {
        super(widgetId, channelId, widgetService);
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.subscriptions.push(
            this.astueOnpzService.colors$.subscribe((color) => {
                this.colors = color;
            })
        );
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: { predictors: IPredictors[] }): void {
        const data = ref.predictors.filter((item) => !item.isHidden);
        this.data$.next(data);

        if (ref.predictors[0]?.id === '0') {
            console.error('ID предиктора равна 0'); // проверка данных с backend
        }
    }

    public changeToggle(item: IPredictors, color: number): void {
        this.selectPredictors.toggle(item.id);
        if (!this.selectPredictors.isSelected(item.id)) {
            this.astueOnpzService.deleteTagToColor(color, item.tag);
        }
        const arr: IAstueOnpzPredictor[] = [];
        this.selectPredictors.selected.forEach((id) => {
            const el: IPredictors = this.data$.getValue().find((value) => value.id === id);
            arr.push({ name: el?.name, id: el?.id, colorIndex: el?.colorIndex });
            if (!this.astueOnpzService.colors$.getValue()?.has(el?.tag)) {
                this.astueOnpzService.addTagToColor(el?.tag);
            }
        });

        this.astueOnpzService.setPredictors(this.widgetId, arr);
        this.cdRef.detectChanges();
    }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ChannelPlatform } from '../../../../../dashboard/models/@PLATFORM/channel-platform';
import { WidgetService } from '../../../../../dashboard/services/widget.service';
import { AstueOnpzService, IAstueOnpzPredictor } from '../../../astue-onpz-shared/astue-onpz.service';
import { SelectionModel } from '@angular/cdk/collections';
import { IPredictors, IPredictorsGroup } from '../../astue-onpz-predictors.component';
import { BehaviorSubject } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PREDICTORS_DATA, PREDICTORS_GROUP_DATA } from '@widgets/ASTUE-ONPZ/astue-onpz-predictors/components/mock';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
    selector: 'evj-astue-onpz-predictors-item',
    templateUrl: './astue-onpz-predictors-item.component.html',
    styleUrls: ['./astue-onpz-predictors-item.component.scss'],
    animations: [
        trigger('rows', [
            state('collapsed', style({ opacity: 1, height: '0' })),
            state('expanded', style({ opacity: 1, height: '*' })),
            transition('collapsed => expanded', animate('200ms ease-in')),
            transition('expanded => collapsed', animate('200ms ease-out')),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AstueOnpzPredictorsItemComponent
    extends ChannelPlatform<{ predictors: IPredictors[] }>
    implements OnInit, OnDestroy {
    public selectPredictors: SelectionModel<string> = new SelectionModel<string>(true);
    public dataGroup$: BehaviorSubject<IPredictorsGroup[]> = new BehaviorSubject<IPredictorsGroup[]>(
        PREDICTORS_GROUP_DATA
    );
    public colors: Map<string, number>;

    public form: FormGroup = new FormGroup({
        search: new FormControl(null),
    });

    constructor(
        protected widgetService: WidgetService,
        private astueOnpzService: AstueOnpzService,
        private cdRef: ChangeDetectorRef,
        @Inject('widgetId') public widgetId: string,
        @Inject('channelId') public channelId: string
    ) {
        super(widgetId, channelId, widgetService);
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.subscriptions.push(
            this.astueOnpzService.colors$.subscribe((color) => {
                this.colors = color;
            }),
            this.form.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe((val) => {
                const data = this.dataGroup$.getValue();

                data.forEach((item, i) => {
                    let searchCount = 0;
                    item.predictors.forEach((predictor) => {
                        if (predictor.name.toLowerCase().indexOf(val.search.toLowerCase()) === -1) {
                            predictor.isFiltered = true;
                        } else {
                            predictor.isFiltered = false;
                            searchCount++;
                        }
                    });
                    item.isFiltered = !searchCount;
                    searchCount = 0;
                });

                this.dataGroup$.next(data);
            })
        );
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: { predictors: IPredictors[]; predictorsGroups: IPredictorsGroup[] }): void {
        let data: IPredictorsGroup[] = [
            ...ref.predictorsGroups,
            { id: 'without group', name: 'Без группы', predictors: ref.predictors ?? [] },
        ];

        data.forEach((item, i) => {
            item.predictors = item.predictors.filter((x) => !x?.isHidden);
        });
        data = data.filter((item) => !!item.predictors.length);

        const currentData: IPredictorsGroup[] = this.dataGroup$.getValue();
        data.forEach((item, i) => {
            const group = currentData.find((groupItem) => groupItem.id === item.id);
            if (!!group) {
                data[i].isExpanded = group?.isExpanded;
                data[i].isFiltered = group?.isFiltered;
                item.predictors.forEach((y, j) => {
                    const predictorsList = group.predictors.find((pred) => pred.id === y.id);
                    if (!!predictorsList) {
                        data[i].predictors[j].isFiltered = predictorsList?.isFiltered;
                    }
                });
            }
        });
        this.dataGroup$.next(data);
    }

    public changeToggle(item: IPredictors, color: number): void {
        this.selectPredictors.toggle(item.id);
        if (!this.selectPredictors.isSelected(item.id)) {
            this.astueOnpzService.deleteTagToColor(color, item.tag);
        }
        const arr: IAstueOnpzPredictor[] = [];
        this.selectPredictors.selected.forEach((id) => {
            let el: IPredictors;
            this.dataGroup$.getValue().some((group) => {
                const res = group.predictors.find((value) => value.id === id);
                if (!!res) {
                    el = res;
                }
                return res;
            });
            arr.push({ name: el?.name, id: el?.id, colorIndex: el?.colorIndex });
            if (!this.astueOnpzService.colors$.getValue()?.has(el?.tag)) {
                this.astueOnpzService.addTagToColor(el?.tag);
            }
        });

        this.astueOnpzService.setPredictors(this.widgetId, arr);
        this.cdRef.detectChanges();
    }

    public onClickRow(index: number): void {
        const currentValue: IPredictorsGroup[] = this.dataGroup$.getValue();
        currentValue[index].isExpanded = !currentValue[index].isExpanded;
        this.dataGroup$.next(currentValue);
    }
}

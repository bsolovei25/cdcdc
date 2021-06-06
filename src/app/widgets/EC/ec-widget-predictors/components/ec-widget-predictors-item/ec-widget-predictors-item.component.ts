import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ChannelPlatform } from '@dashboard/models/@PLATFORM/channel-platform';
import { WidgetService } from '@dashboard/services/widget.service';
import { EcWidgetService, IAstueOnpzPredictor } from '../../../ec-widget-shared/ec-widget.service';
import { SelectionModel } from '@angular/cdk/collections';
import { IPredictors } from '../../ec-widget-predictors.component';
import { BehaviorSubject } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IPredictorsResponse } from "@widgets/EC/ec-widget-predictors/ec-widget-predictors.component";

@Component({
    selector: 'evj-ec-widget-predictors-item',
    templateUrl: './ec-widget-predictors-item.component.html',
    styleUrls: ['./ec-widget-predictors-item.component.scss'],
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
export class EcWidgetPredictorsItemComponent
    extends ChannelPlatform<{ predictors: IPredictors[] }>
    implements OnInit, OnDestroy {
    @Input('data') public dataGroup$: BehaviorSubject<IPredictorsResponse> = new BehaviorSubject<IPredictorsResponse>(null);

    public selectPredictors: SelectionModel<string> = new SelectionModel<string>(true);
    public colors: Map<string, number>;

    public form: FormGroup = new FormGroup({
        search: new FormControl(null),
    });

    constructor(
        protected widgetService: WidgetService,
        private ecWidgetService: EcWidgetService,
        private cdRef: ChangeDetectorRef,
    ) {
        super('', '', widgetService);
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.subscriptions.push(
            this.ecWidgetService.colors$.subscribe((color) => {
                this.colors = color;
            }),
            this.form.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe((val) => {
                const data = this.dataGroup$.getValue();

                data.predictorsGroups.forEach((item, i) => {
                    let searchCount = 0;
                    item.predictors.forEach((predictor) => {
                        if (predictor.name.toLowerCase().indexOf(val.search.toLowerCase()) === -1
                            && predictor.label.toLowerCase().indexOf(val.search.toLowerCase()) === -1) {
                            predictor.isFiltered = true;
                        } else {
                            predictor.isFiltered = false;
                            searchCount++;
                        }
                    });
                    item.isFiltered = !searchCount;
                    searchCount = 0;
                });

                data.predictors.forEach(item => {
                    if (item.name.toLowerCase().indexOf(val.search.toLowerCase()) === -1
                        && item.label.toLowerCase().indexOf(val.search.toLowerCase()) === -1) {
                        item.isFiltered = true;
                    } else {
                        item.isFiltered = false;
                    }
                });

                this.dataGroup$.next(data);
            }),

            this.ecWidgetService.selectedEnergyResource$.subscribe(() => {
                this.selectPredictors.clear();
            })
        );
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(): void {}

    public changeToggle(item: IPredictors, color: number): void {
        this.ecWidgetService.setSelectedPredictor(item.id);
        this.selectPredictors.toggle(item.id);
        if (!this.selectPredictors.isSelected(item.id)) {
            this.ecWidgetService.deleteTagToColor(color, item.tag);
        }
        const arr: IAstueOnpzPredictor[] = [];
        this.selectPredictors.selected.forEach((id) => {
            let el: IPredictors;
            this.dataGroup$.getValue().predictorsGroups.some((group) => {
                const res = group.predictors.find((value) => value.id === id);
                if (!!res) {
                    el = res;
                }
                return res;
            });
            this.dataGroup$.getValue().predictors.forEach((res) => {
                if (res.id === id) {
                    el = res;
                }
            });
            arr.push({ name: el?.name, id: el?.id, colorIndex: el?.colorIndex });
            if (!this.ecWidgetService.colors$.getValue()?.has(el?.tag)) {
                this.ecWidgetService.addTagToColor(el?.tag);
            }
        });

        this.ecWidgetService.setPredictors(this.widgetId, arr);
        this.cdRef.detectChanges();
    }

    public onClickRow(index: number): void {
        const currentValue: IPredictorsResponse = this.dataGroup$.getValue();
        currentValue.predictorsGroups[index].isExpanded = !currentValue.predictorsGroups[index].isExpanded;
        this.dataGroup$.next(currentValue);
    }
}

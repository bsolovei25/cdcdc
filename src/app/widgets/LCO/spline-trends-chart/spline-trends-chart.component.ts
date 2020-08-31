import {
    Component,
    OnInit,
    Inject,
    OnDestroy,
    AfterViewInit
} from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import {
    ISplineDiagramData
} from './components/spline-diagram/spline-diagram.component';

@Component({
    selector: 'evj-spline-trends-chart',
    templateUrl: './spline-trends-chart.component.html',
    styleUrls: ['./spline-trends-chart.component.scss']
})
export class SplineTrendsChartComponent extends WidgetPlatform implements OnInit, OnDestroy, AfterViewInit {

    public data: ISplineDiagramData;

    constructor(
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
    }

    public ngAfterViewInit(): void {
        super.widgetInit();
    }

    private fillArray(data: { x: number, y: number }[], count: number): { x: number, y: number }[] {
        function getPrev(idx: number): { x: number, y: number } {
            const filterArray = data.filter((el) => el.x < idx);
            return filterArray.length > 0 ? filterArray[filterArray.length - 1] : null;
        }

        function getNext(idx: number): { x: number, y: number } {
            const filterArray = data.filter((el) => el.x > idx);
            return filterArray.length > 0 ? filterArray[0] : null;
        }

        const dataArray: { x: number, y: number }[] = [];
        for (let i = 0; i < count; i++) {
            dataArray.push(data.find((el) => el.x === i + 1) ?? null);
        }
        dataArray.forEach((el, idx) => {
            if (el) {
                return;
            }
            const prev = getPrev(idx + 1);
            const next = getNext(idx + 1);
            if (!prev && !next) {
                el = { x: idx + 1, y: 0 };
            } else if (!prev) {
                el = { x: idx + 1, y: next.y };
            } else if (!next) {
                el = { x: idx + 1, y: prev.y };
            } else {
                el = {
                    x: idx + 1,
                    y: prev.y + (idx + 1 - prev.x) / (next.x - prev.x) * (next.y - prev.y)
                };
            }
            dataArray[idx] = el;
        });
        return dataArray;
    }

    private processData(ref: any): ISplineDiagramData {
        function fieldHandler(field: {value: number, timeStamp: Date}[]): {x: number, y: number}[] {
            field = field.filter(el => new Date(el.timeStamp).getMonth() === new Date().getMonth());
            return field?.map(el => {return {
                x: new Date(el.timeStamp).getDate(),
                y: el.value,
            }; });
        }
        const result = {
            deviationValue: ref.deviationValue ?? 0,
            planValue: 0,
            fact: fieldHandler(ref.fact),
            plan: fieldHandler(ref.plan),
            lowBound: fieldHandler(ref.lowerBound),
            highBound: fieldHandler(ref.upperBound),
        };
        result.highBound = this.fillArray(result.highBound, 31);
        result.lowBound = this.fillArray(result.lowBound, 31);
        result.plan = this.fillArray(result.plan, 31);
        result.planValue = result.plan[result.plan.length - 1].y;
        return result;
    }

    protected dataHandler(ref: any): void {
        this.data = this.processData(ref);
        console.log(ref);
        console.log(this.data);
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}

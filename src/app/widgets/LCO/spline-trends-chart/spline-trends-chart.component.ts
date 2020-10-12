import {
    Component,
    OnInit,
    Inject,
    OnDestroy,
    AfterViewInit
} from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import {
    ISplineDiagramData
} from './components/spline-diagram/spline-diagram.component';

@Component({
    selector: 'evj-spline-trends-chart',
    templateUrl: './spline-trends-chart.component.html',
    styleUrls: ['./spline-trends-chart.component.scss']
})
export class SplineTrendsChartComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy, AfterViewInit {

    public data: ISplineDiagramData;

    public displayedMonth: Date;

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
        function splitHandler(field: {value: number, timeStamp: Date}[]): {value: number, timeStamp: Date}[][] {
            let tempArr = [];
            const resultArr = [];
            let month: number = new Date(field[0].timeStamp).getMonth();
            for (let i = 0; i <= field.length; i++) {
                const itemMonth = new Date(field[i]?.timeStamp).getMonth();
                if (field[i]?.timeStamp && (field[i]?.value || field[i]?.value === 0)) {
                    tempArr.push({
                        timeStamp: field[i]?.timeStamp,
                        value: field[i]?.value,
                    });
                }
                if (month !== itemMonth || i === field.length) {
                    resultArr.push(tempArr);
                    tempArr = [];
                }
                month = new Date(field[i]?.timeStamp).getMonth();
            }
            return resultArr;
        }

        function fieldHandler(field: {value: number, timeStamp: Date}[]): {x: number, y: number}[] {
            // field = field.filter(el => new Date(el.timeStamp).getMonth() === new Date().getMonth());
            const fieldNew = field?.map(el => {return {
                x: new Date(el.timeStamp).getDate(),
                y: el.value,
            }; });
            return [...new Map(fieldNew.map(item => [item.x, item])).values()];
        }

        this.displayedMonth = splitHandler(ref?.fact)[0][0].timeStamp;
        const numOfDays = this.getNumOfDays(this.displayedMonth);

        const result = {
            deviationValue: ref.deviation ?? 0,
            planValue: 0,
            fact: fieldHandler(splitHandler(ref?.fact)[0]),
            plan: fieldHandler(splitHandler(ref?.plan)[0]),
            lowBound: fieldHandler(splitHandler(ref?.lowerBound)[0]),
            highBound: fieldHandler(splitHandler(ref?.upperBound)[0]),
        };
        result.highBound = this.fillArray(result.highBound, numOfDays);
        result.lowBound = this.fillArray(result.lowBound, numOfDays);
        result.plan = this.fillArray(result.plan, numOfDays);
        result.planValue = result.plan[result.plan.length - 1].y;
        return result;
    }

    private getNumOfDays(timeStamp: Date): number {
        return new Date((new Date(timeStamp)).getFullYear(), (new Date(timeStamp)).getMonth() + 1, 0).getDate();
    }

    protected dataHandler(ref: any): void {
        this.data = this.processData(ref);
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}

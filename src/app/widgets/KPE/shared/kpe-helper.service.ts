import { Injectable } from '@angular/core';
import { IKpeLineChartData } from './kpe-charts.model';
import { IBarDiagramData } from './kpe-equalizer-chart/kpe-equalizer-chart.component';
import { IDeviationDiagramData } from './kpe-deviation-diagram/kpe-deviation-diagram.component';
import { IProductionTrend } from '../../../dashboard/models/LCO/production-trends.model';
import {consoleTestResultHandler} from "tslint/lib/test";

@Injectable()
export class KpeHelperService {

    constructor() { }

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

    public prepareKpeLineChartData(data: IKpeLineChartData[] | null): IDeviationDiagramData[] | IBarDiagramData[] {
        if (!data) { return; }
        function fieldHandler(field: {value: number, timeStamp: string}[]): {x: number, y: number}[][] {
            let tempArr = [];
            const resultArr = [];
            let month: number = new Date(field[0].timeStamp).getMonth();
            let day = 0;
            for (let i = 0; i <= field.length; i++) {
                const itemMonth = new Date(field[i]?.timeStamp).getMonth();
                const nextDay = new Date(field[i]?.timeStamp).getDate();
                if (field[i]?.timeStamp && (field[i]?.value || field[i]?.value === 0) && day < nextDay) {
                    tempArr.push({
                        x: nextDay,
                        y: field[i]?.value,
                    });
                    day = nextDay;
                }
                if (month !== itemMonth || i === field.length) {
                    resultArr.push(tempArr);
                    tempArr = [];
                }
                month = new Date(field[i]?.timeStamp).getMonth();
            }
            return resultArr;
        }

        function distinct(array: {x: number, y: number}[]): {x: number, y: number}[] {
            return [...new Map(array.map(item => [item.x, item])).values()];
        }

        let planArray = [];
        let factArray = [];

        let displayedMonth = new Date();
        data.forEach(item => {
            if (item.graphType === 'fact') {
                displayedMonth = new Date(item.graph[0].timeStamp);
            }
        });

        const numOfDays = this.getNumOfDays(displayedMonth);

        data.forEach(item => {
            if (item.graphType === 'plan') {
                planArray = this.fillArray(distinct(fieldHandler(item.graph)[0]), numOfDays);
            }
            if (item.graphType === 'fact') {
                factArray = distinct(fieldHandler(item.graph)[0]);
            }
        });

        const resultData = [];

        planArray.forEach(item => {
            const factValue = factArray.find(factItem => factItem.x === item.x);
            resultData.push({
                day: item.x,
                planValue: item.y,
                factValue: factValue ? factValue.y : 0,
            });
        });

        return resultData;
    }

    public prepareKpeTrendChartData(data: IProductionTrend[]): IProductionTrend[] {
        function fieldHandler(field: {value: number, timeStamp: Date}[]): {value: number, timeStamp: any}[] {
            field.filter(el => new Date(el.timeStamp).getMonth() === new Date().getMonth());
            return field?.map(el => {return {
                timeStamp: new Date(el.timeStamp).setHours(0, 0, 0, 0),
                value: el.value,
            }; });
        }

        function distinct(array: {value: number, timeStamp: Date}[]): {value: number, timeStamp: Date}[] {
            return [...new Map(array.map(item => [item.timeStamp, item])).values()];
        }

        function fill(array: {value: number, timeStamp: Date}[]): {value: number, timeStamp: Date}[] {
            const now = new Date();
            const n = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
            let i = array.length - 1;
            while (i <= n) {
                const newDate = new Date(array[array.length - 1].timeStamp);
                array.push({
                    timeStamp: new Date(newDate.setDate(newDate.getDate() + 1)),
                    value: array[array.length - 1].value,
                });
                i++;
            }
            return array;
        }

        data.map(item => {
            item.graph = distinct(fieldHandler(item.graph));
            if (item.graphType === 'higherBorder' || item.graphType === 'lowerBorder') {
                item.graph = fill(item.graph);
            }
        });

        return data;
    }

    public compare<T>(a: T[], b: T[]): boolean {
        for (const item in a) {
            for (const property in a[item]) {
                if (a[item][property] !== b[item][property]) {
                    return false;
                }
            }
        }
        return true;
    }

    public sortArray<T>(
        arr: T[],
        n: number
    ): T[][] {
        let i = 0;
        let j = 0;
        const result = [];
        let temp = [];
        for (const item of arr) {
            i++;
            j++;
            temp.push(item);
            if (i === n || j === arr.length) {
                result.push(temp);
                temp = [];
                i = 0;
            }
        }
        return result;
    }

    public getNumOfDays(timeStamp: Date): number {
        return new Date((new Date(timeStamp)).getFullYear(), (new Date(timeStamp)).getMonth() + 1, 0).getDate();
    }
}

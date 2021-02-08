import { IProductionTrend } from '../../dashboard/models/LCO/production-trends.model';
import { IChartMini } from '../models/smart-scroll.model';

export function fillDataArray(
    data: IProductionTrend[],
    isFutureFilling: boolean = false,
    isFillPlan: boolean = false,
    startTime: number = null,
    endTime: number = null
): void {
    data.forEach((item) => {
        if (!item.graph?.length) {
            return;
        }
        // обнуление значений милисекунд, секунд и минут
        item.graph.forEach((val) => val.timeStamp.setMinutes(0, 0, 0));
        // заполнение пропусков в массиве
        const arr = item.graph;
        for (let idx = 0; idx < arr.length; idx++) {
            const el = arr[idx];
            if (!!idx) {
                const lastEl = arr[idx - 1];
                let a = (el.timeStamp.getTime() - lastEl.timeStamp.getTime()) / (1000 * 60 * 60);
                if (a !== 1) {
                    const array: IChartMini[] = [];
                    const step = (el.value - lastEl.value) / a;
                    const timestamp = lastEl.timeStamp;
                    let hours = timestamp.getHours() + 1;
                    let val = lastEl.value;
                    while (a > 1) {
                        val += step;
                        const date = new Date(timestamp);
                        date.setHours(hours);
                        const newEl: IChartMini = {
                            value: val,
                            timeStamp: date,
                        };
                        array.push(newEl);
                        hours++;
                        a--;
                    }
                    arr.splice(idx, 0, ...array);
                }
            }
        }
        // зачистка повторяющихся дат
        const filteredArray: IChartMini[] = [];
        item.graph.forEach((val, idx, array) => {
            const filtered = array.filter((el) => el.timeStamp.getTime() === val.timeStamp.getTime());
            val.value = filtered.reduce((acc, elem) => acc + elem.value, 0) / filtered.length;
            if (
                !filteredArray.length ||
                filteredArray[filteredArray.length - 1].timeStamp.getTime() !== val.timeStamp.getTime()
            ) {
                filteredArray.push({ value: val.value, timeStamp: val.timeStamp });
            }
        });
        item.graph = filteredArray;

        // проверка режима работы
        const fillCharts: { [key: string]: boolean } = {
            higherBorder: true,
            lowerBorder: true,
            plan: isFillPlan,
        };
        if (startTime && endTime) {
            // заполнение массива по краям
            if (isFutureFilling && fillCharts[item.graphType]) {
                while (item.graph[0].timeStamp.getTime() > startTime) {
                    item.graph.unshift({
                        value: item.graph[0].value,
                        timeStamp: new Date(item.graph[0].timeStamp.getTime() - 1000 * 60 * 60),
                    });
                }
                while (item.graph[item.graph.length - 1].timeStamp.getTime() < endTime) {
                    item.graph.push({
                        value: item.graph[item.graph.length - 1].value,
                        timeStamp: new Date(item.graph[item.graph.length - 1].timeStamp.getTime() + 1000 * 60 * 60),
                    });
                }
            }
            // фильтрация по началу и окончанию периода
            item.graph = item.graph.filter(
                (g) => g.timeStamp.getTime() >= startTime && g.timeStamp.getTime() <= endTime
            );
        }
    });
}

export function fillDataArrayChart(
    points: IChartMini[],
    startTime: number = null,
    endTime: number = null,
    isFutureFilling: boolean = false
): IChartMini[] {
    if (!points?.length) {
        return points;
    }
    // points.forEach((val) => val.timeStamp.setMinutes(0, 0, 0));
    // заполнение пропусков в массиве
    const arr = points;
    for (let idx = 0; idx < arr.length; idx++) {
        const el = arr[idx];
        if (idx > 0) {
            const lastEl = arr[idx - 1];
            let a = (el.timeStamp.getTime() - lastEl.timeStamp.getTime()) / (1000 * 60 * 60);
            if (a > 1) {
                const array: IChartMini[] = [];
                const step = (el.value - lastEl.value) / a;
                const timestamp = lastEl.timeStamp;
                let hours = timestamp.getHours() + 1;
                let val = lastEl.value;
                while (a > 1) {
                    val += step;
                    const date = new Date(timestamp);
                    date.setHours(hours);
                    const newEl: IChartMini = {
                        value: val,
                        timeStamp: date,
                    };
                    array.push(newEl);
                    hours++;
                    a--;
                }
                arr.splice(idx, 0, ...array);
            }
        }
    }
    // зачистка повторяющихся дат
    const filteredArray: IChartMini[] = [];
    points.forEach((val, idx, array) => {
        const filtered = array.filter((el) => el.timeStamp.getTime() === val.timeStamp.getTime());
        val.value = filtered.reduce((acc, elem) => acc + elem.value, 0) / filtered.length;
        if (
            !filteredArray.length ||
            filteredArray[filteredArray.length - 1].timeStamp.getTime() !== val.timeStamp.getTime()
        ) {
            filteredArray.push({ value: val.value, timeStamp: val.timeStamp });
        }
    });
    points = filteredArray;

    if (startTime && endTime) {
        // заполнение массива по краям
        if (isFutureFilling) {
            while (points[0].timeStamp.getTime() > startTime) {
                points.unshift({
                    value: points[0].value,
                    timeStamp: new Date(points[0].timeStamp.getTime() - 1000 * 60 * 60),
                });
            }
            while (points[points.length - 1].timeStamp.getTime() < endTime) {
                points.push({
                    value: points[points.length - 1].value,
                    timeStamp: new Date(points[points.length - 1].timeStamp.getTime() + 1000 * 60 * 60),
                });
            }
        }
        // фильтрация по началу и окончанию периода
        points = points.filter((g) => g.timeStamp.getTime() >= startTime && g.timeStamp.getTime() <= endTime);
    }
    return points;
}

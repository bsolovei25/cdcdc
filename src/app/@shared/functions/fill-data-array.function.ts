import { IProductionTrend } from '../../dashboard/models/production-trends.model';
import { IChartMini } from '../models/smart-scroll.model';

export function fillDataArray(
    data: IProductionTrend[],
    deltaTime: number = 12,
    isFutureFilling: boolean = false
): void {
    data.forEach((item) => {
        // обнуление значений милисекунд, секунд и минут
        item.graph.forEach((val) => {
            val.timeStamp.setMilliseconds(0);
            val.timeStamp.setSeconds(0);
            val.timeStamp.setMinutes(0);
        });
        // вычисление дат начала и конца
        const end = item.graph[item.graph.length - 1].timeStamp;
        const start = new Date(end);
        start.setHours(end.getHours() - deltaTime);
        // фильтрация по дате начала
        item.graph = item.graph.filter((val) => val.timeStamp.getTime() >= start.getTime());
        // зачистка повторяющихся дат
        const filteredArray: IChartMini[] = [];
        item.graph.forEach((val, idx, array) => {
            const filtered = array.filter(
                (el) => el.timeStamp.getTime() === val.timeStamp.getTime()
            );
            val.value = filtered.reduce((acc, elem) => acc + elem.value, 0) / filtered.length;
            if (
                !filteredArray.length ||
                filteredArray[filteredArray.length - 1].timeStamp.getTime() !==
                    val.timeStamp.getTime()
            ) {
                filteredArray.push({ value: val.value, timeStamp: val.timeStamp });
            }
        });
        item.graph = filteredArray;
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
        // заполнение массива на deltaTime часов вперед
        if (
            isFutureFilling &&
            (item.graphType === 'higherBorder' || item.graphType === 'lowerBorder')
        ) {
            for (let i = 0; i < deltaTime; i++) {
                const val: IChartMini = {
                    value: arr[arr.length - 1].value,
                    timeStamp: new Date(arr[arr.length - 1].timeStamp),
                };
                val.timeStamp.setHours(val.timeStamp.getHours() + 1);
                arr.push(val);
            }
        }
    });
}

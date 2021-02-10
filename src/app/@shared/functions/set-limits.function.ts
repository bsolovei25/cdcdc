import { IChartMini } from '../models/smart-scroll.model';
import { IDatesInterval } from '../../dashboard/services/widget.service';

export function setLimits(data: IChartMini[], limits: IDatesInterval): IChartMini[] {
    if (limits) {
        Object.keys(limits).forEach((key) => {
            const findFunc = (item: IChartMini) => item.timeStamp.toString() === limits[key].toString();
            if (!data.find(findFunc)) {
                findAverage(data, limits[key]);
            }
        });

        return data.filter((item) => item.timeStamp >= limits.fromDateTime && limits.toDateTime >= item.timeStamp);
    }
    return data;
}

function findAverage(graph: IChartMini[], date: Date): void {
    const index = graph.findIndex((item) => item.timeStamp > date);

    if (!(index === -1 || index === 0)) {
        const coef =
            (date.getTime() - graph[index - 1].timeStamp.getTime()) /
            (graph[index].timeStamp.getTime() - graph[index - 1].timeStamp.getTime());

        const newPoint: IChartMini = {
            timeStamp: date,
            value: graph[index - 1].value + (graph[index].value - graph[index - 1].value) * coef,
        };
        graph.splice(index - 1, 0, newPoint);
    }
}

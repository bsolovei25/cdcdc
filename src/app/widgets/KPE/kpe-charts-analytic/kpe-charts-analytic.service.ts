import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IKpeChartsAnalyticGraphData } from '@dashboard/models/KPE/kpe-charts-analytic.model';

@Injectable({
  providedIn: 'root'
})
export class KpeChartsAnalyticDataService {
    private _chartData$: BehaviorSubject<IKpeChartsAnalyticGraphData[]> = new BehaviorSubject<IKpeChartsAnalyticGraphData[]>(null);

    public chartData$: Observable<IKpeChartsAnalyticGraphData[]> = this. _chartData$.asObservable();
    public setChartData(data: IKpeChartsAnalyticGraphData[]): void {
        this._chartData$.next(data);
    }
}

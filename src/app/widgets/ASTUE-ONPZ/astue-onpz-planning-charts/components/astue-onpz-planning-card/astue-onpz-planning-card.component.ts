import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IPlanningChart } from '../../astue-onpz-planning-charts.component';
import { AstueOnpzService } from '../../../astue-onpz-shared/astue-onpz.service';
import { Observable } from 'rxjs';
import { fillDataShape } from '../../../../../@shared/common-functions';

@Component({
    selector: 'evj-astue-onpz-planning-card',
    templateUrl: './astue-onpz-planning-card.component.html',
    styleUrls: ['./astue-onpz-planning-card.component.scss']
})
export class AstueOnpzPlanningCardComponent implements OnChanges, OnInit {
    @Input() private data: IPlanningChart;
    @Input() color: number = 1;

    public transformedData: IPlanningChart;

    constructor(private astueOnpzService: AstueOnpzService) {
    }

    public ngOnChanges(): void {
        this.transformedData = fillDataShape(this.data);
        this.transformedData.graph.forEach((item) => {
            item.graph.forEach((val) => {
                val.timeStamp = new Date(val.timeStamp);
            });
        });
        if (this.data?.title === this.astueOnpzService.sharedPlanningGraph$.getValue()?.title) {
            this.astueOnpzService.setPlanningGraph(this.data, true);
        }
    }

    get sharedGraph(): Observable<IPlanningChart> {
        return this.astueOnpzService.sharedPlanningGraph$.asObservable();
    }

    public ngOnInit(): void {
    }

    public graphOpen(): void {
        this.astueOnpzService.setPlanningGraph(this.data);
    }
}

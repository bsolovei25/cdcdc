import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IPlanningChart } from '../../ec-widget-planing-charts.component';
import { EcWidgetService } from '../../../ec-widget-shared/ec-widget.service';
import { Observable } from 'rxjs';
import { fillDataShape } from '@shared/functions/common-functions';

@Component({
    selector: 'evj-ec-widget-planning-card',
    templateUrl: './ec-widget-planning-card.component.html',
    styleUrls: ['./ec-widget-planning-card.component.scss'],
})
export class EcWidgetPlanningCardComponent implements OnChanges, OnInit {
    @Input() private data: IPlanningChart;
    @Input() color: number = 1;
    public scaleCounter: number = 1;
    set scale(isMinus: boolean) {
        let counter = this.scaleCounter + (+isMinus || -1);
        if (counter < 0) {
            counter = 0;
        }
        this.scaleCounter = counter;
    }

    public transformedData: IPlanningChart;

    constructor(private astueOnpzService: EcWidgetService) {}

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

    public ngOnInit(): void {}

    public graphOpen(): void {
        this.astueOnpzService.setPlanningGraph(this.data);
    }
}

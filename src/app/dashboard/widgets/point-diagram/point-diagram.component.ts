import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { NewWidgetService } from '../../services/new-widget.service';
import { Subscription } from 'rxjs';
import { IPointDiagramElement } from '../../models/point-diagram';

@Component({
    selector: 'evj-point-diagram',
    templateUrl: './point-diagram.component.html',
    styleUrls: ['./point-diagram.component.scss'],
})
export class PointDiagramComponent implements OnInit, OnDestroy {
    pointDiagramElements: IPointDiagramElement[] = [
        {
            norm: 0.2,
            percentageValue: 30.6,
            title: 'NO2',
            isCritical: false,
        },
        {
            norm: 0.4,
            percentageValue: 6.6,
            title: 'NO',
            isCritical: false,
        },
        {
            norm: 0.2,
            percentageValue: 80,
            title: 'NH3',
            isCritical: true,
        },
        {
            norm: 0.3,
            percentageValue: 0,
            title: 'C6H6',
            isCritical: false,
        },
        {
            norm: 0.01,
            percentageValue: 0,
            title: 'C6H5OH',
            isCritical: false,
        },
        {
            norm: 0.4,
            percentageValue: 62.6,
            title: 'NO',
            isCritical: false,
        },
        {
            norm: 0.008,
            percentageValue: 0,
            title: 'H2S',
            isCritical: false,
        },
    ];

    static itemCols: number = 23;
    static itemRows: number = 16;

    public units: string = '%';
    public title: string;
    public previewTitle: string;

    private subscriptions: Subscription[] = [];

    constructor(
        private widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscriptions.push(
            this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
                this.title = data.title;
                // this.code = data.code;
                this.units = data.units;
                // this.name = data.name;
                this.previewTitle = data.widgetType;
            })
        );
    }

    ngOnInit(): void {
        if (!this.isMock) {
            this.wsConnect();
        }
    }

    private wsConnect(): void {
        this.subscriptions.push(
            this.widgetService
                .getWidgetLiveDataFromWS(this.id, 'point-diagram')
                .subscribe((ref) => {
                    this.pointDiagramElements = ref.chartItems;
                })
        );
    }

    ngOnDestroy(): void {
        if (this.subscriptions) {
            for (const subscription of this.subscriptions) {
                subscription.unsubscribe();
            }
        }
    }

    containerIsMock(): string {
        return this.isMock ? '430px' : '100%';
    }
}

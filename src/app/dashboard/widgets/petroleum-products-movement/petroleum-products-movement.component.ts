import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';
import { transition, style, animate, trigger } from '@angular/animations';

@Component({
    selector: 'evj-petroleum-products-movement',
    templateUrl: './petroleum-products-movement.component.html',
    styleUrls: ['./petroleum-products-movement.component.scss'],
})
export class PetroleumProductsMovementComponent implements OnInit, OnDestroy {
    static itemCols: number = 23;
    static itemRows: number = 16;

    public units: string = '%';
    public title: string;
    public code: string;
    public previewTitle: string;

    private subscriptions: Subscription[] = [];

    public isWorkspace: boolean = true;

    public isShort: boolean = true;

    public isUpdateParamButton: boolean = false;

    constructor(
        private widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {}

    ngOnInit(): void {
        this.subscriptions.push(
            this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
                this.title = data.title;
                // this.code = data.code;
                this.units = data.units;
                // this.name = data.name;
                this.previewTitle = data.widgetType;
            })
        );

        if (!this.isMock) {
            //  this.wsConnect();
        }
    }

    // private wsConnect(): void {
    //     this.subscriptions.push(
    //         this.widgetService
    //             .getWidgetLiveDataFromWS(this.id, 'point-diagram')
    //             .subscribe((ref) => {
    //                 this.pointDiagramElements = ref.chartItems;
    //             })
    //     );
    // }

    ngOnDestroy(): void {
        if (this.subscriptions) {
            for (const subscription of this.subscriptions) {
                subscription.unsubscribe();
            }
        }
    }

    onChanged(type: string): void {
        switch (type) {
            case 'create':
                this.isWorkspace = false;
                this.isShort = false;
                this.isUpdateParamButton = false;
                break;
            case 'update':
                this.isUpdateParamButton = true;
                this.isWorkspace = true;
                this.isShort = false;
                break;
        }
    }

    onReturn(el: boolean): void {
        this.isWorkspace = el;
    }
}

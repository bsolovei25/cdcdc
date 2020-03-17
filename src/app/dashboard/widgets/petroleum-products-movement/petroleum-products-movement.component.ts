import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';
import { transition, style, animate, trigger } from '@angular/animations';
import { IOperation } from '../../models/petroleum-products-movement.model';
import { PetroleumScreenService } from '../../services/petroleum-screen.service';
import {WidgetPlatform} from "../../models/widget-platform";

@Component({
    selector: 'evj-petroleum-products-movement',
    templateUrl: './petroleum-products-movement.component.html',
    styleUrls: ['./petroleum-products-movement.component.scss'],
})
export class PetroleumProductsMovementComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public static itemCols: number = 23;
    public static itemRows: number = 16;

    // public units: string = '%';
    // public title: string;
    // public code: string;
    // public previewTitle: string;

    public isWorkspace: boolean = true;

    public isShort: boolean = true;

    public isUpdateParamButton: boolean = false;

    public typeScreen: string = 'info';

    protected isRealtimeData: boolean = false;

    constructor(
        protected widgetService: NewWidgetService,
        private petroleumService: PetroleumScreenService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.subscriptions.push(
            // this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
            //     this.title = data.title;
            //     // this.code = data.code;
            //     this.units = data.units;
            //     // this.name = data.name;
            //     this.previewTitle = data.widgetType;
            // }),

            this.petroleumService.date$.subscribe((data) => {
                this.typeScreen = data;
            })
        );
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
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

    public onReturn(el: boolean): void {
        this.isWorkspace = el;
    }
}

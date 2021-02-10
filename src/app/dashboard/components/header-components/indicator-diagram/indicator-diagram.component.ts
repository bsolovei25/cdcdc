import { IEventsWidgetNotification } from '../../../models/EVJ/events-widget';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WidgetService } from '../../../services/widget.service';

@Component({
    selector: 'evj-indicator-diagram',
    templateUrl: './indicator-diagram.component.html',
    styleUrls: ['./indicator-diagram.component.scss'],
})
export class IndicatorDiagramComponent implements OnInit, OnDestroy {
    data: {
        userId: number;
        notification: {
            notifications: IEventsWidgetNotification[];
            notificationsCount: number;
            responsibleId: number;
        };
        widgetType: string;
    };
    widgetId: string;

    menu: boolean = false;

    toggleMenu(): void {
        this.menu = !this.menu;
    }

    public subscriptions: Subscription[] = [];

    constructor(protected widgetService: WidgetService) {}

    ngOnInit(): void {
        this.subscriptions.push(
            this.widgetService.widgets.subscribe((widgets) => {
                if (widgets?.length) {
                    if (!this.widgetId) {
                        this.widgetId = widgets.find((value) => value.widgetType === 'evj-header')?.id;
                    }
                    this.subscriptions.push(
                        this.widgetService.getWidgetLiveDataFromWS(this.widgetId, 'evj-header').subscribe((value) => {
                            this.data = value;
                        })
                    );
                }
            })
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((el) => {
            try {
                el?.unsubscribe();
            } catch {}
        });
        this.subscriptions = [];
        this.widgetService.removeWidget(this.widgetId);
    }
}

import { Component, OnInit, Inject } from '@angular/core';
import { NewWidgetService } from 'src/app/dashboard/services/new-widget.service';
import { Subscription } from 'rxjs';
import { NewUserSettingsService } from 'src/app/dashboard/services/new-user-settings.service';

@Component({
    selector: 'evj-bar-charts',
    templateUrl: './bar-charts.component.html',
    styleUrls: ['./bar-charts.component.scss'],
})
export class BarChartsComponent implements OnInit {
    static itemCols = 24;
    static itemRows = 10;

    private subscription: Subscription;

    public title = 'Отклонения по качеству';
    public code;
    public units = 'шт.';
    public name;

    public datas = [];

    public previewTitle: string;

    public icon: string = 'valve';

    constructor(
        public widgetService: NewWidgetService,
        public userSettings: NewUserSettingsService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscription = this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
            this.title = data.title;
            this.code = data.code;
            //   this.units = data.units;
            this.name = data.name;
            this.previewTitle = data.widgetType;
            console.log(data.widgetType);
        });
    }

    ngOnInit() {
        this.showMock(this.isMock);
    }

    showMock(show) {
        if (show) {
            this.wsDisconnect();
        } else {
            this.wsConnect();
        }
    }

    private wsConnect() {
        this.widgetService.getWidgetLiveDataFromWS(this.id, 'bar-chart').subscribe((ref) => {
            if (this.datas.length === 0) {

                this.datas = ref.chartItems;
            }

        });
    }
    private wsDisconnect() {}

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onRemoveButton() {
        this.widgetService.removeItemService(this.uniqId);
        this.userSettings.removeItem(this.uniqId);
    }
}

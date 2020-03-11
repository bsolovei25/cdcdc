import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewWidgetService } from 'src/app/dashboard/services/new-widget.service';
import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';

@Component({
    selector: 'evj-truncated-pie-s-first',
    templateUrl: './truncated-pie-s-first.component.html',
    styleUrls: ['./truncated-pie-s-first.component.scss'],
})
export class TruncatedPieSFirstComponent extends WidgetPlatform implements OnInit {
    static itemCols = 15;
    static itemRows = 17;

    //private subscription: Subscription;

    public title;
    public code;
    public units = '%';
    public name;
    public icon = 'flask';
    public previewTitle: string = 'truncated-pie-s-first';

    public datas = [
        { name: 'Статическое Оборудование 1', plan: 5, value: 28 },
        { name: 'Статическое Оборудование 2', plan: 32, value: 5 },
        { name: 'Статическое Оборудование 3', plan: 100, value: 67 },
    ];

    constructor(
        public widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {

        super(widgetService, isMock, id, uniqId);
        // this.subscription = this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
        //     this.title = data.title;
        //     this.code = data.code;
        //     //  this.units = data.units;
        //     this.name = data.name;
        // });
    }

    ngOnInit() {
        super.widgetInit();
       // this.showMock(this.isMock);
    }

    protected dataHandler(ref: any): void {
        this.datas = ref.values;
    }

    // showMock(show) {
    //     if (show) {
    //         this.wsDisconnect();
    //     } else {
    //         this.wsConnect();
    //     }
    // }

    // private wsConnect() {
    //     this.widgetService
    //         .getWidgetLiveDataFromWS(this.id, 'truncated-diagram-percentage')
    //         .subscribe((ref) => {
    //             this.datas = ref.values;
    //         });
    // }
    // private wsDisconnect() {}

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}

import {Component, Inject, OnInit} from '@angular/core';
import {WidgetPlatform} from '@dashboard/models/@PLATFORM/widget-platform';
import {WidgetService} from '@dashboard/services/widget.service';
import {
    IAstueOnpzTableIndicatorsItem,
    IAstueOnpzTableIndicatorsItemChild
} from '@dashboard/models/ASTUE-ONPZ/astue-onpz-table-indicators.model';
import {SelectionModel} from '@angular/cdk/collections';
import {HttpClient} from '@angular/common/http';
import {VirtualChannel} from '@shared/classes/virtual-channel.class';
import {EcWidgetService} from '@widgets/EC/ec-widget-shared/ec-widget.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

interface ITableModelResponse {
    groups: IAstueOnpzTableIndicatorsItem[]
    isHistoricalDataSupported: boolean
    widgetType: string
}

@Component({
    selector: 'evj-ec-widget-table-model',
    templateUrl: './ec-widget-table-model.component.html',
    styleUrls: ['./ec-widget-table-model.component.scss'],
})
export class EcWidgetTableModelComponent extends WidgetPlatform<unknown> implements OnInit {
    public data: IAstueOnpzTableIndicatorsItem[] = [];
    public expandedElement: SelectionModel<string> = new SelectionModel(true);
    public data$: Observable<IAstueOnpzTableIndicatorsItem[]>;
    private virtualChannel: VirtualChannel<ITableModelResponse>;

    constructor(
        public widgetService: WidgetService,
        @Inject('widgetId') public id: string,
        private astueOnpzService: EcWidgetService,
        @Inject('uniqId') public uniqId: string,
        private http: HttpClient
    ) {
        super(widgetService, id, uniqId);
    }


    ngOnInit(): void {
        super.widgetInit();
        this.mockDataConnect();
    }

    public async mockDataConnect(): Promise<void> {
        this.data = await this.http.get<IAstueOnpzTableIndicatorsItem[]>('assets/mock/EC/ec-widget-table-model.json').toPromise();
    }

    public onClickTr(event: MouseEvent, element: IAstueOnpzTableIndicatorsItem): void {
        event.stopPropagation();
        if (this.expandedElement.isSelected(element.name)) {
            this.expandedElement.deselect(element.name);
        } else {
            this.expandedElement.select(element.name);
        }
    }

    public onClickRow(event: MouseEvent, element: IAstueOnpzTableIndicatorsItemChild): void {
        event.stopPropagation();
    }

    protected dataConnect(): void {
        super.dataConnect();
        const id = 'b81d3c9d-97a6-11eb-864f-525400a8470a'
        this.virtualChannel = new VirtualChannel<ITableModelResponse>(this.widgetService, {
            channelId: this.widgetId,
            subchannelId: id,
        })
        this.data$ = this.virtualChannel.data$
            .pipe(map(data => data.groups))
    }

    protected dataHandler(ref: unknown): void {
    }
}

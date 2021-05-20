import {Component, Inject, OnInit} from '@angular/core';
import {WidgetPlatform} from '@dashboard/models/@PLATFORM/widget-platform';
import {WidgetService} from '@dashboard/services/widget.service';
import {
    IAstueOnpzTableIndicatorsItem,
    IAstueOnpzTableIndicatorsItemChild
} from '@dashboard/models/ASTUE-ONPZ/astue-onpz-table-indicators.model';
import {SelectionModel} from '@angular/cdk/collections';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'evj-ec-widget-table-model',
    templateUrl: './ec-widget-table-model.component.html',
    styleUrls: ['./ec-widget-table-model.component.scss'],
})
export class EcWidgetTableModelComponent extends WidgetPlatform<unknown> implements OnInit {
    public data: IAstueOnpzTableIndicatorsItem[] = [];
    public expandedElement: SelectionModel<string> = new SelectionModel(true);

    constructor(
        public widgetService: WidgetService,
        @Inject('widgetId') public id: string,
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

    checkDeviation(plan: number, fact: number): boolean {
        return Math.abs(fact / plan * 100 - 100) > 2;
    }

    protected dataConnect(): void {
        super.dataConnect();
    }

    protected dataHandler(ref: unknown): void {
    }
}

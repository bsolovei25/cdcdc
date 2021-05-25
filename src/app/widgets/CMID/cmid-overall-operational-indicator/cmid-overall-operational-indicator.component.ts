import {
    Component,
    ChangeDetectionStrategy,
    Inject,
    OnInit
} from '@angular/core';
import {
    ICmidMultichartFilterModel,
    ICmidMultichartModel
} from './models/cmid-overall-operational-indicator.model';
import { WidgetService } from "@dashboard/services/widget.service";
import { WidgetPlatform } from "@dashboard/models/@PLATFORM/widget-platform";
import { cmidMultichartData } from "@widgets/CMID/cmid-overall-operational-indicator/const/cmid-overall-operational-indicator.constants";

@Component({
  selector: 'evj-cmid-overall-operational-indicator',
  templateUrl: './cmid-overall-operational-indicator.component.html',
  styleUrls: ['./cmid-overall-operational-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CmidOverallOperationalIndicatorComponent extends WidgetPlatform implements OnInit {
    public data: ICmidMultichartModel[] = [];
    public filterData: ICmidMultichartFilterModel[] = [];
    public graphLines: string[] = [];

    constructor(
        protected widgetService: WidgetService,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        this.data = cmidMultichartData;
        this.data.forEach((item: ICmidMultichartModel) => {
            this.graphLines.push(item.label);
            this.filterData.push({
                id: item.id,
                label: item.label,
                visible: item.visible
            })
        })
    }

    onGraphDataChanged(val: ICmidMultichartFilterModel): void {
        this.data = this.data.filter((item: ICmidMultichartModel) => {
            if (item.id === val.id) {
                item.visible = !item.visible;
            }
            return item;
        })
    }

    onGraphDataCleared(): void {
        this.data = this.data.filter((item: ICmidMultichartModel) => {
            item.visible = false;
            return item;
        })
    }

    protected dataHandler(ref: any): void {}
}

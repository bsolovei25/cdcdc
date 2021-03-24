import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IQualityReserveTableData, IQualityReserveTableHeaders } from "../../kpe-quality-reserve-table.component";
import { WidgetService } from "../../../../../dashboard/services/widget.service";
import { ChannelPlatform } from "../../../../../dashboard/models/@PLATFORM/channel-platform";
import { SpaceNumber } from "@shared/pipes/number-space.pipe";

export interface IQualityReserveTableMain {
    headers: IQualityReserveTableHeaders[];
    rows: IQualityReserveTableData[];
}

@Component({
    selector: 'evj-kpe-quality-reserve-table-item',
    templateUrl: './kpe-quality-reserve-table-item.component.html',
    styleUrls: ['./kpe-quality-reserve-table-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class KpeQualityReserveTableItemComponent
    extends ChannelPlatform<IQualityReserveTableMain>
    implements OnInit, OnDestroy {
    public headers$: BehaviorSubject<IQualityReserveTableHeaders[]> = new BehaviorSubject<
        IQualityReserveTableHeaders[]
    >([]);
    public data$: BehaviorSubject<IQualityReserveTableData[]> = new BehaviorSubject<IQualityReserveTableData[]>([]);

    public displayedColumns: string[];

    constructor(
        protected widgetService: WidgetService,
        @Inject('widgetId') public widgetId: string,
        @Inject('channelId') public channelId: string,
        private spaceNumber: SpaceNumber
    ) {
        super(widgetId, channelId, widgetService);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: IQualityReserveTableMain): void {
        this.headers$.next(ref.headers);

        ref.rows.forEach((item) => {
            item.cells.forEach((cell) => {
                if (typeof cell.value === 'number') {
                    cell.value = this.spaceNumber.transform(+cell.value, 1);
                }
            });
        });

        this.data$.next(ref.rows);

        this.displayedColumns = [... new Array(ref.headers.length)].map((x, i) => '' + i)
    }
}

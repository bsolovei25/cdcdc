import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IQualityReserveTableData, IQualityReserveTableHeaders } from "../../kpe-quality-reserve-table.component";
import { WidgetService } from "@dashboard/services/widget.service";
import { ChannelPlatform } from "@dashboard/models/@PLATFORM/channel-platform";
import { SpaceNumber } from "@shared/pipes/number-space.pipe";
import { KpeQualityReserveTableService } from "@dashboard/services/widgets/KPE/kpe-quality-reserve-table.service";

export interface IQualityReserveTablesGroup {
    currentTables: IQualityReserveTableMain[];
}

export interface IQualityReserveTableMain {
    name: string;
    order: number;
    headers: IQualityReserveTableHeaders[];
    rows: IQualityReserveTableData[];
    displayedColumns: string[];
}

@Component({
    selector: 'evj-kpe-quality-reserve-table-item',
    templateUrl: './kpe-quality-reserve-table-item.component.html',
    styleUrls: ['./kpe-quality-reserve-table-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpeQualityReserveTableItemComponent
    extends ChannelPlatform<IQualityReserveTablesGroup>
    implements OnInit, OnDestroy {
    public headers$: BehaviorSubject<IQualityReserveTableHeaders[]> = new BehaviorSubject<
        IQualityReserveTableHeaders[]
    >([]);
    public data$: BehaviorSubject<IQualityReserveTableData[]> = new BehaviorSubject<IQualityReserveTableData[]>([]);

    public displayedColumns: string[];

    public tables$: BehaviorSubject<IQualityReserveTablesGroup> = new BehaviorSubject<IQualityReserveTablesGroup>(null);
    public chosenFilter: number;

    constructor(
        protected widgetService: WidgetService,
        private kpeQualityReserveTableService: KpeQualityReserveTableService,
        private changeDetectorRef: ChangeDetectorRef,
        @Inject('widgetId') public widgetId: string,
        @Inject('channelId') public channelId: string,
        private spaceNumber: SpaceNumber
    ) {
        super(widgetId, channelId, widgetService);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.subscriptions.push(
            this.kpeQualityReserveTableService.chosenFilter$.subscribe((filter) => {
                this.chosenFilter = filter;
                this.changeDetectorRef.markForCheck();
            })
        )
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(tables: IQualityReserveTablesGroup): void {
        // Копия обьекта для работы с его полями (Уход от мутаций)
        const ref = { ...tables };
        if (ref.currentTables.length) {
            ref.currentTables.forEach((table) => {
                table.rows.forEach((item) => {
                    item.cells.forEach((cell) => {
                        if (typeof cell.value === 'number' && typeof cell.valueInCash === 'number') {
                            cell.value = this.spaceNumber.transform(+cell.value, 1);
                            cell.valueInCash = this.spaceNumber.transform(+cell.valueInCash, 1);
                        }
                    });
                });
                // Использование поля name таблицы в качестве имени первого столбца
                if (table.headers.length) {
                    table.headers[0].name = table.name;
                    table.displayedColumns = [... new Array(table.headers.length)].map((x, i) => '' + i)
                }
            });
        }
        // Сортировка таблиц по полю order
        ref.currentTables.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0));

        this.tables$.next(ref);
    }
}

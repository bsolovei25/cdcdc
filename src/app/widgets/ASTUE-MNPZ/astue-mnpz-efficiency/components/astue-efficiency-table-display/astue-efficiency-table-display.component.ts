import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, OnChanges } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';
import {
    IAsEfUnitNew,
    IAsEfTable,
    IAsEfCell,
    IAsEfTableBlock,
    IAsEfScript,
    IAsEfTableRow,
    IAsPlanningTable,
    IAsEfTableComponent, IAsEfTableBlockComponent
} from "../../../../../dashboard/models/ASTUE/astue-efficiency.model";
import { AstueEfficiencyService } from '../../../../../dashboard/services/widgets/ASTUE/astue-efficiency.service';
import { WidgetService } from '../../../../../dashboard/services/widget.service';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';

@Component({
    selector: 'evj-astue-efficiency-table-display',
    templateUrl: './astue-efficiency-table-display.component.html',
    styleUrls: ['./astue-efficiency-table-display.component.scss'],
})
export class AstueEfficiencyTableDisplayComponent implements OnInit, OnChanges, OnDestroy {
    @Input() public isInitialDataShow: boolean = true;
    @Input() public allData: IAsEfUnitNew[] = [];
    @Input() planningTable: IAsPlanningTable[] = []; // Только для вкладки планирования
    @Output() private toggleDisplay: EventEmitter<true> = new EventEmitter<true>();

    public displayData: IAsEfTable[] = [];
    public displayDataComponent: IAsEfTableComponent[] = [];
    public dates: IAsEfCell[] = [];

    public data: IAsEfTableBlock[] = [];

    public deviationsData: IAsEfTableBlock[] = [];
    public deviationsDataComponent: IAsEfTableBlockComponent[] = [];

    public scripts: IAsEfScript[] = [];

    public isDropdownOpen: boolean = false;

    public blockSelection: SelectionModel<IAsEfTableBlock> = new SelectionModel<IAsEfTableBlock>(true);
    public newBlockSelection: SelectionModel<string> = new SelectionModel<string>(true);

    public scriptSelection: SelectionModel<any> = new SelectionModel<any>();

    currentDate: boolean = false;

    private subscriptions: Subscription[] = [];

    public restUrl: string;
    public readonly unit: string = 'Тонны';

    constructor(
        public AsEfService: AstueEfficiencyService,
        private widgetService: WidgetService,
        private http: HttpClient,
        configService: AppConfigService
    ) {
        this.restUrl = configService.restUrl;
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.AsEfService.selection$.subscribe(() => {
                this.displayData = [];
                this.dates = [];
                this.dataMapping();
                this.defineDates();
                this.defineSum();
                this.currentDate = this.widgetService.currentDates$.getValue() === null;
            })
        );
    }

    public ngOnChanges(): void {
        if (this.planningTable?.length > 0) {
            this.displayData = [];
            this.displayDataComponent = [];
            this.deviationsData = [];
            this.deviationsDataComponent = [];
            this.planningTable.forEach((plan) => {
                if (plan.title === 'Показатели') {
                    plan.data.forEach((row) => {
                        const newRows = [];
                        row.rows.forEach((rows) => {
                            const values = [];
                            rows.values.forEach((col) => {
                                values.push({
                                    date: col.date,
                                    value: col.value,
                                    isEditable: col.editable,
                                });
                            });
                            newRows.push({
                                name: rows.name,
                                values,
                            });
                        });
                        this.displayData.push({
                            unitName: row.title,
                            name: row.name,
                            rows: newRows,
                        });
                    });
                } else {
                    plan.data.forEach((row) => {
                        const children = [];
                        row.rows.forEach((rows) => {
                            const data = [];
                            rows.values.forEach((col) => {
                                data.push({
                                    date: col.date,
                                    value: col.value,
                                    isEditable: col.editable,
                                });
                            });
                            children.push({
                                name: rows.name,
                                data,
                            });
                        });
                        this.deviationsData.push({
                            unitName: row.title,
                            name: row.name,
                            children,
                        });
                    });
                }
            });
            this.mappingNewData();
            this.defineDatesPlanning();
        }
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subs) => subs.unsubscribe());
    }

    mappingNewData(): void {
        this.displayData.forEach((value) => {
            const idx = this.displayDataComponent.findIndex((value2) => value2.unitName === value.unitName);
            if (idx > -1) {
                this.displayDataComponent[idx].data.push(value);
            } else {
                this.displayDataComponent.push({
                    unitName: value.unitName,
                    data: [value],
                });
            }
        });
        this.deviationsData.forEach((value) => {
            const idx = this.deviationsDataComponent.findIndex((value2) => value2.unitName === value.unitName);
            if (idx > -1) {
                this.deviationsDataComponent[idx].data.push(value);
            } else {
                this.deviationsDataComponent.push({
                    unitName: value.unitName,
                    data: [value],
                });
            }
        });
    }

    private dataMapping(): void {
        this.allData.forEach((unit) => {
            const flows: string[] = this.AsEfService.isUnitSelected(unit);
            if (!!flows) {
                this.displayData.push(unit);
                unit.flows.forEach((flow) => {
                    if (flows.includes(flow.name)) {
                        flow.parent = unit.name;
                        this.displayData.push(flow);
                    }
                });
                this.displayData.forEach((x) => (x.rows = x.rows?.filter((r) => r !== null)));
            }
        });
    }

    private defineDates(): void {
        this.dates = this.displayData
            .flatMap((x) => x.rows)
            .sort(
                (a, b) => +(this.dates?.length < b?.values?.length) - +(this.dates?.length < a?.values?.length)
            )[0]?.values;
    }

    private defineDatesPlanning(): void {
        this.dates = this.deviationsData
            .flatMap((x) => x.children)
            .sort((a, b) => +(this.dates?.length < b.data.length) - +(this.dates?.length < a.data.length))[0]?.data;
    }

    private defineSum(): void {
        this.displayData.forEach((item) => {
            if (item.header?.values) {
                item.header.dataSummary = item.header?.values.reduce((acc, val) => acc + val?.value, 0);
            }
            item?.rows?.forEach((row) => {
                if (row?.dataSummary) {
                    row.dataSummary = row?.values.reduce((acc, val) => acc + val?.value, 0);
                }
            });
        });
    }

    public clickDisplayButton(): void {
        this.toggleDisplay.emit(true);
    }

    public defineDataSummary(row: IAsEfTableRow): void {
        const value: number = +(row.data.reduce((acc, item) => (acc += +item.value), 0) / row.data.length).toFixed(5);
        row.dataSummary = value.toString();
    }

    public toggleDropdown(): void {
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    public selectScript(script: IAsEfScript): void {
        this.scriptSelection.select(script);
        this.toggleDropdown();
    }

    getTable(): void {
        let query = '';
        const units = this.AsEfService.selectionUnit$.getValue();
        const dates = this.widgetService.currentDates$.getValue();
        this.AsEfService.selectionProduct$.getValue().forEach((value) => {
            query += `?productId=${value.id}`;
        });
        units.forEach((value) => {
            query += `&unitId=${value.id}`;
        });
        this.AsEfService.selectionFlow$.getValue().forEach((value) => {
            query += `&flowId=${value.id}`;
        });
        if (dates) {
            query += `&startTime=${dates.fromDateTime.toISOString()}&endTime=${dates.toDateTime.toISOString()}`;
        }
        const url = `${this.restUrl}/api/astue-service/Astue/export${query}`;
        this.AsEfService.fileSaver(url);
    }

    toggleEl(block: any): void {
        if (block.parent) {
            this.newBlockSelection.toggle(`${block.name} ${block.parent}`);
        } else {
            this.newBlockSelection.toggle(block.name);
        }
    }

    isSelectEl(block: any): boolean {
        if (block.parent) {
            return this.newBlockSelection.isSelected(`${block.name} ${block.parent}`);
        } else {
            return this.newBlockSelection.isSelected(block.name);
        }
    }
}

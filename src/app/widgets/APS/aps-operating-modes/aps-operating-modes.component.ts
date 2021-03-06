import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
export interface ITable {
    header: IHeaderName[];
    body: ITableToDisplay[];
}
import { ApsService } from '../../../dashboard/services/widgets/APS/aps.service';
import { formatDate } from '@angular/common';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { fillDataShape } from '@shared/functions/common-functions';

export interface ITableToDisplay {
    1?: string;
    2?: string;
    3?: string;
    4?: string;
    5?: string;
    6?: string;
    7?: string;
    8?: string;
}
export interface IHeaderName {
    key: number;
    title: string;
    isId?: boolean;
    writable?: boolean;
    headerType?: string;
}

@Component({
    selector: 'evj-aps-operating-modes',
    templateUrl: './aps-operating-modes.component.html',
    styleUrls: ['./aps-operating-modes.component.scss'],
})
export class ApsOperatingModesComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    @ViewChild(CdkVirtualScrollViewport, { static: false })
    public viewPort: CdkVirtualScrollViewport;

    data: ITableToDisplay[];
    editedData: ITableToDisplay[] = [];
    editMode: boolean = false;
    idIndex: number;

    selectedRow: number = -1;
    selectedColumn: number = -1;
    public headerName: IHeaderName[] = [];
    public headerNameFullData: IHeaderName[] = [];

    private isAllowScrollLoading: boolean = true;

    constructor(
        protected widgetService: WidgetService,
        public apsService: ApsService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();

        this.apsService.showTable$.subscribe((res) => {
            this.isAllowScrollLoading = true;
            this.editedData = [];
            this.data = [];
            this.headerName = [];
            if (res !== null) {
                this.headerNameFullData = res.header;
                res.header.forEach((item) => {
                    if (item?.isId) {
                        this.idIndex = item.key;
                    } else {
                        this.headerName.push(item);
                    }
                });
                this.data = this.mapTableBody(res);
            } else {
                this.data = [];
                this.headerName = [];
            }
        });
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: unknown): void {}

    async saveValues(): Promise<void> {
        this.editedData = Array.from(new Set(this.editedData)).map((x) => fillDataShape(x));
        this.headerName
            .filter((item) => item.headerType === 'bool')
            .forEach((boolItem) => {
                this.editedData.forEach(
                    (el) =>
                        (el[boolItem.key] =
                            ('' + !!+el[boolItem.key]).charAt(0).toUpperCase() + ('' + !!+el[boolItem.key]).slice(1))
                );
            });
        try {
            const res = await this.apsService.postReferenceBook(this.editedData, this.data);
        } catch {
            const newData = await this.apsService.getReferenceBook(
                this.apsService.selectTable$.getValue(),
                this.apsService.selectScenario$.getValue().scenarioId
            );
            this.apsService.showTable$.next(newData);
        } finally {
            this.discard();
        }
    }

    discard(): void {
        this.selectedRow = -1;
        this.selectedColumn = -1;
        this.editMode = false;
        this.editedData = [];
    }

    editValue(rowNumber: number, columnNumber: number): void {
        this.selectedRow = rowNumber;
        this.selectedColumn = columnNumber;
        this.editMode = true;
    }

    onChangeValue(e: any, key: number, rowNumber: number): void {
        this.editedData.push(this.data[rowNumber]);
        this.editedData[this.editedData.length - 1][key] = e.target.value;
    }

    getParseValue(value: string, type: string = 'text'): string | number {
        if (type === 'double') {
            if (+value % 0.00001 !== 0) {
                return (+value).toFixed(5);
            }
            return value;
        } else if (type === 'date') {
            const date = Date.parse(value);
            if (isNaN(date)) {
                return value;
            }
            return formatDate(date, 'yyyy-MM-dd', 'en');
            // return formatDate(date, 'yyyy-MM-dd | hh:mm', 'en');
        } else if (type === 'bool') {
            return value.toLowerCase() === 'true' ? 1 : 0;
        }
        return value;
    }

    public get inverseOfTranslation(): string {
        if (!this.viewPort || !this.viewPort['_renderedContentOffset']) {
            return '-0px';
        }
        const offset = this.viewPort['_renderedContentOffset'];
        return `-${offset + 3}px`;
    }

    public scrollHandler(event: { target: { offsetHeight: number; scrollTop: number; scrollHeight: number } }): void {
        if (
            event.target.offsetHeight + event.target.scrollTop + 100 >= event.target.scrollHeight &&
            this.data.length &&
            this.isAllowScrollLoading
        ) {
            this.isAllowScrollLoading = false;
            this.getNextData().then();
        }
    }

    private async getNextData(): Promise<void> {
        const table = await this.apsService.getNextChunk(this.data.length);
        const body = this.mapTableBody(table);
        if (!body.length) {
            return;
        }
        this.data = [...this.data, ...body];
        this.isAllowScrollLoading = true;
    }

    private mapTableBody(table: ITable): ITableToDisplay[] {
        table.body.forEach((str) => {
            Object.keys(str).forEach((x) => {
                str[x] = this.getParseValue(
                    str[x],
                    this.headerNameFullData.find((item) => item.key === +x)?.headerType
                );
            });
        });
        return table.body;
    }
}

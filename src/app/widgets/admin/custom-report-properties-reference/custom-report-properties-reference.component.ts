import { Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { WidgetPlatform } from "src/app/dashboard/models/@PLATFORM/widget-platform";
import { WidgetService } from "@dashboard/services/widget.service";
import { ReportsService } from "@dashboard/services/widgets/admin-panel/reports.service";
import { Subscription } from "rxjs";

export interface ICustomReportProperties {
    id?: number;
    name: string;
    source: string[];
    type: 'textBox' | 'dateTime' | 'comboBox' | 'checkBox' | 'custom';
    description: string;
    validationRule: string;
    isRequired: boolean;
    sortOrder?: number;
    openEdit?: boolean;
    open?: boolean;
}
@Component({
    selector: 'evj-custom-report-properties-reference',
    templateUrl: './custom-report-properties-reference.component.html',
    styleUrls: ['./custom-report-properties-reference.component.scss'],
})
export class CustomReportPropertiesReferenceComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    @ViewChild('propertiesReferenceTable') public testBlock: ElementRef;
    @ViewChild('customOptions') public testBlock2: ElementRef;

    indexColumn: number = null;
    idReferenceClick: number;

    isClickPushReference: boolean = false;

    isRefInput: boolean = false;
    isLongBlock: boolean = true;

    newRecordInReference: string;

    public data: ICustomReportProperties[];
    public dataCopy: ICustomReportProperties[];

    public isLoading: boolean = false;

    constructor(
        public widgetService: WidgetService,
        public reportService: ReportsService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
        this.widgetIcon = 'reference';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    @HostListener('document:resize', ['$event'])
    OnResize(): void {
        this.setStyleScroll();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.subscriptions.push(this.getReference());
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    setStyleScroll(): void {
        const rightScroll = document.getElementById('rightScrollReportRef');
        const leftScroll = document.getElementById('leftScrollReportRef');

        if (rightScroll) {
            if (rightScroll.scrollHeight !== rightScroll.clientHeight) {
                rightScroll.style.cssText = 'margin-left: 5px; width: calc(100% - 5px);';
            } else {
                rightScroll.style.cssText = 'margin-left: 10px; width: calc(100% - 10px);';
            }
        }

        if (leftScroll) {
            if (leftScroll.scrollHeight !== leftScroll.clientHeight) {
                leftScroll.style.cssText = 'margin-right: 0px; width: calc(100% - 5px);';
            } else {
                leftScroll.style.cssText = 'margin-right: 0px; width: calc(100% - 10px);';
            }
        }
    }

    protected dataHandler(ref: any): void {}

    getReference(): Subscription {
        return this.reportService.getCustomOptions().subscribe((data) => {
            this.dataCopy = data;
            this.data = this.dataCopy;
            this.setStyleScroll();
        });
    }

    onClickReference(data: ICustomReportProperties, index: number): void {
        this.idReferenceClick = data.id;
        this.indexColumn = index;
        this.setStyleScroll();
    }

    onPushReference(): void {
        this.isClickPushReference = false;
        const object: ICustomReportProperties = {
            name: this.newRecordInReference,
            description: '',
            type: 'textBox',
            validationRule: 'string',
            isRequired: false,
            source: null,
        };
        if (this.newRecordInReference.trim().length > 0 && this.newRecordInReference !== undefined) {
            this.reportService.postCustomOptions(object).subscribe(() => {
                this.getReference();
            });
            this.newRecordInReference = null;
        }
    }

    onPushBlockInReference(): void {
        this.isClickPushReference = true;
    }

    searchReference(event: any): void {
        if (event.key === 'Backspace') {
            this.data = this.dataCopy;
        }
        const record = event.currentTarget.value.toLowerCase();
        this.data = this.data.filter((e) => e.name.toLowerCase().indexOf(record.toLowerCase()) > -1);
        if (!event.currentTarget.value) {
            this.data = this.dataCopy;
        }
    }

    deleteReference(item: ICustomReportProperties): void {
        this.isLoading = true;
        const windowsParam = {
            isShow: true,
            questionText: 'Вы уверены, что хотите удалить файл-шаблон?',
            acceptText: 'Да',
            cancelText: 'Нет',
            acceptFunction: () =>
                this.reportService.deleteCustomOptions(item.id).subscribe(
                    () => {
                        this.getReference();
                        this.isLoading = false;
                    },
                    () => {
                        this.isLoading = false;
                    }
                ),
            closeFunction: () => {
                this.reportService.closeAlert();
                this.isLoading = false;
            },
        };
        this.reportService.alertWindow$.next(windowsParam);
    }

    onEdit(item: ICustomReportProperties): void {
        item.openEdit = true;
    }

    editOptions(item: ICustomReportProperties): void {
        this.reportService.putCustomOptions(item).subscribe(() => {
            this.getReference();
        });
    }
}

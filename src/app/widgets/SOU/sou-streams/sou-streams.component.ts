import {
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef

} from '@angular/core';
import { WidgetService } from '@dashboard/services/widget.service';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { TITLES_OF_TABLE } from '@widgets/SOU/sou-streams/config';
import { animate, style, transition, trigger } from '@angular/animations';
import { SouStreamsService } from '@dashboard/services/widgets/SOU/sou-streams.service';
import { ISouStreamsTableContent } from '@dashboard/services/widgets/SOU/sou-streams.service';


@Component({
    selector: 'evj-sou-streams',
    templateUrl: './sou-streams.component.html',
    styleUrls: ['./sou-streams.component.scss'],
    animations: [
        trigger(
            'inOutAnimation',
            [
                transition(
                    ':enter',
                    [
                        style({ height: 0, opacity: 0, transform: 'translateY(-593px)' }),
                        animate('1s ease-out',
                            style({ height: 593, opacity: 1, transform: 'translateY(0px)' }))
                    ]
                ),
                transition(
                    ':leave',
                    [
                        style({ height: 300, opacity: 1 }),
                        animate('1s ease-in',
                            style({ height: 0, opacity: 0 }))
                    ]
                )
            ]
        )
    ]
})
export class SouStreamsComponent extends WidgetPlatform implements OnInit, AfterViewChecked, AfterViewInit, OnDestroy {

    public titlesOfTable: { name: string, type: string, bigBlock?: boolean }[] = TITLES_OF_TABLE;
    public tableRows: ISouStreamsTableContent[];
    public tableRowsAllOperations: ISouStreamsTableContent[];
    public tableRowsOpenOperations: ISouStreamsTableContent[] = [];

    public testData = [
        {
            name: 'Bol',
            date: '2021-05-18T00:01:00'
        },
        {
            name: 'Cest',
            date: '2021-05-19T00:01:00'
        },
        {
            name: 'A',
            date: '2021-05-18T00:01:10'
        }
    ]


    public toDateTime: string;
    public fromDateTime: string;

    public sourceMassValue: number;
    public destinationMassValue: number;
    public deviationValue: number;

    public isReservoirTrendOpen: boolean = false;

    public heightOfTable: string = '400px';
    public heightOfViewPort: string = '335px';
    public widthOfTable: string = '1943.2px';
    public widthOfGraphic: number = 70;
    @ViewChild('widget') child: ElementRef;

    @ViewChild('overlayCustom') dialogTemplate: TemplateRef<any>;
    private overlayRef: OverlayRef;
    private portal: TemplatePortal;

    public showWorkspace: boolean = false;
    public show: boolean = true;

    constructor(
        private cdr: ChangeDetectorRef,
        public widgetService: WidgetService,
        public souStreamsService: SouStreamsService,
        private overlay: Overlay,
        private viewContainerRef: ViewContainerRef,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
        this.subscriptions.push(
            this.widgetService.currentDates$.subscribe(dates => {
                if (dates) {
                    this.fromDateTime = this.formatDate(dates.fromDateTime);
                    this.toDateTime = this.formatDate(dates.toDateTime);
                } else {
                    this.fromDateTime = this.formatDate(new Date());
                    this.toDateTime = this.fromDateTime;
                }
                console.log(this.fromDateTime + ' ' + this.toDateTime);
                this.souStreamsService.getTableContent(this.fromDateTime, this.toDateTime).then((res) => {
                    console.log(res);
                    this.tableRowsAllOperations = res;
                    this.tableRows = this.tableRowsAllOperations;
                    this.processDataOfTable();
                    this.calculateSumOfMass();
                    this.filterOpenOperations();
                });
                }
            )
        );
    }

    filterTable(titleName: string): void {
        const filterTableRows: ISouStreamsTableContent[] = [];
        this.tableRows.forEach((tableRow) => {
            filterTableRows.push(tableRow);
        });
        if ((titleName === 'startTime') || (titleName === 'endTime')) this.filterDates(titleName, filterTableRows);
        else this.filterStrings(titleName, filterTableRows);
    }

    filterDates(titleName: string, filterTableRows: ISouStreamsTableContent[]): void {
        filterTableRows =
            filterTableRows.sort((row1, row2) => {
                if ((!row1[titleName]) || (!row2[titleName])) return 0;
                // @ts-ignore
                return this.createDate(row1[titleName]) - this.createDate(row2[titleName]);
                }
            );
        this.tableRows = filterTableRows;
    }

    createDate(date: string): Date {
        const newDate = new Date();
        newDate.setFullYear(+date.slice(0, 4), +date.slice(5, 7), +date.slice(8, 10));
        newDate.setHours(+date.slice(11, 13), +date.slice(14, 16), +date.slice(17, 19));
        return newDate;
    }

    filterStrings(titleName: string, filterTableRows: ISouStreamsTableContent[]): void {
        filterTableRows =
            filterTableRows.sort((row1, row2) => {
                    if ((!row1[titleName]) || (!row2[titleName])) return 0;
                    if (row1[titleName] < row2[titleName]) {
                        return -1;
                    }
                    if ((row1[titleName] > row2[titleName])) return 1;
                    return 0;
                }
            );
        this.tableRows = filterTableRows;
    }

    showAllOperations(): void {
        this.tableRows = this.tableRowsAllOperations;
    }

    showOpenOperations(): void {
        this.tableRows = this.tableRowsOpenOperations;
    }

    filterOpenOperations(): void {
        this.tableRowsAllOperations.forEach((tableRow) => {
            if (!tableRow.endTime) {
                 this.tableRowsOpenOperations.push(tableRow);
            }
        });
    }

    processDataOfTable(): void {
        this.tableRowsAllOperations.forEach((tableRow) => {
            for (const tableRowKey in tableRow) {
                if (tableRow[tableRowKey] === 'Tank') {
                    tableRow[tableRowKey] = 'Резервуар';
                } else if (tableRow[tableRowKey] === 'Unit') {
                    tableRow[tableRowKey] = 'Установка';
                }
            }
        });
    }

    calculateSumOfMass(): void {
        this.sourceMassValue = 0;
        this.destinationMassValue = 0;
        this.deviationValue = 0;
        this.tableRowsAllOperations.forEach((tableRow) => {
            for (const tableRowKey in tableRow) {
                if (tableRowKey === 'sourceMass') {
                    tableRow[tableRowKey] = +tableRow[tableRowKey].toFixed(2);
                    this.sourceMassValue += tableRow[tableRowKey];
                } else if (tableRowKey === 'destinationMass') {
                    tableRow[tableRowKey] = +tableRow[tableRowKey].toFixed(2);
                    this.destinationMassValue += tableRow[tableRowKey];
                } else if (tableRowKey === 'deltaMass') {
                    tableRow[tableRowKey] = +tableRow[tableRowKey].toFixed(2);
                    this.deviationValue += tableRow[tableRowKey];
                }
            }
        });
        this.sourceMassValue = +this.sourceMassValue.toFixed(2);
        this.destinationMassValue = +this.destinationMassValue.toFixed(2);
        this.deviationValue = Math.abs(+this.deviationValue.toFixed(2));
    }

    formatDate(date: Date): string {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

    processDate(inputData: string): string {
        return `${inputData.slice(8, 10)}.${inputData.slice(5, 7)}.${inputData.slice(0, 4)},
        ${inputData.slice(11, 16)}`;
    }

    processWarningColor(inputColor: string): string {
        return (inputColor === 'blue') ? 'var(--color-table-line-blue)' :
            (inputColor === 'yellow') ? 'var(--color-sou-orange)' : 'var(--bg-body-color)';
    }

    ngAfterViewInit(): void {
        this.portal = new TemplatePortal(this.dialogTemplate, this.viewContainerRef);
        this.overlayRef = this.overlay.create({
            positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
            hasBackdrop: true
        });
        this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
    }

    overlayDetach(): void {
        this.overlayRef.detach();
    }

    ngOnDestroy(): void {
        this.overlayRef.dispose();
    }

    ngAfterViewChecked(): void {
        this.heightOfTable = this.child.nativeElement.clientHeight - 40 + 'px';
        this.heightOfViewPort = this.child.nativeElement.clientHeight - 115 + 'px';

        if (this.child.nativeElement.clientWidth >= 1943.2) {
            const graphic = this.child.nativeElement.clientWidth - 1943.2;
            this.widthOfTable = this.child.nativeElement.clientWidth + 'px';
            this.widthOfGraphic = 70 + graphic;
        } else {
            this.widthOfTable = '1943.2px';
        }
        this.cdr.detectChanges();
    }

    get stateName(): string {
        return this.show ? 'show' : 'hide';
    }

    protected dataHandler(ref: unknown): void {
    }

    toggle(): void {
        this.show = !this.show;
    }

    public addNewOperation(): void {
        this.showWorkspace = true;
        this.toggle();
        const height: number = this.showWorkspace ? 593 : 0;
        this.heightOfTable = this.child.nativeElement.clientHeight - 40 - height + 'px';
        this.heightOfViewPort = this.child.nativeElement.clientHeight - 115 - height + 'px';
        this.cdr.detectChanges();
    }
    public openReservoirTrend(): void {
        this.isReservoirTrendOpen = true;
    }

    public closeSmartTrend(): void {
        this.isReservoirTrendOpen = false;
        this.overlayDetach();
    }

    openDialog(): void {
        this.overlayRef?.attach(this.portal);
    }

}

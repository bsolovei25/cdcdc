import { Component, Inject,  OnDestroy, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '@dashboard/services/widget.service';
import { MatDialog } from '@angular/material/dialog';
import { KpeAccuracyTimelinesDataAddPlanComponent } from './components/kpe-accuracy-timelines-data-add-plan/kpe-accuracy-timelines-data-add-plan.component';
import { KpeAccuracyTimelinesDataEditPlanComponent } from './components/kpe-accuracy-timelines-data-edit-plan/kpe-accuracy-timelines-data-edit-plan.component';
import { IKpeAccuracyTimelinesHeaders, IKpeAccuracyTimelinesRow, IKpeAccuracyTimelinesData } from './kpe-accuracy-timelines-data.interface';
import { KpeHelperService } from '@widgets/KPE/shared/kpe-helper.service';

@Component({
    selector: 'evj-kpe-accuracy-timelines-data',
    templateUrl: './kpe-accuracy-timelines-data.component.html',
    styleUrls: ['./kpe-accuracy-timelines-data.component.scss'],
    animations: [
        trigger('Branch', [
            state(
                'collapsed',
                style({
                    height: 0,
                    transform: 'translateY(-8px)',
                    opacity: 0,
                    overflow: 'hidden'
                })
            ),
            state(
                'expanded',
                style({
                    height: '*',
                    opacity: 1
                })
            ),
            transition('collapsed => expanded', animate('150ms ease-in')),
            transition('expanded => collapsed', animate('150ms ease-out'))
        ])
    ]
})
export class KpeAccuracyTimelinesDataComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public cells: number[] = new Array(100);
    public percent: number = 97;
    public isExpanded: boolean = true;
    public rows: IKpeAccuracyTimelinesRow[] = [];
    public headers: IKpeAccuracyTimelinesHeaders = {
        Date: '',
        SubCategory: 0,
        Percent: 0,
        PercentageInfluence: 0,
        Categories: ''
    };
    public modifiedHeaderDate: string;
    public currentDate: string = '';
    public endMonth: string;
    public endYear: number;

    constructor(
        protected widgetService: WidgetService,
        private kpeHelperService: KpeHelperService,
        public dialog: MatDialog,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.subscriptions.push(
            this.widgetService.currentDates$.subscribe(dates => {
                dates ? this.generateDate(dates.toDateTime) : this.generateDate(new Date());
            })
        )
        this.currentDate = this.getDate();
    }

    protected dataHandler(ref: IKpeAccuracyTimelinesData): void {
        ref.headers.forEach(item => this.headers[item.name] = item.value);
        this.rows = this.filterByMonth(ref.rows);
        this.modifiedHeaderDate = this.kpeHelperService.transformDateToMonthYear(this.headers.Date);
    }

    private filterByMonth(rows: IKpeAccuracyTimelinesRow[]): IKpeAccuracyTimelinesRow[] {
        return rows.filter(row => new Date(row.dateOfAdjustment).getMonth() === new Date(this.headers.Date).getMonth())
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    public toggleBlock(): void {
        this.isExpanded = !this.isExpanded;
    }

    public openEdit(): void {
        this.dialog.open(KpeAccuracyTimelinesDataEditPlanComponent, {
            data: {
                date: this.headers.Date
            }
        });
    }

    public openAdd(): void {
        this.dialog.open(KpeAccuracyTimelinesDataAddPlanComponent, {
            data: {
                endMonth: this.endMonth,
                endYear: this.endYear
            }
        });
    }

    public getDate(): string {
        const today = new Date();
        const date = new Date(today.getFullYear(), today.getMonth() - 1, 1, 0, 0, 0, 0);
        const month = date.toLocaleString('Ru-ru', { month: 'long' });
        return month + ' ' + today.getFullYear();
    }

    public generateDate(date: Date): void {
        const generatedDate = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0 );
        this.endMonth = date.toLocaleString('Ru-ru', { month: 'long' });
        this.endYear = generatedDate.getFullYear();
    }
}

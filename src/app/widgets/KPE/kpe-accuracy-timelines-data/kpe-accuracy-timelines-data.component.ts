import { Component, Inject, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '@dashboard/services/widget.service';
import { MatDialog } from '@angular/material/dialog';
import { KpeExecutionProductionProgramEditPlaneComponent } from '../kpe-execution-production-program/components/kpe-execution-production-program-edit-plane/kpe-execution-production-program-edit-plane.component';
import { KpeExecutionProductionProgramAddPlanComponent } from '../kpe-execution-production-program/components/kpe-execution-production-program-add-plan/kpe-execution-production-program-add-plan.component';
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
export class KpeAccuracyTimelinesDataComponent extends WidgetPlatform<unknown> implements OnInit {
    public cells: number[] = new Array(100);
    public isExpanded: boolean = true;
    public rows: IKpeAccuracyTimelinesRow[] = [];
    public headers: IKpeAccuracyTimelinesHeaders = {
        Date: '',
        SubCategory: 0,
        Percent: 0,
        PercentageInfluence: 0,
        Categories: ''
    };

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
    }

    protected dataHandler(ref: IKpeAccuracyTimelinesData): void {
        ref.headers.forEach(item => this.headers[item.name] = item.value);
        this.rows = ref.rows;
        this.headers.Date = this.kpeHelperService.transformDateToMonthYear(this.headers.Date);
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
        this.dialog.open(KpeAccuracyTimelinesDataAddPlanComponent);
    }
}

import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { KpeExecutionProductionProgramAddPlanComponent } from './components/kpe-execution-production-program-add-plan/kpe-execution-production-program-add-plan.component';
import { KpeExecutionProductionProgramEditPlaneComponent } from './components/kpe-execution-production-program-edit-plane/kpe-execution-production-program-edit-plane.component';

@Component({
    selector: 'evj-kpe-execution-production-program',
    templateUrl: './kpe-execution-production-program.component.html',
    styleUrls: ['./kpe-execution-production-program.component.scss'],
    animations: [
        trigger('Branch', [
            state(
                'collapsed',
                style({
                    height: 0,
                    transform: 'translateY(-8px)',
                    opacity: 0,
                    overflow: 'hidden',
                })
            ),
            state(
                'expanded',
                style({
                    height: '*',
                    opacity: 1,
                })
            ),
            transition('collapsed => expanded', animate('150ms ease-in')),
            transition('expanded => collapsed', animate('150ms ease-out')),
        ]),
    ],
})
export class KpeExecutionProductionProgramComponent extends WidgetPlatform<unknown> implements OnInit {
    public cells: number [] = new Array(100);
    public percent: number = 97;
    public isExpanded = true;

    constructor(
        protected widgetService: WidgetService,
        public dialog: MatDialog,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
    }

    protected dataHandler(ref: any): void {
    }

    public toggleBlock(): void {
        this.isExpanded = !this.isExpanded;
    }

    public openEdit() {
        this.dialog.open(KpeExecutionProductionProgramEditPlaneComponent)
    }
    public openAdd() {
        this.dialog.open(KpeExecutionProductionProgramAddPlanComponent)
    }
}

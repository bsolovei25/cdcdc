import { Component, Inject, OnInit } from "@angular/core";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { WidgetPlatform } from "../../../dashboard/models/@PLATFORM/widget-platform";
import { WidgetService } from "../../../dashboard/services/widget.service";
import { MatDialog } from "@angular/material/dialog";
import { KpeExecutionProductionProgramEditPlaneComponent } from "../kpe-execution-production-program/components/kpe-execution-production-program-edit-plane/kpe-execution-production-program-edit-plane.component";
import { KpeExecutionProductionProgramAddPlanComponent } from "../kpe-execution-production-program/components/kpe-execution-production-program-add-plan/kpe-execution-production-program-add-plan.component";
import { KpeAccuracyTimelinesDataAddPlanComponent } from "./components/kpe-accuracy-timelines-data-add-plan/kpe-accuracy-timelines-data-add-plan.component";
import { KpeAccuracyTimelinesDataEditPlanComponent } from "./components/kpe-accuracy-timelines-data-edit-plan/kpe-accuracy-timelines-data-edit-plan.component";

@Component({
    selector: "evj-kpe-accuracy-timelines-data",
    templateUrl: "./kpe-accuracy-timelines-data.component.html",
    styleUrls: ["./kpe-accuracy-timelines-data.component.scss"],
    animations: [
        trigger("Branch", [
            state(
                "collapsed",
                style({
                    height: 0,
                    transform: "translateY(-8px)",
                    opacity: 0,
                    overflow: "hidden"
                })
            ),
            state(
                "expanded",
                style({
                    height: "*",
                    opacity: 1
                })
            ),
            transition("collapsed => expanded", animate("150ms ease-in")),
            transition("expanded => collapsed", animate("150ms ease-out"))
        ])
    ]
})
export class KpeAccuracyTimelinesDataComponent extends WidgetPlatform<unknown> implements OnInit {
    public cells: number[] = new Array(100);
    public percent: number = 97;
    public isExpanded: boolean = true;
    public currentDate: string = '';

    constructor(
        protected widgetService: WidgetService,
        public dialog: MatDialog,
        @Inject("isMock") public isMock: boolean,
        @Inject("widgetId") public id: string,
        @Inject("uniqId") public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.currentDate = this.getDate();
    }

    protected dataHandler(ref: unknown): void {
    }

    public toggleBlock(): void {
        this.isExpanded = !this.isExpanded;
    }

    public openEdit(): void {
        this.dialog.open(KpeAccuracyTimelinesDataEditPlanComponent);
    }

    public openAdd(): void {
        this.dialog.open(KpeAccuracyTimelinesDataAddPlanComponent);
    }

    public getDate(): string {
        const today = new Date();
        const date = new Date(today.getFullYear(), today.getMonth() - 1, 1, 0, 0, 0, 0);
        const month = date.toLocaleString('Ru-ru', { month: 'long' });
        return month + ' ' + today.getFullYear();
    }
}

import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { WidgetPlatform } from "../../../dashboard/models/widget-platform";
import { WidgetService } from "../../../dashboard/services/widget.service";

@Component({
    selector: 'evj-ozsm-planning-main',
    templateUrl: './ozsm-planning-main.component.html',
    styleUrls: ['./ozsm-planning-main.component.scss']
})
export class OzsmPlanningMainComponent extends WidgetPlatform {

    @ViewChild('graphContainer') public graphContainer: ElementRef;

    private readonly staticWidth: number = 1220;
    private readonly staticHeight: number = 660;

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    get areaScale(): string {
        const scaleY =
            (this.graphContainer?.nativeElement?.offsetHeight ?? this.staticHeight)
            / this.staticHeight;
        const scaleX =
            (this.graphContainer?.nativeElement?.offsetWidth ?? this.staticWidth)
            / this.staticWidth;
        const scale: number = scaleX < scaleY ? scaleX : scaleY;
        return `transform: translate(-50%, -50%) scale(${scale})`;
    }

    protected dataHandler(ref: any): void {
    }
}

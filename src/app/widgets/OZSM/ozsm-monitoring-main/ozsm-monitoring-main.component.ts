import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IOzsmCircleDiagramFull } from '../ozsm-shared/ozsm-circle-diagram-full/ozsm-circle-diagram-full.component';

@Component({
    selector: 'evj-ozsm-monitoring-main',
    templateUrl: './ozsm-monitoring-main.component.html',
    styleUrls: ['./ozsm-monitoring-main.component.scss'],
})
export class OzsmMonitoringMainComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public circleDiagramData: IOzsmCircleDiagramFull = {
        fact: 80,
        plan: 100,
        unit: 'Test',
        deviationDays: [1, 3, 4],
    };

    public styleTransform: string = '';

    @ViewChild('graphContainer') public graphContainer: ElementRef;

    @HostListener('document:resize', ['$event'])
    public onResize(): void {
        this.resize();
    }

    private readonly staticWidth: number = 1220;
    private readonly staticHeight: number = 800;

    constructor(
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.resize();
    }

    protected dataHandler(ref: any): void {}

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    private resize(): void {
        const scaleY = (this.graphContainer?.nativeElement?.offsetHeight ?? this.staticHeight) / this.staticHeight;
        const scaleX = (this.graphContainer?.nativeElement?.offsetWidth ?? this.staticWidth) / this.staticWidth;
        const scale: number = scaleX < scaleY ? scaleX : scaleY;
        this.styleTransform = `transform: translate(-50%, -50%) scale(${scale})`;
    }
}

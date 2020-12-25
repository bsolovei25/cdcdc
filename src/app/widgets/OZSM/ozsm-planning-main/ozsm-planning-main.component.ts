import {
    Component,
    ElementRef,
    HostListener,
    Inject,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { BehaviorSubject } from 'rxjs';
import { IOzsmPlanningMain } from '../../../dashboard/models/OZSM/ozsm-planning-main.model';
import { OzsmService } from '../../../dashboard/services/widgets/OZSM/ozsm.service';

@Component({
    selector: 'evj-ozsm-planning-main',
    templateUrl: './ozsm-planning-main.component.html',
    styleUrls: ['./ozsm-planning-main.component.scss'],
})
export class OzsmPlanningMainComponent extends WidgetPlatform<unknown>
    implements OnInit, OnDestroy {
    @ViewChild('graphContainer')
    public graphContainer: ElementRef;

    public data$: BehaviorSubject<IOzsmPlanningMain> = new BehaviorSubject<IOzsmPlanningMain>(null);

    private readonly staticWidth: number = 1220;
    private readonly staticHeight: number = 660;

    public styleTransform: string = '';

    @HostListener('document:resize', ['$event'])
    public onResize(): void {
        this.resize();
    }

    constructor(
        private ozsmService: OzsmService,
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.resize();
        this.ozsmService.scenarioIdFilter$.subscribe((res) => this.getData(res));
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    private async getData(scenarioId: string): Promise<void> {
        const storageStats = await this.ozsmService.getStorageStats(scenarioId);
        console.log(storageStats);
        this.data$.next({
            storagePercent: storageStats.storagePercent,
            loadingPark: {
                currentValue: storageStats.parkCurrentValue,
                deathValue: storageStats.parkDeathValue,
                storages: storageStats.storageStats,
            },
        });
    }

    private resize(): void {
        const scaleY =
            (this.graphContainer?.nativeElement?.offsetHeight ?? this.staticHeight) /
            this.staticHeight;
        const scaleX =
            (this.graphContainer?.nativeElement?.offsetWidth ?? this.staticWidth) /
            this.staticWidth;
        const scale: number = scaleX < scaleY ? scaleX : scaleY;
        this.styleTransform = `transform: translate(-50%, -50%) scale(${scale})`;
    }

    protected dataHandler(ref: unknown): void {}
}

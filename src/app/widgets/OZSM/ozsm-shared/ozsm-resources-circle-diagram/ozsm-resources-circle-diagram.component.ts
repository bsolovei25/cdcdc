import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    Renderer2,
    ViewChild,
    OnDestroy,
    OnChanges,
    Inject,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IOzsmResourcesCircleDiagram } from '../../../../dashboard/models/OZSM/ozsm-resources-circle-diagram.model';
import { SOURCE_DATA } from './ozsm-resources-circle-diagram.mock';
import { OzsmService } from '../../../../dashboard/services/widgets/OZSM/ozsm.service';

@Component({
    selector: 'evj-ozsm-resources-circle-diagram',
    templateUrl: './ozsm-resources-circle-diagram.component.html',
    styleUrls: ['./ozsm-resources-circle-diagram.component.scss'],
})
export class OzsmResourcesCircleDiagramComponent extends WidgetPlatform<unknown>
    implements OnInit, AfterViewInit, OnDestroy, OnChanges {
    listen: any;

    public data$: BehaviorSubject<IOzsmResourcesCircleDiagram[]> = new BehaviorSubject<IOzsmResourcesCircleDiagram[]>(
        []
    );
    @ViewChild('scrollContainer') scrollContainer: ElementRef;

    constructor(
        private ozsmService: OzsmService,
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private renderer: Renderer2
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngAfterViewInit(): void {
        this.horizontalScroll(this.scrollContainer);
    }

    horizontalScroll(scrollContainer: ElementRef): void {
        this.listen = this.renderer.listen(scrollContainer.nativeElement, 'wheel', (e) => {
            const delta: number = e.deltaY || e.detail || e.wheelDelta;
            scrollContainer.nativeElement.scrollLeft += delta;
        });
    }

    ngOnInit(): void {
        this.widgetInit();
        this.ozsmService.scenarioIdFilter$.subscribe((res) => this.getData(res));
    }

    private async getData(scenarioId: string): Promise<void> {
        const data = await this.ozsmService.getResourcesDiagram(scenarioId);
        this.data$.next(data);
    }

    ngOnChanges(): void {}

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.listen();
    }

    dataHandler(): void {}
}

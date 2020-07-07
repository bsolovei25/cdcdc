import {
    Component,
    OnInit,
    OnDestroy,
    Inject,
    ViewChild,
    ElementRef,
    AfterViewInit,
} from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';

import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';

@Component({
    selector: 'evj-indicator-load-deviation',
    templateUrl: './indicator-load-deviation.component.html',
    styleUrls: ['./indicator-load-deviation.component.scss'],
})
export class IndicatorLoadDeviationComponent extends WidgetPlatform
    implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('menu', { static: true }) private menu: ElementRef;
    @ViewChild('diagram', { static: true }) private diagram: ElementRef;

    private svgMenu;
    private svgBody;

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
    }

    public ngAfterViewInit(): void {
        this.drawWidget();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {}

    private drawWidget(): void {
        this.drawMenu();
        this.drawDiagram();
    }

    private drawMenu(): void {
        this.svgMenu = d3Selection.select(this.menu.nativeElement).append('svg');
        this.svgMenu
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', '0 0 400 50');

        const buttons = this.svgMenu.append('g').attr('class', 'buttons');
        const urlButton = 'assets/icons/widgets/APS/aps-indicator-load-deviation/button.svg';
        const urlButtonActive =
            'assets/icons/widgets/APS/aps-indicator-load-deviation/button-active.svg';
        buttons
            .append('image')
            .attr('xlink:href', urlButton)
            .attr('x', 70)
            .attr('y', 0)
            .attr('width', 130)
            .attr('height', 35)
            .style('cursor', 'pointer');
        buttons
            .append('image')
            .attr('xlink:href', urlButtonActive)
            .attr('x', 200)
            .attr('y', 0)
            .attr('width', 128)
            .attr('height', 35)
            .style('cursor', 'pointer');

        const labels = this.svgMenu.append('g').attr('class', 'labels');
        labels
            .append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/APS/aps-indicator-load-deviation/data-quality.svg'
            )
            .attr('x', 29)
            .attr('y', 40);
        labels
            .append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/APS/aps-indicator-load-deviation/graph-quality.svg'
            )
            .attr('x', 199)
            .attr('y', 40);
    }

    private drawDiagram(): void {
        this.svgBody = d3Selection.select(this.diagram.nativeElement).append('svg');
        this.svgBody
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', '0 0 400 200')
            .style('background', 'green');
    }
}

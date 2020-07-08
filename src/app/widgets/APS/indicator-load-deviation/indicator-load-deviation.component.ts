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

    data = [
        {
            name: 'Гидроочистка ДТ',
            value: 850074,
            deviation: -298,
        },
        {
            name: 'Риформинг',
            value: 70470,
            deviation: -348,
        },
        {
            name: 'Кат. крекинг',
            value: 126679,
            deviation: -329,
        },
        {
            name: 'Ароматика',
            value: 640667,
            deviation: -104,
        },
        {
            name: 'Прочее',
            value: 272118,
            deviation: -82,
        },
    ];

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
        // this.drawArrows();
        this.drawCards();
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

        this.svgMenu
            .append('circle')
            .attr('class', 'indicator')
            .attr('cx', 31)
            .attr('cy', 27)
            .attr('r', 30)
            .attr('fill', '#1C1F2D');

        this.svgMenu
            .append('circle')
            .attr('class', 'indicator')
            .attr('cx', 369)
            .attr('cy', 27)
            .attr('r', 30)
            .attr('fill', '#1C1F2D');
    }

    private drawDiagram(): void {
        this.svgBody = d3Selection.select(this.diagram.nativeElement).append('svg');
        this.svgBody
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', '0 0 400 200');

        const indicator = this.svgBody.append('g').attr('class', 'indicator');

        indicator
            .append('circle')
            .attr('cx', 100)
            .attr('cy', 100)
            .attr('r', 100)
            .attr('fill', '#161A28')
            .attr('stroke', '#272A38')
            .attr('stroke-width', 1);

        indicator
            .append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/APS/aps-indicator-load-deviation/diagram-frame.svg'
            )
            .attr('x', 5)
            .attr('y', 0)
            .attr('width', 190)
            .attr('height', 55);

        indicator
            .append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/APS/aps-indicator-load-deviation/diagram-frame.svg'
            )
            .attr('x', 5)
            .attr('y', -200)
            .attr('width', 190)
            .attr('height', 55)
            .style('transform', 'scaleY(-1)');
    }

    private drawArrows(): void {
        const arrows = this.svgBody.append('g').attr('class', 'arrows');

        arrows
            .append('image')
            .attr('xlink:href', 'assets/icons/widgets/APS/aps-indicator-load-deviation/arrow1.svg')
            .attr('x', 200)
            .attr('y', 15)
            .attr('width', 40)
            .attr('height', 15);

        arrows
            .append('image')
            .attr('xlink:href', 'assets/icons/widgets/APS/aps-indicator-load-deviation/arrow2.svg')
            .attr('x', 215)
            .attr('y', 57)
            .attr('width', 25)
            .attr('height', 13);

        arrows
            .append('image')
            .attr('xlink:href', 'assets/icons/widgets/APS/aps-indicator-load-deviation/arrow3.svg')
            .attr('x', 222)
            .attr('y', 96)
            .attr('width', 17)
            .attr('height', 7);

        arrows
            .append('image')
            .attr('xlink:href', 'assets/icons/widgets/APS/aps-indicator-load-deviation/arrow4.svg')
            .attr('x', 215)
            .attr('y', 130)
            .attr('width', 25)
            .attr('height', 13);

        arrows
            .append('image')
            .attr('xlink:href', 'assets/icons/widgets/APS/aps-indicator-load-deviation/arrow5.svg')
            .attr('x', 203)
            .attr('y', 168)
            .attr('width', 40)
            .attr('height', 15);
    }

    private drawCards(): void {
        const cards = this.svgBody.append('g').attr('class', 'cards');

        let card = cards.append('g').attr('class', 'card');
        card.append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/APS/aps-indicator-load-deviation/card-left.svg'
            )
            .attr('x', 210)
            .attr('y', -20)
            .attr('width', 48)
            .attr('height', 45);

        card.append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/APS/aps-indicator-load-deviation/card-frame.svg'
            )
            .attr('x', 210)
            .attr('y', -20)
            .attr('width', 190)
            .attr('height', 46);

        card.append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/APS/aps-indicator-load-deviation/card-values.svg'
            )
            .attr('x', 320)
            .attr('y', -17)
            .attr('width', 75)
            .attr('height', 40);

        card.append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/APS/aps-indicator-load-deviation/card-icon.svg'
            )
            .attr('x', 217)
            .attr('y', -7)
            .attr('width', 20)
            .attr('height', 20);

        card.append('text')
            .attr('x', 240)
            .attr('y', 5)
            .attr('fill', '#8D9EB8')
            .style('font-size', 11)
            .text('Гидроочистка ДТ');

        card.append('text')
            .attr('x', 390)
            .attr('y', 0)
            .attr('fill', '#ffffff')
            .attr('text-anchor', 'end')
            .style('font-size', 11)
            .text('850074');

        card.append('text')
            .attr('x', 390)
            .attr('y', 15)
            .attr('fill', '#FF931E')
            .attr('text-anchor', 'end')
            .style('font-size', 11)
            .text('-298');

        card = cards.append('g').attr('class', 'card');
        card.append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/APS/aps-indicator-load-deviation/card-left.svg'
            )
            .attr('x', 210)
            .attr('y', 30)
            .attr('width', 48)
            .attr('height', 45);

        card.append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/APS/aps-indicator-load-deviation/card-frame.svg'
            )
            .attr('x', 210)
            .attr('y', 30)
            .attr('width', 190)
            .attr('height', 46);

        card.append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/APS/aps-indicator-load-deviation/card-values.svg'
            )
            .attr('x', 320)
            .attr('y', 33)
            .attr('width', 75)
            .attr('height', 40);

        card.append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/APS/aps-indicator-load-deviation/card-icon.svg'
            )
            .attr('x', 217)
            .attr('y', 43)
            .attr('width', 20)
            .attr('height', 20);

        card = cards.append('g').attr('class', 'card');
        card.append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/APS/aps-indicator-load-deviation/card-left.svg'
            )
            .attr('x', 210)
            .attr('y', 80)
            .attr('width', 48)
            .attr('height', 45);

        card.append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/APS/aps-indicator-load-deviation/card-frame.svg'
            )
            .attr('x', 210)
            .attr('y', 80)
            .attr('width', 190)
            .attr('height', 46);

        card.append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/APS/aps-indicator-load-deviation/card-values.svg'
            )
            .attr('x', 320)
            .attr('y', 83)
            .attr('width', 75)
            .attr('height', 40);

        card.append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/APS/aps-indicator-load-deviation/card-icon.svg'
            )
            .attr('x', 217)
            .attr('y', 93)
            .attr('width', 20)
            .attr('height', 20);

        card = cards.append('g').attr('class', 'card');
        card.append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/APS/aps-indicator-load-deviation/card-left.svg'
            )
            .attr('x', 210)
            .attr('y', 130)
            .attr('width', 48)
            .attr('height', 45);

        card.append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/APS/aps-indicator-load-deviation/card-frame.svg'
            )
            .attr('x', 210)
            .attr('y', 130)
            .attr('width', 190)
            .attr('height', 46);

        card.append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/APS/aps-indicator-load-deviation/card-values.svg'
            )
            .attr('x', 320)
            .attr('y', 133)
            .attr('width', 75)
            .attr('height', 40);

        card.append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/APS/aps-indicator-load-deviation/card-icon.svg'
            )
            .attr('x', 217)
            .attr('y', 143)
            .attr('width', 20)
            .attr('height', 20);

        card = cards.append('g').attr('class', 'card');
        card.append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/APS/aps-indicator-load-deviation/card-left.svg'
            )
            .attr('x', 210)
            .attr('y', 180)
            .attr('width', 48)
            .attr('height', 45);

        card.append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/APS/aps-indicator-load-deviation/card-frame.svg'
            )
            .attr('x', 210)
            .attr('y', 180)
            .attr('width', 190)
            .attr('height', 46);

        card.append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/APS/aps-indicator-load-deviation/card-values.svg'
            )
            .attr('x', 320)
            .attr('y', 183)
            .attr('width', 75)
            .attr('height', 40);

        card.append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/APS/aps-indicator-load-deviation/card-icon.svg'
            )
            .attr('x', 217)
            .attr('y', 193)
            .attr('width', 20)
            .attr('height', 20);
    }
}

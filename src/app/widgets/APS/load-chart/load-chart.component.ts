import {
    Component,
    OnInit,
    Inject,
    ViewChild,
    ElementRef,
    Renderer2,
    AfterViewInit,
} from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';

@Component({
    selector: 'evj-load-chart',
    templateUrl: './load-chart.component.html',
    styleUrls: ['./load-chart.component.scss'],
})
export class LoadChartComponent extends WidgetPlatform implements OnInit, AfterViewInit {
    @ViewChild('grid_hor', { static: true }) private gridHorizontal: ElementRef;
    @ViewChild('grid_ver', { static: true }) private gridVertical: ElementRef;

    constructor(
        protected widgetService: WidgetService,
        private renderer: Renderer2,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngAfterViewInit(): void {
        this.createGrid();
    }

    protected dataHandler(ref: any): void {}

    private createGrid(): void {
        const horLines = 6;
        const verLines = 33;

        for (let i = 0; i < horLines; i++) {
            const lineHor = this.renderer.createElement('div');
            this.renderer.addClass(lineHor, 'line-hor');
            this.renderer.appendChild(this.gridHorizontal, lineHor);
        }

        for (let i = 0; i < verLines; i++) {
            const lineVer = this.renderer.createElement('div');
            this.renderer.addClass(lineVer, 'line-ver');
            this.renderer.appendChild(this.gridVertical, lineVer);
        }
        // this.renderer.appendChild(this.gridHorizontal,)
    }

    public onClick(): void {
        console.log('click');
    }
}

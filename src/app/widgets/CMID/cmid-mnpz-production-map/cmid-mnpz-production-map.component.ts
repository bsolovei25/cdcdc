import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ElementRef,
    ViewChild,
    ChangeDetectorRef,
    Inject, AfterViewInit, ViewChildren, QueryList, Renderer2, OnDestroy
} from '@angular/core';
import {WidgetPlatform} from "@dashboard/models/@PLATFORM/widget-platform";
import {WidgetService} from "@dashboard/services/widget.service";
import {of, range} from "rxjs";
import {concatMap, delay} from "rxjs/operators";
import {
    ICmidMnpzProductionMapInterface,
    ICmidMnpzProductionMapInterfaceBuild
} from "@widgets/CMID/cmid-mnpz-production-map/models/cmid-mnpz-production-map.interface";
import {cmidMnpzProductionMapData} from "@widgets/CMID/cmid-mnpz-production-map/const/cmid-mnpz-production-map.const";

@Component({
    selector: 'evj-cmid-onpz-production-map',
    templateUrl: './cmid-mnpz-production-map.component.html',
    styleUrls: ['./cmid-mnpz-production-map.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmidMnpzProductionMapComponent extends WidgetPlatform implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild("mnpzProductionMap") productionMap: ElementRef;
    @ViewChild("compassArrow") compassArrow: ElementRef;
    @ViewChild("tooltip") tooltip: ElementRef;
    @ViewChildren("production") productions: QueryList<ElementRef> ;
    @ViewChildren("text") productionsText: QueryList<ElementRef> ;

    public data: ICmidMnpzProductionMapInterface;
    public buildName: string;
    public options: {
            safety: string,
            reliability: string,
            ecology: string
        } | null;

    private svgMap: any;
    private selected: any;
    private position: {top: number, right: number, bottom: number, left: number}
    private mouseLeaveUnlistener: () => void;
    private mouseEnterUnlistener: () => void;

    // : ToDo Число, которое требуется для возвращения стрелки компаса на позицию 0, т.к на макете она находится на позиции 135
    private normalizeNumber: number = 225;

    constructor(
        public widgetService: WidgetService,
        private cdRef: ChangeDetectorRef,
        private renderer: Renderer2,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        this.data = cmidMnpzProductionMapData;

        // ToDo: Костыль для проверки функционала компаса
        range(1, 100).pipe(
            concatMap(i => of(Math.random() * 400).pipe(delay(1500)))
        ).subscribe((val: number) => {
            this.rotateCompass(val);
        });
    }

    ngOnDestroy(): void {
        this.mouseLeaveUnlistener();
        this.mouseEnterUnlistener();
    }

    ngAfterViewInit(): void {
        this.drawData();
        this.drawTooltip();
    }

    private drawData(): void {
        this.productions.forEach((build: ElementRef) => {
            const buildDataId = build.nativeElement.getAttribute('data-id');
            this.data.builds.forEach((item: ICmidMnpzProductionMapInterfaceBuild) => {
                if (item.id === parseInt(buildDataId, 10)) {
                    this.renderer.addClass(build.nativeElement, 'svg-map__production_filled');
                    this.renderer.setAttribute(build.nativeElement, 'data-name', item.name);
                    this.renderer.setAttribute(build.nativeElement, 'data-safety', item.options?.safety);
                    this.renderer.setAttribute(build.nativeElement, 'data-reliability', item.options?.reliability);
                    this.renderer.setAttribute(build.nativeElement, 'data-ecology', item.options?.ecology);
                }
            })
        })

        this.productionsText.forEach((text: ElementRef) => {
            const textDataId = text.nativeElement.getAttribute('data-id');
            this.data.builds.forEach((item: ICmidMnpzProductionMapInterfaceBuild) => {
                if (item.id === parseInt(textDataId, 10)) {
                    this.renderer.addClass(text.nativeElement, 'svg-map__text_filled');
                }
            })
        });
    }

    private rotateCompass(val: number): void {
        this.renderer.setAttribute(this.compassArrow.nativeElement, 'style', `transform: rotate(${val + this.normalizeNumber}deg); transition: all, 1s, easy;`);
    }

    private drawTooltip(): void {
        this.svgMap = this.productionMap.nativeElement;
        this.selected = this.svgMap.querySelectorAll('.svg-map__production_filled');

        this.selected.forEach((rect) => {
            this.mouseEnterUnlistener = this.renderer.listen(rect, 'mouseenter', () => {
                const parentPos = rect.getBoundingClientRect();
                const tooltipPosition = this.tooltip.nativeElement.getBoundingClientRect();
                this.buildName = rect.getAttribute('data-name');
                this.options = {
                    safety: rect.getAttribute('data-safety'),
                    reliability: rect.getAttribute('data-reliability'),
                    ecology: rect.getAttribute('data-ecology')
                }
                this.position = {
                    top: parentPos.top - tooltipPosition.top,
                    right: tooltipPosition.right - parentPos.right,
                    bottom: parentPos.bottom - tooltipPosition.bottom,
                    left: parentPos.left - tooltipPosition.left,
                }
                this.renderer.setAttribute(this.tooltip.nativeElement, 'style', `left: ${this.position.left + (rect.getBoundingClientRect().width / 2)}px; top: ${this.position.top + rect.getBoundingClientRect().height - 10}px; transform: translateX(-50%); visibility: visible;`);
                this.cdRef.detectChanges();
            })

            this.mouseLeaveUnlistener = this.renderer.listen(rect, 'mouseleave', () => {
                this.renderer.setAttribute(this.tooltip.nativeElement, 'style', 'visibility: hidden; left: 0; top: 0');
                this.position = null;
                this.cdRef.detectChanges();
            })
        })
    }

    protected dataHandler(ref: any): void {
    }
}

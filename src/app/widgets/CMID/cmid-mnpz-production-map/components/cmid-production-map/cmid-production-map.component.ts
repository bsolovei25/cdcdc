import {
    Component,
    ChangeDetectionStrategy,
    SimpleChanges,
    ElementRef,
    OnDestroy,
    OnChanges,
    AfterViewInit,
    ViewChild,
    ChangeDetectorRef,
    Renderer2,
    Input,
    SimpleChange, HostListener
} from '@angular/core';
import {
    ICmidMnpzProductionMapInterface,
    ICmidMnpzProductionMapInterfaceBuild,
    MapTypes
} from '@widgets/CMID/cmid-mnpz-production-map/models/cmid-mnpz-production-map.interface';

@Component({
    selector: 'evj-cmid-production-map',
    templateUrl: './cmid-production-map.component.html',
    styleUrls: ['./cmid-production-map.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmidProductionMapComponent implements OnDestroy, OnChanges, AfterViewInit {
    @Input() public data: ICmidMnpzProductionMapInterface;
    @Input() public mapType: MapTypes;

    @ViewChild('mnpzProductionMap') productionMap: ElementRef<HTMLElement>;
    @ViewChild('tooltip') tooltip: ElementRef;

    constructor(
        private cdRef: ChangeDetectorRef,
        private renderer: Renderer2
    ) {}

    public buildName: string;
    public options: {
        safety: string,
        reliability: string,
        ecology: string
    } | null;

    private svgMap: any;
    private position: { top: number, right: number, bottom: number, left: number };
    private mouseLeaveUnlistener: () => void;
    private mouseEnterUnlistener: () => void;

    // : ToDo Число, которое требуется для возвращения стрелки компаса на позицию 0, т.к на макете она находится на позиции 135
    private normalizeNumber: number = 225;

    ngOnDestroy(): void {
        this.mouseLeaveUnlistener();
        this.mouseEnterUnlistener();
    }

    ngOnChanges(changes: SimpleChanges): void {
        const svgNameChanges: SimpleChange = changes?.data;
        if (svgNameChanges) {
            this.drawData();
        }
    }

    ngAfterViewInit(): void {
        setTimeout(() =>  {
            this.drawData();
            this.drawTooltip();
        }, 200);

    }

    private drawData(): void {
        this.svgMap = this.productionMap.nativeElement.querySelector('svg-icon').querySelector('svg');
        const productions = this.svgMap.querySelectorAll('.svg-map__production');
        const productionsText = this.svgMap.querySelectorAll('#text');
        productions.forEach((build) => {
            const buildDataId = build.getAttribute('data-id');
            this.data.builds.forEach((item: ICmidMnpzProductionMapInterfaceBuild) => {
                if (item.id === parseInt(buildDataId, 10)) {
                    this.renderer.addClass(build, 'svg-map__production_filled');
                    this.renderer.setAttribute(build, 'data-name', item.name);
                    this.renderer.setAttribute(build, 'data-safety', item.options?.safety);
                    this.renderer.setAttribute(build, 'data-reliability', item.options?.reliability);
                    this.renderer.setAttribute(build, 'data-ecology', item.options?.ecology);
                }
            });
        });
        productionsText.forEach((text) => {
            const textDataId = text.getAttribute('data-id');
            this.data.builds.forEach((item: ICmidMnpzProductionMapInterfaceBuild) => {
                if (item.id === parseInt(textDataId, 10)) {
                    this.renderer.addClass(text, 'svg-map__text_filled');
                }
            });
        });
    }

    private rotateCompass(val: number): void {
        const compassArrow = this.svgMap.querySelector('#compassArrow')
        this.renderer.addClass(compassArrow, this.getCompassClass(this.mapType));
        this.renderer.setAttribute(compassArrow, 'style', `transform: rotate(${val + this.normalizeNumber}deg); transition: all, 1s, easy;`);
    }

    private drawTooltip(): void {
        const selected = this.svgMap.querySelectorAll('.svg-map__production_filled');
        selected.forEach((rect) => {
            this.mouseEnterUnlistener = this.renderer.listen(rect, 'mouseenter', () => {
                const parentPos = rect.getBoundingClientRect();
                const tooltipPosition = this.tooltip.nativeElement.getBoundingClientRect();
                this.buildName = rect.getAttribute('data-name');
                this.options = {
                    safety: rect.getAttribute('data-safety'),
                    reliability: rect.getAttribute('data-reliability'),
                    ecology: rect.getAttribute('data-ecology')
                };
                this.position = {
                    top: parentPos.top - tooltipPosition.top,
                    right: tooltipPosition.right - parentPos.right,
                    bottom: parentPos.bottom - tooltipPosition.bottom,
                    left: parentPos.left - tooltipPosition.left
                };
                this.renderer.setAttribute(this.tooltip.nativeElement, 'style', `left: ${this.position.left + (rect.getBoundingClientRect().width / 2)}px; top: ${this.position.top + rect.getBoundingClientRect().height - 10}px; transform: translateX(-50%); visibility: visible;`);
                this.cdRef.detectChanges();
            });
            this.mouseLeaveUnlistener = this.renderer.listen(rect, 'mouseleave', () => {
                this.renderer.setAttribute(this.tooltip.nativeElement, 'style', 'visibility: hidden; left: 0; top: 0');
                this.position = null;
                this.cdRef.detectChanges();
            });
        });
    }

    private getCompassClass(type: MapTypes): string {
        return type === 'mnpz' ? 'compass__arrow_mnpz' : 'compass__arrow_onpz';
    }
}

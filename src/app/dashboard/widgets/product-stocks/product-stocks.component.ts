import {
    Component,
    OnDestroy,
    OnInit,
    Inject,
    ViewChild,
    ElementRef,
    AfterViewInit,
    Renderer2,
} from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { UserSettingsService } from '../../services/user-settings.service';
import { WidgetPlatform } from '../../models/@PLATFORM/widget-platform';

export interface IProductStocks {
    stocks: number;
    passportization: number;
    shipment: number;
    typeShipment: 'railway' | 'pipe';
}

@Component({
    selector: 'evj-product-stocks',
    templateUrl: './product-stocks.component.html',
    styleUrls: ['./product-stocks.component.scss'],
})
export class ProductStocksComponent extends WidgetPlatform<unknown>
    implements OnInit, OnDestroy, AfterViewInit {
    public static itemCols: number = 17;
    public static itemRows: number = 7;
    public static minItemCols: number = 17;
    public static minItemRows: number = 7;

    data: IProductStocks = {
        stocks: 1667,
        passportization: 7.6,
        shipment: 7.5,
        typeShipment: 'pipe',
    };
    isActive: boolean = false;

    @ViewChild('svgContainer') svgContainer: ElementRef;
    @ViewChild('svgContainers') svgContainers: ElementRef;

    constructor(
        public userSettings: UserSettingsService,
        public widgetService: WidgetService,
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

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        // this.datas = ref.items;
    }

    ngAfterViewInit(): void {
        if (this.svgContainers && this.svgContainers.nativeElement) {
            const rect = this.renderer.createElement('rect', 'svg');
            this.renderer.setAttribute(rect, 'x', '1.24');
            this.renderer.setAttribute(rect, 'y', '21');
            this.renderer.setAttribute(rect, 'width', '42.4');
            this.renderer.setAttribute(rect, 'height', '5');
            this.renderer.setStyle(rect, 'fill', '#f4a321');
            this.renderer.setStyle(rect, 'opacity', '0.8');
            this.renderer.appendChild(this.svgContainer.nativeElement, rect);

            const rect2 = this.renderer.createElement('rect', 'svg');
            this.renderer.setAttribute(rect2, 'x', '1.24');
            this.renderer.setAttribute(rect2, 'y', '26');
            this.renderer.setAttribute(rect2, 'width', '42.4');
            this.renderer.setAttribute(rect2, 'height', '10');
            this.renderer.setStyle(rect2, 'fill', '#a2e2ff');
            this.renderer.setStyle(rect2, 'opacity', '0.8');
            this.renderer.appendChild(this.svgContainer.nativeElement, rect2);
        }
    }

    dataSvgSize(): void {
        const passportizationHeight = (
            (this.data.passportization / this.data.stocks) *
            100
        ).toFixed(2);
        const shipmentHeight = ((this.data.shipment / this.data.stocks) * 100).toFixed(2);
    }

    onActive(): void {
        this.isActive ? (this.isActive = false) : (this.isActive = true);
    }
}

import { Component, OnDestroy, OnInit, Inject, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { Subscription } from "rxjs/index";
import { NewWidgetService } from '../../services/new-widget.service';
import { NewUserSettingsService } from '../../services/new-user-settings.service';

export interface IProductStocks {
  stocks: number;
  passportization: number;
  shipment: number;
  typeShipment: 'railway' | 'pipe';
}

@Component({
  selector: 'evj-product-stocks',
  templateUrl: './product-stocks.component.html',
  styleUrls: ['./product-stocks.component.scss']
})
export class ProductStocksComponent implements OnInit, OnDestroy, AfterViewInit {

  title: string = '';

  data: IProductStocks = {
    stocks: 1667,
    passportization: 7.6,
    shipment: 7.5,
    typeShipment: "pipe"
  }

  static itemCols = 17;
  static itemRows = 5;

  isActive: boolean = false;

  private liveSubscription: Subscription;

  @ViewChild('svgContainer', { static: false }) svgContainer: ElementRef;
  @ViewChild('svgContainers', { static: false }) svgContainers: ElementRef;

  constructor(
    public userSettings: NewUserSettingsService,
    public widgetService: NewWidgetService,
    private renderer: Renderer2,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string
  ) {
    this.liveSubscription = this.widgetService.getWidgetChannel(id).subscribe(data => {
      this.title = data.title
    });

  }

  ngOnInit() {
    // this.dataSvgSize();

  }

  ngOnDestroy() {
    if (this.liveSubscription) {
      this.liveSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
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

  dataSvgSize() {
    const passportizationHeight = ((this.data.passportization / this.data.stocks) * 100).toFixed(2);
    console.log(passportizationHeight);

    const shipmentHeight = ((this.data.shipment / this.data.stocks) * 100).toFixed(2);


  }

  onActive() {
    this.isActive ? this.isActive = false : this.isActive = true;
  }

}


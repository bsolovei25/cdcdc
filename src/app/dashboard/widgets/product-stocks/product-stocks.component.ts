import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { Subscription } from "rxjs/index";
import { NewWidgetService } from '../../services/new-widget.service';
import { NewUserSettingsService } from '../../services/new-user-settings.service';

@Component({
  selector: 'evj-product-stocks',
  templateUrl: './product-stocks.component.html',
  styleUrls: ['./product-stocks.component.scss']
})
export class ProductStocksComponent implements OnInit, OnDestroy {

  title: string = '';

  static itemCols = 17;
  static itemRows = 5;

  isActive: boolean = false;

  private liveSubscription: Subscription;

  constructor(
    public userSettings: NewUserSettingsService,
    public widgetService: NewWidgetService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string
  ) {
    this.liveSubscription = this.widgetService.getWidgetChannel(id).subscribe(data => {
      this.title = data.title
    });

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.liveSubscription) {
      this.liveSubscription.unsubscribe();
    }
  }

  onActive() {

    this.isActive ? this.isActive = false : this.isActive = true;

  }



}


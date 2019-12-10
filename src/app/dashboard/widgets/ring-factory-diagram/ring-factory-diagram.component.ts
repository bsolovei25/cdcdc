import { Component, OnInit, Inject } from '@angular/core';
import { NewUserSettingsService } from '../../services/new-user-settings.service';
import { NewWidgetService } from '../../services/new-widget.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'evj-ring-factory-diagram',
  templateUrl: './ring-factory-diagram.component.html',
  styleUrls: ['./ring-factory-diagram.component.scss']
})
export class RingFactoryDiagramComponent implements OnInit {

  static itemCols = 16;
  static itemRows = 10;

  private subscription: Subscription;

  public title="test";
  public code;
  public units;
  public name;

  constructor(
    public widgetService: NewWidgetService,
    public serice: NewUserSettingsService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string

    ) {
      this.subscription = this.widgetService.getWidgetChannel(this.id).subscribe(data => {
        this.title = data.title;
        this.code = data.code;
        this.units = data.units;
        this.name = data.name;

      }); 
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

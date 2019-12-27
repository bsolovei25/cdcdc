import { Component, OnInit, Input, Inject } from '@angular/core';
import { NewWidgetService } from '../../services/new-widget.service';
import { NewUserSettingsService } from '../../services/new-user-settings.service';

@Component({
  selector: 'evj-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.scss']
})
export class WidgetHeaderComponent implements OnInit {

  @Input() title: string;
  @Input() units: string;
  @Input() code: string;
  @Input() id: string;
  @Input() uniqId: string;

  constructor(
    public widgetService: NewWidgetService,
    public userSettings: NewUserSettingsService
  ) { }

  ngOnInit() {
  }

  onRemoveButton(){
    this.widgetService.removeItemService(this.uniqId);
    this.userSettings.removeItem(this.uniqId);
  }

}

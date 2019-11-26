import { Component, OnInit, Input } from '@angular/core';
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

  constructor(
    public widgetService: NewWidgetService,
    public userSettings: NewUserSettingsService
  ) { }

  ngOnInit() {
  }

  onRemoveButton(){
    debugger
    this.widgetService.removeItemService(this.id);
    this.userSettings.removeItem();

  }

}

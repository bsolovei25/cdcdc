import { Component, Input, OnInit } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { UserSettingsService } from '../../services/user-settings.service';

@Component({
  selector: 'evj-widget-header-smp',
  templateUrl: './widget-header-smp.component.html',
  styleUrls: ['./widget-header-smp.component.scss']
})
export class WidgetHeaderSmpComponent implements OnInit {
    @Input() uniqId: string;
    constructor(
        private widgetService: WidgetService,
        private userSettings: UserSettingsService,
    ) { }

    ngOnInit(): void { }

    public async closeWidget(): Promise<void> {
        await this.userSettings.removeItem(this.uniqId);
        this.widgetService.removeItemService(this.uniqId);
    }
}

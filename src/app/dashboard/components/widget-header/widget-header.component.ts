import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { NewWidgetService } from '../../services/new-widget.service';
import { NewUserSettingsService } from '../../services/new-user-settings.service';

@Component({
    selector: 'evj-widget-header',
    templateUrl: './widget-header.component.html',
    styleUrls: ['./widget-header.component.scss'],
})
export class WidgetHeaderComponent implements OnInit {
    @Input() isPreview: boolean;
    @Input() widgetType: string;
    @Input() title: string;
    @Input() units: string;
    @Input() code: string;
    @Input() id: string;
    @Input() uniqId: string;
    @Input() icon: string = 'shedule';

    @Output() eventCreated = new EventEmitter<boolean>();
    public readonly iconRoute: string = './assets/icons/widget-title-icons/';

    constructor(
        public widgetService: NewWidgetService,
        public userSettings: NewUserSettingsService
    ) {}

    ngOnInit() {}

    onRemoveButton() {
        this.widgetService.removeItemService(this.uniqId);
        this.userSettings.removeItem(this.uniqId);
    }

    createEvent(): void {
        this.eventCreated.emit(true);
    }
}

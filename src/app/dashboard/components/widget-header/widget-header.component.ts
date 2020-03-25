import { Component, OnInit, Input, Inject, Output, EventEmitter, OnChanges } from '@angular/core';
import { NewWidgetService } from '../../services/new-widget.service';
import { NewUserSettingsService } from '../../services/new-user-settings.service';

@Component({
    selector: 'evj-widget-header',
    templateUrl: './widget-header.component.html',
    styleUrls: ['./widget-header.component.scss'],
})
export class WidgetHeaderComponent implements OnChanges {
    @Input() isPreview: boolean;
    @Input() widgetType: string;
    @Input() title: string;
    @Input() units: string;
    @Input() code: string;
    @Input() id: string;
    @Input() uniqId: string;
    @Input() icon: string = 'shedule';

    @Input() isEventOpen: boolean;
    public localeSelect: { name: string; id: number }[];
    @Input() set select(data) {
        if (data) {
            this.localeSelect = data;
            this.selectValue = data?.[0];
            this.selected.emit(this.selectValue);
        }
    }
    @Output() eventCreated = new EventEmitter<boolean>();
    @Output() public selected = new EventEmitter<any>();
    public readonly iconRoute: string = './assets/icons/widget-title-icons/';
    public selectValue: { name: string; id: number };

    public CreateIcon: boolean = true;

    constructor(
        public widgetService: NewWidgetService,
        public userSettings: NewUserSettingsService
    ) {}

    public ngOnChanges(): void {
        this.CreateIcon = this.isEventOpen;
    }

    public onRemoveButton(): void {
        this.widgetService.removeItemService(this.uniqId);
        this.userSettings.removeItem(this.uniqId);
    }

    public createEvent(event): void {
        this.CreateIcon = false;
        this.eventCreated.emit(event);
    }

    public onSelected(event): void {
        if (event) {
            this.selected.emit(event.value);
        }
    }

    compareFn(o1: any, o2: any): boolean {
        return o1.name === o2.name && o1.id === o2.id;
    }
}

import { Component, Input, OnInit } from '@angular/core';
import { ThemeConfiguratorService } from "@core/service/theme-configurator.service";

@Component({
    selector: 'evj-widget-preview',
    templateUrl: './widget-preview.component.html',
    styleUrls: ['./widget-preview.component.scss'],
})
export class WidgetPreviewComponent implements OnInit {
    @Input() previewTitle: string = '';
    @Input() title: string = '';
    @Input() code: string = '';
    @Input() icon: string;
    public route: string = 'assets/icons/widget-preview/';
    public format: string = '.svg';

    constructor(private themeService: ThemeConfiguratorService,) {
    }

    ngOnInit(): void {
        const sub = this.themeService.isDarkTheme.subscribe((value) => {
            this.route = `assets/icons/widget-preview/${value ? 'dark' : 'light'}`;
        });
    }
}

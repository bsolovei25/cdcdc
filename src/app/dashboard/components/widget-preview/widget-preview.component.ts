import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'evj-widget-preview',
    templateUrl: './widget-preview.component.html',
    styleUrls: ['./widget-preview.component.scss'],
})
export class WidgetPreviewComponent implements OnInit {
    @Input() previewTitle: string = '';
    @Input() title: string = '';
    @Input() icon: string;
    public route: string = '../../../../assets/icons/widget-preview/';
    public format: string = '.svg';

    constructor() {}

    ngOnInit() {}
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'evj-ec-widget-select',
    templateUrl: './ec-widget-select.component.html',
    styleUrls: ['./ec-widget-select.component.scss'],
})
export class EcWidgetSelectComponent implements OnInit {
    @Input()
    public label: string = '';

    public selected: string = 'option1';

    constructor() {}

    public ngOnInit(): void {}

    public onClick(): void {}
}

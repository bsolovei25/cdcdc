import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'evj-widget-preloader',
    templateUrl: './widget-preloader.component.html',
    styleUrls: ['./widget-preloader.component.scss'],
})
export class WidgetPreloaderComponent implements OnInit {
    @Input() public isLoading: boolean = true;

    public isHidden: boolean = false;

    constructor() {}

    ngOnInit(): void {}
}

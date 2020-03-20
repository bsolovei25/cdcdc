import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';

@Component({
    selector: 'evj-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {

    private subscription: Subscription;

    public active: boolean = false;

    constructor(public widgetService: NewWidgetService) {
        this.subscription = this.widgetService.widgets$.subscribe((dataW) => {
        });
    }

    ngOnInit() { }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    toggle() {
        this.active = !this.active;
    }

}

import {
    Component,
    Inject,
    AfterViewInit,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { WidgetService } from '../services/widget.service';
import { WidgetPlatform } from '../models/widget-platform';
import { LazyService } from '../../widgets/lazy.service';

@Component({
    selector: 'evj-widget-container',
    templateUrl: './widget-container.component.html',
    styleUrls: ['./widget-container.component.scss'],
})
export class WidgetContainerComponent extends WidgetPlatform implements AfterViewInit {
    @ViewChild('container', { read: ViewContainerRef }) private container: ViewContainerRef;
    public isLoading: boolean = true;

    constructor(
        private lazyService: LazyService,
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngAfterViewInit(): void {
        if (!this.isMock) {
            setTimeout(() => this.loadWidget(), 0);
        }
    }

    private async loadWidget(): Promise<void> {
        // this.getDataService.isLoading$.next(false);
        const injectParams = {
            isMock: this.isMock,
            widgetId: this.id,
            uniqId: this.uniqId,
        };
        await this.lazyService.loadWidget(this.widgetType, this.container, injectParams);
        setTimeout(() => (this.isLoading = false), 300);
    }

    protected dataHandler(ref: any): void {}
}

import { Injectable, Injector } from '@angular/core';
import { WidgetService } from '../../services/widget.service';

@Injectable()
export class FacadeService {
    private _widgetService: WidgetService;
    public get widgettService(): WidgetService {
        if (!this._widgetService) {
            this._widgetService = this.injector.get(WidgetService);
        }
        return this._widgetService;
    }

    constructor(private injector: Injector) {}
}

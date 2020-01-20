import { Injectable, Injector } from '@angular/core';
import { NewWidgetService } from '../../services/new-widget.service';

@Injectable()
export class FacadeService {
    private _widgetService: NewWidgetService;
    public get widgettService(): NewWidgetService {
        if (!this._widgetService) {
            this._widgetService = this.injector.get(NewWidgetService);
        }
        return this._widgetService;
    }

    constructor(private injector: Injector) {}
}

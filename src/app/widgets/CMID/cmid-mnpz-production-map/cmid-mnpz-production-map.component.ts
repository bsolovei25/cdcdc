import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Inject
} from '@angular/core';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '@dashboard/services/widget.service';
import {
    ICmidMnpzProductionMapInterface,
    MapTypes
} from '@widgets/CMID/cmid-mnpz-production-map/models/cmid-mnpz-production-map.interface';
import { cmidMnpzProductionMapData } from '@widgets/CMID/cmid-mnpz-production-map/const/cmid-mnpz-production-map.const';

@Component({
    selector: 'evj-cmid-onpz-production-map',
    templateUrl: './cmid-mnpz-production-map.component.html',
    styleUrls: ['./cmid-mnpz-production-map.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmidMnpzProductionMapComponent extends WidgetPlatform implements OnInit {
    public data: ICmidMnpzProductionMapInterface;
    public readonly mapType: { [key in MapTypes]: string } = {
        mnpz: 'mnpz-map',
        onpz: 'onpz-map',
    };
    constructor(
        public widgetService: WidgetService,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        this.data = cmidMnpzProductionMapData;
    }

    protected dataHandler(ref: any): void {
    }
}

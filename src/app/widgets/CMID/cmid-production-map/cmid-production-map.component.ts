import { Component, OnInit, ChangeDetectionStrategy, Inject, ChangeDetectorRef } from '@angular/core';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '@dashboard/services/widget.service';
import {
    ICmidMnpzProductionMapInterface,
    MapTypes,
} from '@widgets/CMID/cmid-production-map/models/cmid-production-map.interface';
import { cmidMnpzProductionMapData } from '@widgets/CMID/cmid-production-map/const/cmid-production-map.const';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'evj-cmid-production-map',
    templateUrl: './cmid-production-map.component.html',
    styleUrls: ['./cmid-production-map.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmidProductionMapComponent extends WidgetPlatform implements OnInit {
    public data: ICmidMnpzProductionMapInterface;
    public isLoad$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    public mapType: { [key: string]: string } = {
        [MapTypes.MNPZ_MAP]: 'mnpz-map',
        [MapTypes.ONPZ_MAP]: 'onpz-map',
    };

    constructor(
        public widgetService: WidgetService,
        private cdRef: ChangeDetectorRef,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        this.widgetInit();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.isLoad$.next(!!this.widgetType.length);
    }

    protected dataHandler(ref: any): void {
        this.data = ref;
    }

    public onMouseEnter(): void {
        this.hoverTimer = setTimeout(() => {
            this.isHover = true;
            this.cdRef.detectChanges();
        }, 200);
    }

    public onMouseExit(): void {
        this.hoverTimer = setTimeout(() => {
            this.isHover = false;
            this.cdRef.detectChanges();
        }, 200);
    }
}

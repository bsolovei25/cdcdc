import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { WidgetPlatform } from "@dashboard/models/@PLATFORM/widget-platform";

@Component({
    selector: 'evj-ec-widget-header',
    templateUrl: './ec-widget-header.component.html',
    styleUrls: ['./ec-widget-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EcWidgetHeaderComponent extends WidgetPlatform implements OnInit, OnDestroy{
    public ngOnInit(): void {
        super.widgetInit();
    }

    public ngOnDestroy(): void {

    }

    protected dataHandler(ref: unknown): void {
    }


}

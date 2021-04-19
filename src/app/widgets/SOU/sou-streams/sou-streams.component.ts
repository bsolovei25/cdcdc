import { Component, OnInit, ChangeDetectionStrategy, Inject } from "@angular/core";
import { WidgetService } from "@dashboard/services/widget.service";
import { WidgetPlatform } from "@dashboard/models/@PLATFORM/widget-platform";

@Component({
  selector: 'evj-sou-streams',
  templateUrl: './sou-streams.component.html',
  styleUrls: ['./sou-streams.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SouStreamsComponent extends WidgetPlatform implements OnInit {

  constructor(
      protected widgetService: WidgetService,

      @Inject('widgetId') public id: string,
      @Inject('uniqId') public uniqId: string
  ) {
      super(widgetService, id, uniqId);
  }

  ngOnInit(): void {
      super.widgetInit();
  }

  protected dataHandler(ref: unknown): void {}

}

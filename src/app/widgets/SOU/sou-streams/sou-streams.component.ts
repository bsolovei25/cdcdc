import { Component, OnInit, ChangeDetectionStrategy, Inject } from "@angular/core";
import { WidgetService } from "@dashboard/services/widget.service";
import { WidgetPlatform } from "@dashboard/models/@PLATFORM/widget-platform";

import { TITLES_OF_TABLE } from "@widgets/SOU/sou-streams/config";
import { TABLE_CELLS } from "@widgets/SOU/sou-streams/mock";

@Component({
  selector: 'evj-sou-streams',
  templateUrl: './sou-streams.component.html',
  styleUrls: ['./sou-streams.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SouStreamsComponent extends WidgetPlatform implements OnInit {

    public titlesOfTable: { name: string, widthOfBlock: string }[] = TITLES_OF_TABLE;
    public tableRows: {} = TABLE_CELLS;

    public heightOfTable: number = 70;

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

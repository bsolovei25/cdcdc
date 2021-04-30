import { Component, OnInit, Inject } from "@angular/core";
import { WidgetService } from "@dashboard/services/widget.service";
import { WidgetPlatform } from "@dashboard/models/@PLATFORM/widget-platform";

import { WORKSPACE_BAR_INFO } from "@widgets/SOU/sou-workspace/mock";

@Component({
  selector: 'evj-sou-workspace',
  templateUrl: './sou-workspace.component.html',
  styleUrls: ['./sou-workspace.component.scss']
})
export class SouWorkspaceComponent extends WidgetPlatform implements OnInit {

    public workspaceBarInfo: {} = WORKSPACE_BAR_INFO;

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

import { Component, OnInit, Inject } from '@angular/core';
import { WidgetService } from '@dashboard/services/widget.service';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';

import { WORKSPACE_BAR_INFO } from '@widgets/SOU/sou-workspace/mock';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'evj-sou-workspace',
    templateUrl: './sou-workspace.component.html',
    styleUrls: ['./sou-workspace.component.scss'],
    animations: [
        trigger(
            'animation',
            [
                transition(
                    ':enter',
                    [
                        style({ height: 0, opacity: 0, transform: 'translateY(-20px)' }),
                        animate('0.3s ease-out',
                            style({ height: 593, opacity: 1, transform: 'translateY(0px)' }))
                    ]
                ),
                transition(
                    ':leave',
                    [
                        style({ height: 300, opacity: 1 }),
                        animate('0.3s ease-in',
                            style({ height: 0, opacity: 0 }))
                    ]
                )
            ]
        )
    ]
})
export class SouWorkspaceComponent extends WidgetPlatform implements OnInit {

    public workspaceBarInfo: {} = WORKSPACE_BAR_INFO;
    public showChart: boolean = false;

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

    protected dataHandler(ref: unknown): void {
    }

}

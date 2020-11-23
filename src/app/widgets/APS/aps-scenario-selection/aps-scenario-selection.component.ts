import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';

@Component({
  selector: 'evj-aps-scenario-selection',
  templateUrl: './aps-scenario-selection.component.html',
  styleUrls: ['./aps-scenario-selection.component.scss']
})
export class ApsScenarioSelectionComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    scenarios: string[] = [
        'НГПП_9192747 - 27.05.2020',
        'НГПП_11247 - 27.05.2020',
        'НГПП_22247 - 27.05.2020',
        'НГПП_11247 - 27.05.2020'
    ];
    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
    clicked($event: MouseEvent): void {
        console.log(`scenario button clicked!`);
    }

    protected dataHandler(ref: any): void {
    }

}

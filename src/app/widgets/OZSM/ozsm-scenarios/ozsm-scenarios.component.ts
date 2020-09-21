import { WidgetService } from 'src/app/dashboard/services/widget.service';

import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';

@Component({
  selector: 'evj-ozsm-scenarios',
  templateUrl: './ozsm-scenarios.component.html',
  styleUrls: ['./ozsm-scenarios.component.scss']
})
export class OzsmScenariosComponent extends WidgetPlatform implements OnInit, OnDestroy {

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

  public ngOnInit(): void {
    super.widgetInit();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  protected dataHandler(): void {}

}

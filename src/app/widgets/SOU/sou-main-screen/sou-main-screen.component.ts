import { Component, Inject, OnInit } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';

export interface IInstalation {
  id: number;
  name: string;
  deviation: number;
  active: boolean;
}

@Component({
  selector: 'evj-sou-main-screen',
  templateUrl: './sou-main-screen.component.html',
  styleUrls: ['./sou-main-screen.component.scss']
})
export class SouMainScreenComponent extends WidgetPlatform<unknown> implements OnInit {

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
  
  protected dataHandler(ref: any): void {

  }

}

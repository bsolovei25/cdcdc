import { Component, Inject, OnInit } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { catalystProduction, offSiteCollectors, offSiteFacilities, other, productionFour, productionOneLeft, productionOneRight, productionTrade, productionTwo } from './sou-main-screen-data.mock';

export interface IInstallation {
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

  public productionOneLeftData: IInstallation[] = productionOneLeft;
  public productionOneRightData: IInstallation[] = productionOneRight;
  public productionTwoData: IInstallation[] = productionTwo;
  public productionFourData: IInstallation[] = productionFour;

  public productionTradeData: IInstallation[] = productionTrade;
  public offSiteCollectorsData: IInstallation = offSiteCollectors;
  public offSiteFacilitiesData: IInstallation = offSiteFacilities;
  public catalystProductionData: IInstallation = catalystProduction;
  public otherData: IInstallation = other;

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

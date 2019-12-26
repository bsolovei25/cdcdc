import {Component, OnInit, Inject, OnDestroy} from "@angular/core";
import { NewWidgetService } from "../../services/new-widget.service";
import { Subscription } from "rxjs";

export interface PointDiagramElement {
  norm: number;
  percentageValue: number;
  title: string;
  isCritical: boolean;
}

@Component({
  selector: "evj-point-diagram",
  templateUrl: "./point-diagram.component.html",
  styleUrls: ["./point-diagram.component.scss"]
})
export class PointDiagramComponent implements OnInit, OnDestroy {
  pointDiagramElements: PointDiagramElement[] = [
    {
      norm: 0.2,
      percentageValue: 30.6,
      title: "NO2",
      isCritical: false
    },
    {
      norm: 0.4,
      percentageValue: 6.6,
      title: "NO",
      isCritical: false
    },
    {
      norm: 0.2,
      percentageValue: 80,
      title: "NH3",
      isCritical: true
    },
    {
      norm: 0.3,
      percentageValue: 0,
      title: "C6H6",
      isCritical: false
    },
    {
      norm: 0.01,
      percentageValue: 0,
      title: "C6H5OH",
      isCritical: false
    },
    {
      norm: 0.4,
      percentageValue: 62.6,
      title: "NO",
      isCritical: false
    },
    {
      norm: 0.008,
      percentageValue: 0,
      title: "H2S",
      isCritical: false
    }
  ];

  static itemCols = 23;
  static itemRows = 16;

  public units = "%";
  public title;

  aboutWidget;

  private subscriptions: Subscription[] = [];

  constructor(
    private widgetService: NewWidgetService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string,
    @Inject('uniqId') public uniqId: string
  ) {
    this.subscriptions.push(this.widgetService
      .getWidgetChannel(this.id)
      .subscribe(data => {
        this.title = data.title;
        // this.code = data.code;
        this.units = data.units;
        // this.name = data.name;
      }));
  }

  ngOnInit() {
    if (!this.isMock) {
      this.wsConnect();
    }
  }

  private wsConnect() {
    this.subscriptions.push(this.widgetService.getWidgetLiveDataFromWS(this.id, 'point-diagram')
      .subscribe((ref) => {
          this.pointDiagramElements = ref.chartItems;
          console.log(this.pointDiagramElements);
        }
      ));
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      for (const subscription of this.subscriptions) {
        subscription.unsubscribe();
      }
    }
    
  }

  containerIsMock(): string {
    return this.isMock ? "430px" : "100%";
  }
}

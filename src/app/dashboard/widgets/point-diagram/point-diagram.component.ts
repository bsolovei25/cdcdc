import { Component, OnInit, Inject } from "@angular/core";
import { NewWidgetService } from "../../services/new-widget.service";
import { Subscription } from "rxjs";

@Component({
  selector: "evj-point-diagram",
  templateUrl: "./point-diagram.component.html",
  styleUrls: ["./point-diagram.component.scss"]
})
export class PointDiagramComponent implements OnInit {
  array = [
    {
      count: 0.2,
      percent: 30.6,
      label: "NO2",
      isCritical: false
    },
    {
      count: 0.4,
      percent: 6.6,
      label: "NO",
      isCritical: false
    },
    {
      count: 0.2,
      percent: 80,
      label: "NH3",
      isCritical: true
    },
    {
      count: 0.3,
      percent: 0,
      label: "C6H6",
      isCritical: false
    },
    {
      count: 0.01,
      percent: 0,
      label: "C6H5OH",
      isCritical: false
    },
    {
      count: 0.4,
      percent: 62.6,
      label: "NO",
      isCritical: false
    },
    {
      count: 0.008,
      percent: 0,
      label: "H2S",
      isCritical: false
    },
    // {
    //   count: 0.2,
    //   percent: 0,
    //   label: "C6H4(CH3)2",
    //   isCritical: false
    // },
    // {
    //   count: 0.6,
    //   percent: 0,
    //   label: "C6H5CH3",
    //   isCritical: false
    // },
    // {
    //   count: 0.5,
    //   percent: 0,
    //   label: "пыль",
    //   isCritical: false
    // },
    // {
    //   count: 0.5,
    //   percent: 2,
    //   label: "SO2",
    //   isCritical: false
    // },
    // {
    //   count: 5,
    //   percent: 0,
    //   label: "CO",
    //   isCritical: false
    // },
    // {
    //   count: 0.02,
    //   percent: 0,
    //   label: "C8H20",
    //   isCritical: false
    // }
  ];

  static itemCols = 23;
  static itemRows = 16;

  public units = "%";

  aboutWidget;

  subscription: Subscription;

  constructor(
    private widgetService: NewWidgetService,
    @Inject("isMock") public isMock: boolean,
    @Inject("widgetId") public id: string
  ) {
    this.subscription = this.widgetService
      .getWidgetChannel(this.id)
      .subscribe(data => {
        this.aboutWidget = data;
      //  this.units = data.units;
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  containerIsMock(): string {

        return this.isMock ? "430px" : "100%";

  }
}

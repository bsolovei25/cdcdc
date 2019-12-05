import { Component, OnInit, Inject } from "@angular/core";
import { NewWidgetService } from "../../services/new-widget.service";
import { Subscription } from "rxjs";

@Component({
  selector: "evj-production-pyramid",
  templateUrl: "./production-pyramid.component.html",
  styleUrls: ["./production-pyramid.component.scss"]
})
export class ProductionPyramidComponent implements OnInit {
  array = [
    {
      cardTitle: "Без пожара",
      daysCounter: 615
    },
    {
      cardTitle: "Без аварии",
      daysCounter: 435
    },
    {
      cardTitle: "Без несчастных случаев",
      daysCounter: 1234
    }
  ];

  static itemCols = 25;
  static itemRows = 26;

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
        this.aboutWidget = data.title;
      });
  }

  ngOnInit() {}
}

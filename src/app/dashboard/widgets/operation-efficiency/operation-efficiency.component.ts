import { Component, OnInit, Inject } from "@angular/core";
import { Subscription } from "rxjs";
import { NewWidgetService } from "../../services/new-widget.service";

@Component({
  selector: "evj-operation-efficiency",
  templateUrl: "./operation-efficiency.component.html",
  styleUrls: ["./operation-efficiency.component.scss"]
})
export class OperationEfficiencyComponent implements OnInit {
  aboutWidget;

  static itemCols = 18;
  static itemRows = 8;

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

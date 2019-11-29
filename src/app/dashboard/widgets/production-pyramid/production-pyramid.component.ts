import { Component, OnInit, Inject } from "@angular/core";
import { NewWidgetService } from "../../services/new-widget.service";
import { Subscription } from 'rxjs';

@Component({
  selector: "evj-production-pyramid",
  templateUrl: "./production-pyramid.component.html",
  styleUrls: ["./production-pyramid.component.scss"]
})
export class ProductionPyramidComponent implements OnInit {
  aboutWidget;

  subscription:Subscription;

  constructor(
    private widgetService: NewWidgetService,
    @Inject("isMock") public isMock: boolean,
    @Inject("widgetId") public id: string
  ) {
    this.subscription = this.widgetService
      .getWidgetChannel(this.id)
      .subscribe(data => {
        this.aboutWidget = data;
      });
  }

  ngOnInit() {}
}

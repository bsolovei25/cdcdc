import { Component, OnInit, Inject } from "@angular/core";
import { NewWidgetService } from "../../services/new-widget.service";
import { Subscription } from 'rxjs';

@Component({
  selector: "evj-calendar-plan",
  templateUrl: "./calendar-plan.component.html",
  styleUrls: ["./calendar-plan.component.scss"]
})
export class CalendarPlanComponent implements OnInit {
  aboutWidget;

  static itemCols = 18;
  static itemRows = 10;

  subscription: Subscription;

  array = [
    {
      name: "Бензины",
      deviation: -0.4,
      isBetter: false
    },
    {
      name: "Керосины",
      deviation: +11,
      isBetter: true
    },
    {
      name: "Дизели",
      deviation: +6,
      isBetter: true
    },
    {
      name: "Судовое топливо",
      deviation: -0.4,
      isBetter: true
    },
    {
      name: "Битумы",
      deviation: -0.4,
      isBetter: true
    },
    {
      name: "Мазуты",
      deviation: -0.4,
      isBetter: true
    }
  ];

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

import { Component, OnInit, Inject } from "@angular/core";
import { NewWidgetService } from "../../services/new-widget.service";
import { Subscription } from "rxjs";

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

  /* Приблизительная структура, получаемая с бека */

  data = {
    plan: 1000,
    lowerBorder: 0.03,
    higherBorder: 0.1,
    curValue: 692,
    maxValue: 1500,

    /* Вычислить при получении данных */
    // lowerValue = this.data.plan * (1 - this.data.lowerBorder);
    // higherValue = this.data.plan * (1 + this.data.higherBorder);

    lowerValue: 1000 * (1 - 0.03),
    higherValue: 1000 * (1 + 0.1)
  };

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

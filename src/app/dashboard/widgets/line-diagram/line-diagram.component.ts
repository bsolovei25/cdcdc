import {Component, Input, OnInit, Inject} from '@angular/core';
import { NewWidgetService } from '../../services/new-widget.service';
import { Subscription } from 'rxjs';

@Component({
  selector: "evj-line-diagram",
  templateUrl: "./line-diagram.component.html",
  styleUrls: ["./line-diagram.component.scss"]
})
export class LineDiagramComponent implements OnInit {

  static itemCols = 15;
  static itemRows = 7;

  private subscription: Subscription;

  data = [
    {
      name: "Очищенный газ висбрекинга",
      count: "85",
      units: "%",
      critical: true
    },
    {
      name: "Сероводородный газ",
      count: "67",
      units: "%",
      critical: false
    },
    {
      name: "Сухой газ",
      count: "97",
      units: "%",
      critical: false
    },
    {
      name: "Пропан",
      count: "73",
      units: "%",
      critical: true
    },
    {
      name: "Изобутан",
      count: "55",
      units: "%",
      critical: false
    }
  ];
  fillGraphs = "#3FA9F5";

  name;



  constructor(
    public widgetService: NewWidgetService,
    @Inject('widgetId') public id: string
  ) {
    this.subscription = this.widgetService.getWidgetChannel(id).subscribe(data => {
      this.name = data.name
    });
  }

  ngOnInit() {}

  ngOnDestroy(){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  drawGraph(count: number): string {
    return count.toString() + "%";
  }

  fillGraph(flag: boolean): string {
    const normalFill = "#3FA9F5";
    const criticalFill = "#F4A321";
    return flag ? criticalFill : normalFill;
  }
}

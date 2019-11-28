import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  OnDestroy,
  Renderer2
} from "@angular/core";
import { interval, Observable, Subscription } from "rxjs";

@Component({
  selector: "evj-point-diagram",
  templateUrl: "./point-diagram.component.html",
  styleUrls: ["./point-diagram.component.scss"]
})
export class PointDiagramComponent implements OnInit {
  @ViewChild("graph", { static: false }) graph: ElementRef;

  array = [
    {
      count: 0.2,
      percent: 9.3,
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
      percent: 7.1,
      label: "C6H5OH",
      isCritical: false
    },
    {
      count: 0.4,
      percent: 6.6,
      label: "NO",
      isCritical: false
    },
    {
      count: 0.008,
      percent: 0,
      label: "H2S",
      isCritical: false
    },
    {
      count: 0.2,
      percent: 0,
      label: "C6H4(CH3)2",
      isCritical: false
    },
    {
      count: 0.6,
      percent: 0,
      label: "C6H5CH3",
      isCritical: false
    },
    {
      count: 0.5,
      percent: 0,
      label: "пыль",
      isCritical: false
    },
    {
      count: 0.5,
      percent: 2,
      label: "SO2",
      isCritical: false
    },
    {
      count: 5,
      percent: 0,
      label: "CO",
      isCritical: false
    },
    {
      count: 0.02,
      percent: 0,
      label: "C8H20",
      isCritical: false
    }
  ];

  numbers: Observable<number> = interval(100);

  subscription: Subscription;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {}

  getGraphHeight(percent: number): string {
    return (100 - percent).toString() + "%";
  }

  getDiameter(percent: number): number {
    return 30 + ((70 - 30) / 100) * percent;
  }

  getColor(percent: number, isCritical: boolean): string {
    if (percent === 0) {
      return "point__disable";
    } else if (!isCritical) {
      return "point__normal";
    }
    return "point__critical";
  }
}

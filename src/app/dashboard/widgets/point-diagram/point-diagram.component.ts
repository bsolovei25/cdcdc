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
export class PointDiagramComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("graph", { static: false }) graph: ElementRef;

  numbers: Observable<number> = interval(100);

  subscription: Subscription;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.subscription = this.numbers.subscribe(() => {
      const innerHTML:DOMStringList = this.graph.nativeElement.innerHTML;
      this.renderer.removeAttribute(this.graph,'cy')
      console.log(innerHTML)
      
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  drawGraph(percent: number) {
    console.log();

    return {
      y: (100 - percent).toString() + "%",
      rad: ((45 - 15) / 100) * percent + 15
    };
  }

  oneMoreFunc(percent: number) {
    return;
  }
}

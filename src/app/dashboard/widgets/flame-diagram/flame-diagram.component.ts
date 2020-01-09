import {Component, Inject, OnInit, OnDestroy} from '@angular/core';
import {NewWidgetService} from "../../services/new-widget.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'evj-flame-diagram',
  templateUrl: './flame-diagram.component.html',
  styleUrls: ['./flame-diagram.component.scss']
})
export class FlameDiagramComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  public title: string;
  static itemCols = 20;
  static itemRows = 16;

  constructor(
    public widgetService: NewWidgetService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string,
    @Inject('uniqId') public uniqId: string
  ) {
    this.subscription = this.widgetService.getWidgetChannel(id).subscribe(data => {
      this.title = data.title;
    });
  }

  ngOnInit() {
    this.showMock();
  }

  private showMock(): void {
    // do subscribe
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

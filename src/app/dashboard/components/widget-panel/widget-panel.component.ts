import {Component, ElementRef, OnInit} from '@angular/core';
import {WidgetsService} from "../../services/widgets.service";
import {Observable} from "rxjs/index";

@Component({
  selector: 'evj-widget-panel',
  templateUrl: './widget-panel.component.html',
  styleUrls: ['./widget-panel.component.scss'],
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class WidgetPanelComponent implements OnInit {
  active = false;
  widgets: Observable<any[]>;

  constructor(private widgetsService: WidgetsService, private eref: ElementRef) {
    this.widgets = this.widgetsService.getAvailableWidgets();
  }

  onDocumentClick(event) {
    this.active = this.active && this.eref.nativeElement.contains(event.target);
  }

  ngOnInit() {
  }

  onToggleClick() {
    this.active = !this.active;
  }

}

import {Component, ElementRef, OnInit} from '@angular/core';
import {Observable} from "rxjs/index";
import {WidgetsService} from "../../services/widgets.service";

@Component({
  selector: 'evj-widgets-panel',
  templateUrl: './widgets-panel.component.html',
  styleUrls: ['./widgets-panel.component.scss'],
  host: {
    '(document:click)': 'onDocumentClick($event)',
  }
})

export class WidgetsPanelComponent implements OnInit {
  active = false;
  widgets: any[];


  constructor(private widgetsService: WidgetsService, private eref: ElementRef) {
    this.widgetsService.getAvailableWidgets().then(x => this.widgets = x);
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

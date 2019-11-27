import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
  Input,
  OnDestroy
} from "@angular/core";
import { ShiftService } from "../../services/shift.service";
import { Subscription } from "rxjs";
import { NewWidgetService } from "../../services/new-widget.service";
import {
  ShiftPass,
  Shift,
  Employee,
  ShiftMember
} from "../../models/shift.model";
import { EventService } from '../../services/event.service';
import { EventsWidgetNotification } from '../../models/events-widget';

@Component({
  selector: "evj-events-workspace",
  templateUrl: "./events-workspace.component.html",
  styleUrls: ["./events-workspace.component.scss"]
})
export class EventsWorkSpaceComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  event: EventsWidgetNotification = null;

  public title = "Рабочая область";

  static itemCols = 25;
  static itemRows = 45;

  constructor(
    private widgetService: NewWidgetService,
    private shiftService: ShiftService,
    private eventService: EventService,
    @Inject("isMock") public isMock: boolean,
    @Inject("widgetId") public id: string
  ) {
  }

  ngOnInit() {
    this.subscription = this.eventService.event$.subscribe((value) => {
      if (value) {
        this.event = value;
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }






}

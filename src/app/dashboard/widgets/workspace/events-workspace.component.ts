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
  comments: string[] = [];

  static itemCols = 20;
  static itemRows = 5;

  @ViewChild("input", { static: false }) input: ElementRef;
  @ViewChild("scroll", { static: false }) scroll: ElementRef;

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


  onSendMessage() {
    if (this.input.nativeElement.value) {
      this.comments.push(this.input.nativeElement.value);
      this.input.nativeElement.value = "";
    }
    setTimeout(() => {
      this.scrollBottom();
    }, 50);
  }

  scrollBottom() {
    this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
  }

  onEnterPush(event?: any) {
    if (event.keyCode === 13) {
      this.onSendMessage();
    }
  }

  createEvent() {
    this.event = {
      branch: "Производство",
      category: { id: 1004, name: "equipmentStatus", code: 3 },
      comment: "Комментарий, комментарий комментарий",
      description: "Описание описание описание...",
      deviationReason: "Причина отклонения...",
      directReasons: "Прямые причины",
      establishedFacts: "Факты установлены...",
      eventDateTime: new Date,
      eventType: "Предупреждение",
      fixedBy: { id: 4002, firstName: "Петр", lastName: "Петров", email: "test@test", phone: "00123456789" },
      id: 6006,
      place: { id: 5, name: "number" },
      itemNumber: 321128,
      organization: "АО Газпромнефть",
      priority: { id: 2002, name: "warning", code: 1 },
      responsibleOperator: { id: 4001, firstName: "Иван", lastName: "Иванов", email: "1@2", phone: "00123456789" },
      retrievalEvents: [],
      severity: "Critical",
      status: { id: 3001, name: "new", code: 0 },
      iconUrl: "number",
      iconUrlStatus: "number",
      statusName: '',
    }

    const ev = this.eventService.postAvailableWidgets();
    console.log(ev);
    
  }


}

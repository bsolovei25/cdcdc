import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnChanges
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
import { EventsWidgetNotification, EventsWidgetNotificationStatus, EventsWidgetNotificationPriority, RetrievalEvents } from '../../models/events-widget';

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
  isNew: boolean = true;

  priority;
  status;
  user;
  code;
  category;
  place;

  statuses: { [id in EventsWidgetNotificationStatus]: string; } = {
    "new": 'Новое',
    "inWork": 'В работе',
    "closed": 'Завершено'
  };

  priorities: { [id in EventsWidgetNotificationPriority]: string; } = {
    "danger": 'Высокий',
    "warning": 'Средний',
    "standard": 'Стандартный'
  };

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
    if (!this.isMock) {
      this.subscription = this.eventService.event$.subscribe((value) => {
        if (value) {
          this.isNew = false;
          this.event = value;
          console.log(value);

          this.loadItem();
        }
      })
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  async loadItem() {
    // create data load queue
    const dataLoadQueue: Promise<void>[] = [];

    // permission
    dataLoadQueue.push(
      this.eventService.getCategory().then(
        (data) => {
          this.category = data;
        }
      )
    );
    dataLoadQueue.push(
      this.eventService.getStatus().then(
        (data) => {
          this.status = data;
        }
      )
    );
    dataLoadQueue.push(
      this.eventService.getPriority().then(
        (data) => {
          this.priority = data;
        }
      )
    );
    dataLoadQueue.push(
      this.eventService.getUser().then(
        (data) => {
          this.user = data;
        }
      )
    );
    dataLoadQueue.push(
      this.eventService.getPlace().then(
        (data) => {
          this.place = data;
        }
      )
    );
    if (dataLoadQueue.length > 0) {
      try {
        // wait untill all data will be loaded (with parralel requests)
        await Promise.all(dataLoadQueue);
        // fill form data from source object

      } catch (err) {
        console.error(err);
      }
    }
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

    this.loadItem();

    this.isNew = true;
    this.event = {
      branch: "Производство",
      category: { id: 1004, name: "drops", code: '4' },
      comment: "Новое событие",
      description: "1 описание описание...",
      deviationReason: "Причина отклонения...",
      directReasons: "",
      establishedFacts: "",
      eventDateTime: new Date,
      eventType: "",
      fixedBy: { id: 4002, firstName: "Петр", lastName: "Петров", email: "test@test", phone: "00123456789" },
      // id: null,
      place: { id: 5001, name: "ГФУ-2 с БОР" },
      itemNumber: 321128,
      organization: "АО Газпромнефть",
      priority: { id: 2002, name: "warning", code: '1' },
      responsibleOperator: { id: 4001, firstName: "Иван", lastName: "Иванов", email: "1@2", phone: "00123456789" },
      retrievalEvents: [],
      severity: "Critical",
      status: { id: 3001, name: "new", code: '0' },
      iconUrl: "number",
      iconUrlStatus: "number",
      statusName: '',
      equipmentCategory: {
        id: 8001,
        name: "Статическое Оборудование",
        code: "0"
      },
    }


  }

  saveItem(): void {
    if (this.isNew) {
      const ev = this.eventService.postEvent(this.event);
      console.log(ev);

    } else {
      console.log(this.event);

      const ev = this.eventService.putEvent(this.event);
      console.log(ev);
    }
  }



  addRetrieval(): void {
    const retrieval: RetrievalEvents = {
      deadline: new Date,
      description: '',
      responsibleUser: null,
      status: { id: 3001, name: 'new', code: '0' },
      isNew: true
    }
    this.event.retrievalEvents.push(retrieval);


  }

}

import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
  OnDestroy,
} from "@angular/core";
import { Subscription } from "rxjs";
import { EventService } from '../../services/event.service';
import { EventsWidgetNotification, EventsWidgetNotificationStatus, EventsWidgetNotificationPriority, RetrievalEvents, IStatus, IPriority } from '../../models/events-widget';

@Component({
  selector: "evj-events-workspace",
  templateUrl: "./events-workspace.component.html",
  styleUrls: ["./events-workspace.component.scss"]
})
export class EventsWorkSpaceComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  event: EventsWidgetNotification = null;
  isLoading: boolean = false;

  public title = "Рабочая область";
  comments: string[] = [];
  isNew: boolean = true;

  priority: IPriority[];
  status: IStatus[];
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
    private eventService: EventService,
    @Inject("isMock") public isMock: boolean,
    @Inject("widgetId") public id: string
  ) {
  }

  ngOnInit() {
    if (!this.isMock) {
      this.subscription = this.eventService.event$.subscribe((value) => {
        if (value) {
          this.isLoading = true;
          this.isNew = false;
          this.event = value;
          console.log(value);

          this.loadItem();
          this.isLoading = false;
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
      category: { id: 1004, name: "equipmentStatus", code: '4' },
      comment: "Новое событие",
      description: "",
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
      priority: { id: 2003, name: "standard", code: '2' },
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

  async saveItem(): Promise<void> {
    const idxStatus = this.status.findIndex(f => f.id === Number(this.event.status.id));
    if (idxStatus !== -1) {
      this.event.status = { code: this.status[idxStatus].code, id: +this.status[idxStatus].id, name: this.status[idxStatus].name }
    }
    const idxPriority = this.priority.findIndex(f => f.id === Number(this.event.priority.id));
    if (idxStatus !== -1) {
      this.event.priority = { code: this.priority[idxPriority].code, id: +this.priority[idxPriority].id, name: this.priority[idxPriority].name }
    }
    const idxUser = this.user.findIndex(f => f.id === Number(this.event.fixedBy.id));
    if (idxUser !== -1) {
      this.event.fixedBy = {
        firstName: this.user[idxUser].firstName,
        id: +this.user[idxUser].id,
        lastName: this.user[idxUser].lastName,
        email: this.user[idxUser].email,
        phone: this.user[idxUser].phone
      }
    }
    if (this.isNew) {
      console.log(this.event);

      const ev = await this.eventService.postEvent(this.event);
      console.log(ev);
    } else {
      this.isLoading = true;
      console.log(this.event);


      const ev = await this.eventService.putEvent(this.event);
      this.isLoading = false;
      console.log(ev);
    }

    this.eventService.updateEvent$.next(true);
    let x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
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

  addRetrievalEvents(idEvent) {
    const retrieval: RetrievalEvents = {
      deadline: new Date,
      description: '',
      responsibleUser: null,
      status: { id: 3001, name: 'new', code: '0' },
      isNew: true
    }
    const post = this.eventService.addRetrievalEvents(idEvent, retrieval);
    console.log(post);
  }

  deleteRetrieval(idEvent: number, idRetr: number): void {
    const del = this.eventService.deleteRetrievalEvents(idEvent, idRetr);
    console.log(del);

  }

}

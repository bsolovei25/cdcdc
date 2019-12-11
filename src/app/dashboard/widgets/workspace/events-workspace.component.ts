import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
  OnDestroy,
  AfterViewInit,
} from "@angular/core";
import { Subscription } from "rxjs";
import { EventService } from '../../services/event.service';
import { EventsWidgetNotification, EventsWidgetNotificationStatus, EventsWidgetNotificationPriority, IStatus, IPriority, User, ICategory, EventsWidgetCategory, EventsWidgetCategoryCode } from '../../models/events-widget';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: "evj-events-workspace",
  templateUrl: "./events-workspace.component.html",
  styleUrls: ["./events-workspace.component.scss"]
})
export class EventsWorkSpaceComponent implements OnInit, OnDestroy, AfterViewInit {

  subscription: Subscription;
  event: EventsWidgetNotification;
  isLoading: boolean = true;

  public title = "Рабочая область";
  comments: string[] = [];
  isNew: boolean = true;

  isEdit: boolean = false;

  priority: IPriority[];
  status: IStatus[];
  user: User[];
  code;
  category: ICategory[];
  place;
  equipmentCategory;
  eventTypes;

  isNewRetrieval: EventsWidgetNotification = null;

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

  categories: { [id in EventsWidgetCategoryCode]: string; } = {
    "smotr": 'СМОТР',
    "safety": 'Безопасноть',
    "tasks": 'Производственные задания',
    "equipmentStatus": 'Состояния оборудования',
    "drops": 'Сбросы'
  };

  idUser: number = 0;

  static itemCols = 20;
  static itemRows = 5;

  @ViewChild("input", { static: false }) input: ElementRef;
  @ViewChild("scroll", { static: false }) scroll: ElementRef;
  @ViewChild("scroll2", { static: false }) scroll2: ElementRef;

  constructor(
    private eventService: EventService,
    // private formBuilder: FormBuilder,
    @Inject("isMock") public isMock: boolean,
    @Inject("widgetId") public id: string
  ) {
  }

  ngOnInit() {
    if (!this.isMock) {
      this.subscription = this.eventService.event$.subscribe((value) => {
        if (value) {
          this.isLoading = true;
          this.resetComponent();
          this.isNew = false;
          this.event = value;
          this.loadItem();
          console.log(value);

        }
      })
    }
    this.isLoading = false;
  }

  ngAfterViewInit(): void {
    // this.isLoading = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  resetComponent() {
    this.isNew = false;
    this.isNewRetrieval = null;
  }


  async loadItem() {
    this.isLoading = true;
    const dataLoadQueue: Promise<void>[] = [];

    dataLoadQueue.push(
      this.eventService.getCategory().then(
        (data) => {
          this.category = data;
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
      this.eventService.getPlace().then(
        (data) => {
          this.place = data;
        }
      )
    );
    dataLoadQueue.push(
      this.eventService.getEquipmentCategory().then(
        (data) => {
          this.equipmentCategory = data;
        }
      )
    );
    dataLoadQueue.push(
      this.eventService.getEventType().then(
        (data) => {
          this.eventTypes = data;
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
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
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

  async createEvent() {

    await this.loadItem();
    this.isNew = true;

    this.event = {
      itemNumber: 0,
      branch: "Производство",
      category: this.category ? this.category[0] : null,
      comment: "Новое событие",
      description: '',
      deviationReason: "Причина отклонения...",
      directReasons: "",
      establishedFacts: "",
      eventDateTime: new Date,
      eventType: this.eventTypes ? this.eventTypes[0] : null,
      fixedBy:
      {
        email: "test@test",
        firstName: "",
        id: 1,
        lastName: "",
        phone: "00123456789",
      },
      place: { id: 5001, name: "ГФУ-2 с БОР" },
      organization: "АО Газпромнефть",
      priority: this.priority ? this.priority[2] ? this.priority[2] : this.priority[0] : null,
      responsibleOperator: this.user ? this.user[0] : null,
      retrievalEvents: [],
      severity: "Critical",
      status: this.status ? this.status[0] : null,
      iconUrl: "number",
      iconUrlStatus: "number",
      statusName: '',
      equipmentCategory: this.equipmentCategory ? this.equipmentCategory[0] : null,
      deadline: new Date,
      graphValues: null
    }

  }

  addRetrieval(): void {
    document.getElementById("overlay-retrieval").style.display = "block";

    this.isNewRetrieval = {
      itemNumber: 0,
      branch: "Производство",
      category: this.category ? this.category[0] : null,
      comment: "Новое событие",
      deviationReason: "Причина отклонения...",
      directReasons: "",
      establishedFacts: "",
      eventDateTime: new Date,
      eventType: { id: 1, name: 'Отклонение от норм ТР' },
      fixedBy: { id: 2, firstName: "Петр", lastName: "Петров", email: "test@test", phone: "00123456789" },
      organization: "АО Газпромнефть",
      place: { id: 5001, name: "ГФУ-1" },
      priority: { id: 2003, name: "standard", code: "2" },
      responsibleOperator: { id: 1, firstName: "Иван", lastName: "Иванов", email: "1@2", phone: "00123456789" },
      status: this.status ? this.status[0] : null,
      description: '',
      equipmentCategory: this.equipmentCategory ? this.equipmentCategory[0] : null,
      retrievalEvents: [],
      severity: 'Critical',
      deadline: new Date,
      graphValues: null
    }
  }

  async saveItem(): Promise<void> {
    this.isLoading = true;
    let snackBar = document.getElementById("snackbar");

    if (this.isNew) {
      try {
        console.log(this.event);
        const ev = await this.eventService.postEvent(this.event);
        this.event = ev;
        snackBar.className = "show";
        snackBar.innerText = "Сохранено"
        this.isNew = false;
        setTimeout(function () { snackBar.className = snackBar.className.replace("show", ""); }, 3000);
      } catch (error) {
        snackBar.className = "show";
        snackBar.innerText = "Ошибка"
        setTimeout(function () { snackBar.className = snackBar.className.replace("show", ""); }, 3000);
        this.isLoading = false;
      }
    } else {
      try {
        console.log(this.event);
        const ev = await this.eventService.putEvent(this.event);
        console.log(ev);
        snackBar.className = "show";
        snackBar.innerText = "Сохранено"
        setTimeout(function () { snackBar.className = snackBar.className.replace("show", ""); }, 3000);
      } catch (error) {
        snackBar.className = "show";
        snackBar.innerText = "Ошибка"
        setTimeout(function () { snackBar.className = snackBar.className.replace("show", ""); }, 3000);
        this.isLoading = false;
      }
    }

    this.eventService.updateEvent$.next(true);
    this.isLoading = false;
  }





  overlayClose() {
    document.getElementById("overlay-retrieval").style.display = "none";
    this.isNewRetrieval = null;
  }

  cancelRetrieval(): void {
    this.event.retrievalEvents.pop();
  }

  async saveRetrieval(idEvent: number): Promise<void> {
    let snackBar = document.getElementById("snackbar");

    // Если не новый event, отсылаем
    if (!this.isNew) {
      try {
        const post = await this.eventService.addRetrievalEvents(idEvent, this.isNewRetrieval);
        this.event.retrievalEvents.push(post);
        this.overlayClose();
        this.eventService.updateEvent$.next(true);
        snackBar.className = "show";
        snackBar.innerText = "Сохранено"
        setTimeout(function () { snackBar.className = snackBar.className.replace("show", ""); }, 3000);

      } catch (error) {
        snackBar.className = "show";
        snackBar.innerText = "Ошибка"
        setTimeout(function () { snackBar.className = snackBar.className.replace("show", ""); }, 3000);
        this.isLoading = false;
      }
    } else {
      // Если новый event то добавляем в массив
      this.event.retrievalEvents.push(this.isNewRetrieval);
      this.overlayClose();
    }
  }

  editRetrieval(retrieval: EventsWidgetNotification) {
    this.isEdit = true;
    this.isNewRetrieval = retrieval;
    document.getElementById("overlay-retrieval").style.display = "block";
  }

  snackBar(text: string = 'Выполнено', durection: number = 3000) {
    let snackBar = document.getElementById("snackbar");
    snackBar.className = "show";
    snackBar.innerText = text;
    setTimeout(function () { snackBar.className = snackBar.className.replace("show", ""); }, durection);
  }

  async editSaveRetrieval() {
    this.isEdit = true;
    if (this.isNew) {
      const idx = this.event.retrievalEvents.findIndex(i => i.id === this.isNewRetrieval.id);
      if (idx !== -1) {
        this.event.retrievalEvents[idx] = this.isNewRetrieval;
      }
      this.isNewRetrieval = null;
      this.isEdit = false;
      this.overlayClose();
    } else {
      try {
        this.isLoading = true;
        const put = await this.eventService.editRetrievalEvents(this.event.id, this.isNewRetrieval);
        const idx = this.event.retrievalEvents.findIndex(i => i.id === this.isNewRetrieval.id);
        if (idx !== -1) {
          this.event.retrievalEvents[idx] = this.isNewRetrieval;
        }
        this.eventService.updateEvent$.next(true);
        this.overlayClose();
        this.isLoading = false;
        this.snackBar('Сохранено');
      } catch (error) {
        this.isLoading = false;
        this.snackBar('Ошибка');
      }
      this.isEdit = false;
    }

  }

  async deleteRetrieval(idEvent: number, idRetr: number): Promise<void> {
    const del = await this.eventService.deleteRetrievalEvents(idEvent, idRetr);
    this.eventService.updateEvent$.next(true);
    const idx = this.event.retrievalEvents.findIndex(i => i.id === idRetr);
    if (idx !== -1) {
      this.event.retrievalEvents.splice(idx, 1);
    }
  }

  getIndex(i: number): string {
    return Number(i + 1).toString();
  }

  compareFn(a, b) {
    // console.log(a, b, a && b && a.id == b.id);
    return a && b && a.id == b.id;
  }

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  changeCategory() {
    this.idUser = this.getRandomInt(7);
  }


  openLineChart() {
    document.getElementById("overlay-chart").style.display = "block";
    const event = new CustomEvent(
      'resize'
    );
    document.dispatchEvent(event);
  }

  overlayChartClose() {
    document.getElementById("overlay-chart").style.display = "none";
  }
}

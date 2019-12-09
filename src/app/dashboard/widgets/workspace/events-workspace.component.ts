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
import { EventsWidgetNotification, EventsWidgetNotificationStatus, EventsWidgetNotificationPriority, IStatus, IPriority, User, ICategory } from '../../models/events-widget';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: "evj-events-workspace",
  templateUrl: "./events-workspace.component.html",
  styleUrls: ["./events-workspace.component.scss"]
})
export class EventsWorkSpaceComponent implements OnInit, OnDestroy, AfterViewInit {

  subscription: Subscription;
  event: EventsWidgetNotification = null;
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
          this.event = value;
          this.loadItem();
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
    dataLoadQueue.push(
      this.eventService.getEquipmentCategory().then(
        (data) => {
          this.equipmentCategory = data;
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

  createEvent() {

    this.loadItem();

    this.isNew = true;
    this.event = {
      branch: "Производство",
      category: { id: 1004, name: "equipmentStatus", code: '4' },
      comment: "Новое событие",
      description: undefined,
      deviationReason: "Причина отклонения...",
      directReasons: "",
      establishedFacts: "",
      eventDateTime: new Date,
      eventType: "",
      fixedBy: { id: 2, firstName: "Петр", lastName: "Петров", email: "test@test", phone: "00123456789" },
      // id: null,
      place: { id: 5001, name: "ГФУ-2 с БОР" },
      itemNumber: 321128,
      organization: "АО Газпромнефть",
      priority: { id: 2003, name: "standard", code: '2' },
      responsibleOperator: { id: 1, firstName: "Иван", lastName: "Иванов", email: "1@2", phone: "00123456789" },
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
      }
    }


  }

  async saveItem(): Promise<void> {
    this.isLoading = true;
    // const idxStatus = this.status.findIndex(f => f.id === Number(this.event.status.id));
    // if (idxStatus !== -1) {
    //   this.event.status = { code: this.status[idxStatus].code, id: +this.status[idxStatus].id, name: this.status[idxStatus].name }
    // }
    // const idxPriority = this.priority.findIndex(f => f.id === Number(this.event.priority.id));
    // if (idxStatus !== -1) {
    //   this.event.priority = { code: this.priority[idxPriority].code, id: +this.priority[idxPriority].id, name: this.priority[idxPriority].name }
    // }
    // const idxUser = this.user.findIndex(f => f.id === Number(this.event.fixedBy.id));
    // if (idxUser !== -1) {
    //   this.event.fixedBy = {
    //     firstName: this.user[idxUser].firstName,
    //     id: +this.user[idxUser].id,
    //     lastName: this.user[idxUser].lastName,
    //     email: this.user[idxUser].email,
    //     phone: this.user[idxUser].phone
    //   }
    // }

    let snackBar = document.getElementById("snackbar");

    if (this.isNew) {
      this.event.retrievalEvents.map(ret => {
        // const idxUser = this.user.findIndex(f => f.id === Number(ret.responsibleOperator.id));
        // if (idxUser !== -1) {
        //   ret.responsibleOperator = {
        //     firstName: this.user[idxUser].firstName,
        //     id: +this.user[idxUser].id,
        //     lastName: this.user[idxUser].lastName,
        //     email: this.user[idxUser].email,
        //     phone: this.user[idxUser].phone
        //   }
        // }
      })
      try {
        const ev = await this.eventService.postEvent(this.event);
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
    } else {
      try {
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



  addRetrieval(): void {
    document.getElementById("overlay-retrieval").style.display = "block";

    this.isNewRetrieval = {
      branch: "Производство",
      category: { id: 1004, name: "equipmentStatus", code: "3" },
      comment: "Новое событие",
      deviationReason: "Причина отклонения...",
      directReasons: "",
      establishedFacts: "",
      eventDateTime: new Date,
      eventType: "",
      fixedBy: { id: 2, firstName: "Петр", lastName: "Петров", email: "test@test", phone: "00123456789" },
      itemNumber: 321131,
      organization: "АО Газпромнефть",
      place: { id: 5001, name: "ГФУ-1" },
      priority: { id: 2003, name: "standard", code: "2" },
      responsibleOperator: { id: 1, firstName: "Иван", lastName: "Иванов", email: "1@2", phone: "00123456789" },
      status: { id: 3001, name: "new", code: "0" },
      description: '',
      equipmentCategory: { id: 8001, name: "equipmentStatus", code: "3" },
      retrievalEvents: [],
      severity: 'Critical',
      deadline: new Date
    }
  }

  overlayClose() {
    document.getElementById("overlay-retrieval").style.display = "none";
    this.isNewRetrieval = null;
  }

  saveRetrieval(idEvent: number): void {

    // const retrieval: RetrievalEvents = {
    //   deadline: new Date,
    //   description: '',
    //   responsibleUser: null,
    //   status: { id: 3001, name: 'new', code: '0' },
    //   isNew: true
    // }
    // this.event.retrievalEvents.push(retrieval);

    this.addRetrievalEvents(idEvent);
  }

  cancelRetrieval(): void {
    this.event.retrievalEvents.pop();
  }

  async addRetrievalEvents(idEvent: number): Promise<void> {
    // let retrieval = this.event.retrievalEvents[this.event.retrievalEvents.length - 1];

    const idxUser = 0;

    // this.isNewRetrieval.responsibleOperator = {
    //   firstName: this.user[idxUser].firstName,
    //   id: +this.user[idxUser].id,
    //   lastName: this.user[idxUser].lastName,
    //   email: this.user[idxUser].email,
    //   phone: this.user[idxUser].phone
    // }

    let snackBar = document.getElementById("snackbar");

    if (this.event.id) {
      try {
        const post = await this.eventService.addRetrievalEvents(idEvent, this.isNewRetrieval);
        this.event.retrievalEvents[this.event.retrievalEvents.length - 1] = post;
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
      this.event.retrievalEvents.push(this.isNewRetrieval);
      this.overlayClose();
    }
  }

  editRetrieval(retrieval: EventsWidgetNotification) {
    this.isEdit = true;
    this.isNewRetrieval = retrieval;
    document.getElementById("overlay-retrieval").style.display = "block";
  }

  async editSaveRetrieval() {
    let snackBar = document.getElementById("snackbar");
    try {
      this.isLoading = true;
      const put = await this.eventService.editRetrievalEvents(this.event.id, this.isNewRetrieval);
      console.log(put);
      this.eventService.updateEvent$.next(true);
      snackBar.className = "show";
      snackBar.innerText = "Сохранено"
      this.overlayClose();
      setTimeout(function () { snackBar.className = snackBar.className.replace("show", ""); }, 3000);
      this.isLoading = false;
    } catch (error) {
      snackBar.className = "show";
      snackBar.innerText = "Ошибка"
      setTimeout(function () { snackBar.className = snackBar.className.replace("show", ""); }, 3000);
      this.isLoading = false;
    }

    // this.event.retrievalEvents.push(this.isNewRetrieval);
    this.overlayClose();

    this.isEdit = false;
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
    // console.log(a, b, a && b && a.num == b.num);
    return a && b && a.id == b.id;
  }











  // mainFormGroup: FormGroup;


  // resetComponent2() {
  //   this.mainFormGroup = this.formBuilder.group({
  //     branch: "Производство",
  //     category: { id: 1004, name: "equipmentStatus", code: '4' },
  //     comment: "Новое событие",
  //     description: ['', [
  //       Validators.required
  //     ]],
  //     deviationReason: "Причина отклонения...",
  //     directReasons: "",
  //     establishedFacts: "",
  //     eventDateTime: new Date,
  //     eventType: "",
  //     fixedBy: { id: 2, firstName: "Петр", lastName: "Петров", email: "test@test", phone: "00123456789" },
  //     id: null,
  //     place: { id: 5001, name: "ГФУ-2 с БОР" },
  //     itemNumber: 321128,
  //     organization: "АО Газпромнефть",
  //     priority: { id: 2003, name: "standard", code: '2' },
  //     responsibleOperator: { id: 1, firstName: "Иван", lastName: "Иванов", email: "1@2", phone: "00123456789" },
  //     retrievalEvents: [],
  //     severity: "Critical",
  //     status: { id: 3001, name: "new", code: '0' },
  //     iconUrl: "number",
  //     iconUrlStatus: "number",
  //     statusName: '',
  //     equipmentCategory: ''
  //   })

  // }


  // dataToForm() {

  //   this.mainFormGroup.setValue({
  //     branch: "Производство",
  //     category: { id: 1004, name: "equipmentStatus", code: '4' },
  //     comment: "Новое событие",
  //     description: undefined,
  //     deviationReason: "Причина отклонения...",
  //     directReasons: "",
  //     establishedFacts: "",
  //     eventDateTime: new Date,
  //     eventType: "",
  //     fixedBy: { id: 2, firstName: "Петр", lastName: "Петров", email: "test@test", phone: "00123456789" },
  //     id: null,
  //     place: { id: 5001, name: "ГФУ-2 с БОР" },
  //     itemNumber: 321128,
  //     organization: "АО Газпромнефть",
  //     priority: { id: 2003, name: "standard", code: '2' },
  //     responsibleOperator: { id: 1, firstName: "Иван", lastName: "Иванов", email: "1@2", phone: "00123456789" },
  //     retrievalEvents: [],
  //     severity: "Critical",
  //     status: { id: 3001, name: "new", code: '0' },
  //     iconUrl: "number",
  //     iconUrlStatus: "number",
  //     statusName: '',
  //     equipmentCategory: ''
  //   })

  // }


  // formToData() {

  // }

}

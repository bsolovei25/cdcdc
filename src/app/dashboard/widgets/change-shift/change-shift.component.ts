import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject
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

@Component({
  selector: "evj-change-shift",
  templateUrl: "./change-shift.component.html",
  styleUrls: ["./change-shift.component.scss"]
})
export class ChangeShiftComponent implements OnInit {
  @ViewChild("input", { static: false }) input: ElementRef;
  @ViewChild("scroll", { static: false }) scroll: ElementRef;
  @ViewChild("allPeople", { static: false }) allPeople: ElementRef;

  mapPosition = [
    {
      code: 'Responsible',
      name: 'Старший оператор'
    },
    {
      code: 'Common',
      name: 'Оператор'
    }
  ];

  comments: string[] = [];
  people = [];

  allWorkers = [
    {
      id: 1,
      name: "Борис Гребенщиков 1",
      position: "Старший оператор",
      place: "Блок очистки",
      status: "Сдал смену",
      onShift: true,
      main: false
    },
    {
      id: 2,
      name: "Сергей Сергеев 1",
      position: "Старший оператор",
      place: "Блок очистки",
      status: "Сдал смену",
      onShift: true,
      main: false
    },
    {
      id: 3,
      name: "Илья Ильин 1",
      position: "Старший оператор",
      place: "Блок очистки",
      status: "Сдал смену",
      onShift: true,
      main: false
    },
    {
      id: 4,
      name: "Петр Петров 1",
      position: "Оператор",
      place: "Блок очистки",
      status: "Сдал смену",
      onShift: false,
      main: false
    },
    {
      id: 5,
      name: "Иван Иванов 1",
      position: "Оператор",
      place: "Блок очистки",
      status: "Сдал смену",
      onShift: true,
      main: true
    },
    {
      id: 2,
      name: "Сергей Сергеев 2",
      position: "Старший оператор",
      place: "Блок очистки",
      status: "Сдал смену",
      onShift: true,
      main: false
    },
    {
      id: 3,
      name: "Илья Ильин 2",
      position: "Старший оператор",
      place: "Блок очистки",
      status: "Сдал смену",
      onShift: true,
      main: false
    },
    {
      id: 4,
      name: "Петр Петров 2",
      position: "Оператор",
      place: "Блок очистки",
      status: "Сдал смену",
      onShift: false,
      main: false
    },
    {
      id: 5,
      name: "Иван Иванов 2",
      position: "Оператор",
      place: "Блок очистки",
      status: "Сдал смену",
      onShift: true,
      main: false
    },
    {
      id: 1,
      name: "Борис Гребенщиков 1",
      position: "Старший оператор",
      place: "Блок очистки",
      status: "Сдал смену",
      onShift: true,
      main: true
    },
    {
      id: 2,
      name: "Сергей Сергеев 1",
      position: "Старший оператор",
      place: "Блок очистки",
      status: "Сдал смену",
      onShift: true,
      main: false
    },
    {
      id: 3,
      name: "Илья Ильин 1",
      position: "Старший оператор",
      place: "Блок очистки",
      status: "Сдал смену",
      onShift: true,
      main: false
    },
    {
      id: 4,
      name: "Петр Петров 1",
      position: "Оператор",
      place: "Блок очистки",
      status: "Сдал смену",
      onShift: false,
      main: false
    },
    {
      id: 5,
      name: "Иван Иванов 1",
      position: "Оператор",
      place: "Блок очистки",
      status: "Сдал смену",
      onShift: true,
      main: false
    },
    {
      id: 2,
      name: "Сергей Сергеев 2",
      position: "Старший оператор",
      place: "Блок очистки",
      status: "Сдал смену",
      onShift: true,
      main: false
    },
    {
      id: 3,
      name: "Илья Ильин 2",
      position: "Старший оператор",
      place: "Блок очистки",
      status: "Сдал смену",
      onShift: true,
      main: false
    },
    {
      id: 4,
      name: "Петр Петров 2",
      position: "Оператор",
      place: "Блок очистки",
      status: "Сдал смену",
      onShift: false,
      main: false
    },
    {
      id: 5,
      name: "Иван Иванов 2",
      position: "Оператор",
      place: "Блок очистки",
      status: "Сдал смену",
      onShift: true,
      main: false
    }
  ];

  aboutWidget;
  currentShift: Shift = null;
  presentMembers = null;
  absentMembers = null;

  subscription: Subscription;

  static itemCols = 16;
  static itemRows = 30;

  constructor(
    private widgetService: NewWidgetService,
    private shiftService: ShiftService,
    @Inject("isMock") public isMock: boolean,
    @Inject("widgetId") public id: string
  ) {
    this.shiftService.shiftPass.subscribe(data => {
      if (this.aboutWidget) {
        this.setRealtimeData(this.aboutWidget.widgetType, data);
      }
      // console.log(data);
    });

    this.subscription = this.widgetService
      .getWidgetChannel(this.id)
      .subscribe(data => {
        this.aboutWidget = data;
        this.setRealtimeData(this.aboutWidget.widgetType, this.shiftService.shiftPass.getValue());
      });
  }

  ngOnInit() {}

  private setRealtimeData(widgetType, data) {
    if (!widgetType || !data) {
      return;
    }
    if (widgetType === 'shift-pass') {
      this.currentShift = data.acceptingShift;
    } else {
      this.currentShift = data.passingShift;
    }
    this.absentMembers = this.currentShift.shiftMembers.filter(el => el.status === 'Absent');
    this.presentMembers = this.currentShift.shiftMembers.filter(el => el.status !== 'Absent');
    if (this.currentShift.shiftMembers) {
      const index = this.currentShift.shiftMembers.findIndex(
        item => item.employee.position === "Responsible"
      );
      this.currentShift.shiftMembers[index].employee.main = true;
    }
  }

  getDisplayPosition(code): string {
    if (code) {
      return this.mapPosition.find(el => el.code === code).name;
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

  onEnterPush(event?: any) {
    if (event.keyCode === 13) {
      this.onSendMessage();
    }
  }

  scrollBottom() {
    this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
  }

  peopleOnShift() {
    const array = [];
    for (let person of this.people) {
      if (person.onShift) {
        array.push(person);
      }
    }
    return array;
  }

  peopleAbsent() {
    const array = [];
    for (let person of this.people) {
      if (!person.onShift) {
        array.push(person);
      }
    }
    return array;
  }

  getMain(): ShiftMember {
    if (this.currentShift) {
      return this.currentShift.shiftMembers.find(item => item.employee.main);
    }
  }

  showPeople(event: any) {
    const classes: DOMTokenList = event.target.classList;
    if (classes.contains("onShift__add-active")) {
      classes.remove("onShift__add-active");
      this.allPeople.nativeElement.classList.remove(
        "onShift__allPeople-active"
      );
    } else {
      classes.add("onShift__add-active");
      this.allPeople.nativeElement.classList.add("onShift__allPeople-active");
    }
  }

  addPeopleToShift() {
    //
  }

  findMainAndSort() {
    let sortedArray = [];
    const indexOfMain = this.people.findIndex(item => item.main);

    if (indexOfMain !== 0 && indexOfMain !== this.people.length - 1) {
      sortedArray = this.people
        .slice(indexOfMain, indexOfMain + 1)
        .concat(
          this.people.slice(0, indexOfMain),
          this.people.slice(indexOfMain + 1, this.people.length)
        );
    } else if (indexOfMain === this.people.length - 1) {
      sortedArray = this.people
        .slice(indexOfMain, indexOfMain + 1)
        .concat(this.people.slice(0, indexOfMain));
    } else {
      sortedArray = this.people.map(item => item);
    }

    return sortedArray;
  }
}

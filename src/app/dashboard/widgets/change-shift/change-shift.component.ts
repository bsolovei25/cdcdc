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
import { ShiftPass, Shift } from "../../models/shift.model";

@Component({
  selector: "evj-change-shift",
  templateUrl: "./change-shift.component.html",
  styleUrls: ["./change-shift.component.scss"]
})
export class ChangeShiftComponent implements OnInit {
  @ViewChild("input", { static: false }) input: ElementRef;
  @ViewChild("scroll", { static: false }) scroll: ElementRef;
  @ViewChild("allPeople", { static: false }) allPeople: ElementRef;

  comments: string[] = ["qwerewqrewr", "weqrqweqr", "xcvxvcv"];
  people = [
    {
      id: 1,
      name: "Борис Гребенщиков",
      position: "Старший оператор",
      place: "Блок очистки",
      status: "Сдал смену",
      onShift: true,
      main: false
    },
    {
      id: 2,
      name: "Сергей Сергеев",
      position: "Старший оператор",
      place: "Блок очистки",
      status: "Сдал смену",
      onShift: true,
      main: false
    },
    {
      id: 3,
      name: "Илья Ильин",
      position: "Старший оператор",
      place: "Блок очистки",
      status: "Сдал смену",
      onShift: true,
      main: false
    },
    {
      id: 1,
      name: "Борис Гребенщиков 123",
      position: "Старший оператор",
      place: "Блок очистки",
      status: "Сдал смену",
      onShift: true,
      main: false
    },
    {
      id: 2,
      name: "Сергей Сергеев 123",
      position: "Старший оператор",
      place: "Блок очистки",
      status: "Сдал смену",
      onShift: true,
      main: false
    },
    {
      id: 3,
      name: "Илья Ильин 132",
      position: "Старший оператор",
      place: "Блок очистки",
      status: "Сдал смену",
      onShift: true,
      main: true
    }
  ];

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

  title: string;
  id: number;
  acceptingShift: Shift;
  passingShift: Shift;
  currentShift: Shift;

  subscription: Subscription;

  static itemCols = 25;
  static itemRows = 45;

  constructor(
    private widgetService: NewWidgetService,
    private shiftService: ShiftService,
    @Inject("isMock") public isMock: boolean
  ) {
    this.id = this.shiftService.shiftPass.id;
    this.acceptingShift = this.shiftService.shiftPass.acceptingShift;
    this.passingShift = this.shiftService.shiftPass.passingShift;
    this.currentShift = this.shiftService.shiftPass.acceptingShift;
    this.currentShift.shiftMembers
    console.log("shift: ", this.acceptingShift);
    console.log("shift: ", this.passingShift);
    // this.subscription = this.widgetService
    //   .getWidgetChannel(this.id)
    //   .subscribe(data => {
    //     console.log("title ", data);

    //   });
  }

  ngOnInit() {}

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

  getMain() {
    return this.people.find(item => item.main);
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

import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

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
      main: true
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
      id: 4,
      name: "Петр Петров",
      position: "Оператор",
      place: "Блок очистки",
      status: "Сдал смену",
      onShift: false,
      main: false
    },
    {
      id: 5,
      name: "Иван Иванов",
      position: "Оператор",
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
      id: 4,
      name: "Петр Петров",
      position: "Оператор",
      place: "Блок очистки",
      status: "Сдал смену",
      onShift: false,
      main: false
    },
    {
      id: 5,
      name: "Иван Иванов",
      position: "Оператор",
      place: "Блок очистки",
      status: "Сдал смену",
      onShift: true,
      main: false
    }
  ];

  constructor() {}

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
}

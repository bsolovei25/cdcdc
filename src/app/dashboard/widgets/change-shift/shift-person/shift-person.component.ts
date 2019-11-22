import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { ShiftMember } from "src/app/dashboard/models/shift.model";

@Component({
  selector: "evj-shift-person",
  templateUrl: "./shift-person.component.html",
  styleUrls: ["./shift-person.component.scss"]
})
export class ShiftPersonComponent implements OnInit {
  @Input() person: ShiftMember;
  @Input() onShift: boolean;

  @ViewChild("dropdown", { static: false }) ddMenu: ElementRef;

  constructor() {}

  ngOnInit() {
    console.log(this.person);
  }

  showMenu() {
    if (!this.person.employee.main) {
      const classes: DOMTokenList = this.ddMenu.nativeElement.classList;
      if (classes.contains("disable")) {
        classes.remove("disable");
      } else {
        classes.add("disable");
      }
    }
  }

  menuCheck(event: any) {
    switch (event.target.innerText) {
      case "Готов":
        break;
      case "Отсутствует":
        break;
      case "Сделать главным":
        break;
    }
  }

  addToShift(event: any) {
    console.log(event);
  }
}

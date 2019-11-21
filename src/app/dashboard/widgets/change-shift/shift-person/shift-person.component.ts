import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "evj-shift-person",
  templateUrl: "./shift-person.component.html",
  styleUrls: ["./shift-person.component.scss"]
})
export class ShiftPersonComponent implements OnInit {
  @Input() person: any;

  @ViewChild("dropdown", { static: false }) ddMenu: ElementRef;

  constructor() {}

  ngOnInit() {}

  showMenu() {
    const classes: DOMTokenList = this.ddMenu.nativeElement.classList;
    if (classes.contains("disable")) {
      classes.remove("disable");
    } else {
      classes.add("disable");
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

    // this.person.status = event.target.innerText;
  }
}

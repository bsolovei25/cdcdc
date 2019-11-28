import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { ShiftMember } from "src/app/dashboard/models/shift.model";
import { ShiftService } from "../../../services/shift.service";

@Component({
  selector: "evj-shift-person",
  templateUrl: "./shift-person.component.html",
  styleUrls: ["./shift-person.component.scss"]
})
export class ShiftPersonComponent implements OnInit {
  @Input() person: ShiftMember;
  @Input() currentBrigade: number;
  @Input() shiftType: string;
  @Input() shiftId: number;
  @Input() onShift: boolean;
  @Input() isPresent: boolean;
  @Input() isMain: boolean;

  isDropdownActive: boolean = false;

  @ViewChild("dropdown", { static: false }) ddMenu: ElementRef;

  mapPosition = [
    {
      code: "Responsible",
      name: "Старший оператор"
    },
    {
      code: "Common",
      name: "Оператор"
    }
  ];

  mapStatus = [
    {
      code: "Accepted",
      name: "Принял смену"
    },
    {
      code: "Passed",
      name: "Сдал смену"
    },
    {
      code: "InProgress",
      name: "В процессе"
    },
    {
      code: "Absent",
      name: "Отсутствует"
    }
  ];

  constructor(private shiftService: ShiftService) {}

  ngOnInit() {}

  getDisplayStatus(code): string {
    return this.mapStatus.find(el => el.code === code).name;
  }

  getDisplayPosition(code): string {
    return this.mapPosition.find(el => el.code === code).name;
  }

  showMenu() {
    if (this.ddMenu) {
      if (!this.person.employee.main) {
        const classes: DOMTokenList = this.ddMenu.nativeElement.classList;
        if (classes.contains("disable")) {
          classes.remove("disable");
          this.isDropdownActive = true;
        } else {
          classes.add("disable");
          this.isDropdownActive = false;
        }
      }
    }
  }

  onClickOutside() {
    if (this.ddMenu) {
      const classes: DOMTokenList = this.ddMenu.nativeElement.classList;
      if (!classes.contains("disable")) {
        classes.add("disable");
      }
    }
  }

  menuCheck(event: any, person) {
    switch (event.target.innerText) {
      case "Принять смену":
        break;
      case "Передать смену":
        break;
      case "Отсутствует":
        console.log(person);
        if (person.employee.brigade) {
          this.shiftService.changeStatus("Absent", person.employee.id, this.shiftId);
        } else {
          this.shiftService.delMember(person.employee.id, this.shiftId);
        }
        break;
      case "На месте":
        this.shiftService.changeStatus("InProgress", person.employee.id, this.shiftId);
        break;
      case "Сделать главным":
        this.shiftService.changePosition(person.employee.id);
        break;
    }
  }

  addToShift(id) {
    this.shiftService.addMember(id, this.shiftId);
  }
}

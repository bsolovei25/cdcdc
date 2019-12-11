import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  HostListener
} from "@angular/core";
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
  @ViewChild("insideElement", { static: false }) insideElement: ElementRef;

  // @HostListener("document:click", ["$event.target"])
  // public onClick(targetElement) {
  //   const clickedInside = this.insideElement.nativeElement.contains(
  //     targetElement
  //   );
  //   if (!clickedInside) {
  //     console.log("outside clicked");
  //   }
  // }

  mapPosition = [
    {
      code: "responsible",
      name: "Старший оператор"
    },
    {
      code: "common",
      name: "Оператор"
    }
  ];

  mapStatus = [
    {
      code: "accepted",
      name: "Принял смену"
    },
    {
      code: "passed",
      name: "Сдал смену"
    },
    {
      code: "inProgress",
      name: "В процессе"
    },
    {
      code: "absent",
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

  onMouseOver() {
    if (this.ddMenu) {
      if (!this.person.employee.main) {
        const classes: DOMTokenList = this.ddMenu.nativeElement.classList;
        if (classes.contains("disable")) {
          classes.remove("disable");
          this.isDropdownActive = true;
        }
      }
    }
  }

  onMouseOut(){
    if (this.ddMenu) {
      if (!this.person.employee.main) {
        const classes: DOMTokenList = this.ddMenu.nativeElement.classList;
        if (!classes.contains("disable"))  {
          classes.add("disable");
          this.isDropdownActive = false;
        }
      }
    }
  }

  // showMenu() {
  //   if (this.ddMenu) {
  //     if (!this.person.employee.main) {
  //       const classes: DOMTokenList = this.ddMenu.nativeElement.classList;
  //       if (classes.contains("disable")) {
  //         classes.remove("disable");
  //         this.isDropdownActive = true;
  //       } else {
  //         classes.add("disable");
  //         this.isDropdownActive = false;
  //       }
  //     }
  //   }
  // }

  // onClickOutside() {
  //   if (this.ddMenu) {
  //     const classes: DOMTokenList = this.ddMenu.nativeElement.classList;
  //     if (!classes.contains("disable")) {
  //       classes.add("disable");
  //     }
  //   }
  // }

  menuCheck(event: any, person) {
    switch (event.target.innerText) {
      case "Принять смену":
        this.shiftService.changeStatus(
          "accepted",
          person.employee.id,
          this.shiftId
        );
        break;
      case "Передать смену":
        this.shiftService.changeStatus(
          "passed",
          person.employee.id,
          this.shiftId
        );
        break;
      case "Отсутствует":
        console.log(person);
        if (person.employee.brigade) {
          this.shiftService.changeStatus(
            "absent",
            person.employee.id,
            this.shiftId
          );
        } else {
          this.shiftService.delMember(person.employee.id, this.shiftId);
        }
        break;
      case "На месте":
        this.shiftService.changeStatus(
          "inProgress",
          person.employee.id,
          this.shiftId
        );
        break;
      case "Отменить":
        this.shiftService.changeStatus(
          "inProgress",
          person.employee.id,
          this.shiftId
        );
        break;
      case "Сделать главным":
        this.shiftService.changePosition(person.employee.id, this.shiftId);
        break;
    }
  }

  addToShift(id) {
    if (!this.onShift)
      this.shiftService.addMember(id, this.shiftId);
  }
}

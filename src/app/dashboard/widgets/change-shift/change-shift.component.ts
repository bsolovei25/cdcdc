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
import { Shift, ShiftMember } from "../../models/shift.model";

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
      code: "Responsible",
      name: "Старший оператор"
    },
    {
      code: "Common",
      name: "Оператор"
    }
  ];

  comments: string[] = [];
  aboutWidget;
  currentShift: Shift = null;
  presentMembers = null;
  absentMembers = null;
  addingShiftMembers = [];

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
        this.setRealtimeData(
          this.aboutWidget.widgetType,
          this.shiftService.shiftPass.getValue()
        );
      });
  }

  ngOnInit() {
  }

  private setRealtimeData(widgetType, data) {
    if (!widgetType || !data) {
      return;
    }
    if (widgetType === "shift-pass") {
      this.currentShift = data.passingShift;
    } else {
      this.currentShift = data.acceptingShift;
    }

    if (this.currentShift.shiftMembers) {
      const index = this.currentShift.shiftMembers.findIndex(
        item => item.position === "Responsible"
      );
      console.log(index);
      this.currentShift.shiftMembers[index].employee.main = true;
      const tempMember = this.currentShift.shiftMembers[0];
      this.currentShift.shiftMembers[0] = this.currentShift.shiftMembers[index];
      this.currentShift.shiftMembers[index] = tempMember;
    }

    this.absentMembers = this.currentShift.shiftMembers.filter(
      el => el.status === "Absent"
    );
    this.presentMembers = this.currentShift.shiftMembers.filter(
      el => el.status !== "Absent"
    );

    const tempShiftMembers = this.shiftService.allMembers.filter(
      el => !this.currentShift.shiftMembers.some(em => em.employee.id === el.id)
    );
    for (const i in tempShiftMembers) {
      const addingShiftMember: ShiftMember = new (class implements ShiftMember {
        employee = null;
        shiftType = null;
        status = null;
        position = "Common";
      })();
      addingShiftMember.employee = tempShiftMembers[i];
      this.addingShiftMembers.push(addingShiftMember);
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

  shiftApply() {
    if (this.aboutWidget.widgetType === "shift-pass") {
      this.shiftService.applyShift(this.currentShift.id, "pass");
      console.log("Сдал");
    } else {
      console.log("Принял");
      this.shiftService.applyShift(this.currentShift.id, "accept");
    }
  }
}

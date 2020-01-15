import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject, HostListener
} from "@angular/core";
import { ShiftService } from "../../services/shift.service";
import { Subscription } from "rxjs";
import { NewWidgetService } from "../../services/new-widget.service";
import {Shift, ShiftComment, ShiftMember} from "../../models/shift.model";

interface CommentModel {
  id: number;
}

@Component({
  selector: "evj-change-shift",
  templateUrl: "./change-shift.component.html",
  styleUrls: ["./change-shift.component.scss"]
})
export class ChangeShiftComponent implements OnInit {
  @ViewChild("input", { static: false }) input: ElementRef;
  @ViewChild("scroll", { static: false }) scroll: ElementRef;
  @ViewChild("allPeople", { static: false }) allPeople: ElementRef;
  @ViewChild("addShift", { static: false }) addShift: ElementRef;

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

  public icon: string = 'peoples';
  public previewTitle: string = 'change-shift';

  comments: ShiftComment[] = [];
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
    @Inject("widgetId") public id: string,
    @Inject("uniqId") public uniqId: string
  ) {
    this.subscription = this.widgetService
      .getWidgetChannel(this.id)
      .subscribe(data => {
        this.aboutWidget = data;
        try {
          this.setRealtimeData(
            this.aboutWidget.widgetType,
            this.shiftService.shiftPass.getValue()
          );
        } catch { }
      });
    this.shiftService.shiftPass.subscribe(data => {
      if (this.aboutWidget) {
        this.setRealtimeData(this.aboutWidget.widgetType, data);
      }
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
      let index = this.currentShift.shiftMembers.findIndex(
        item => item.position === "responsible"
      );
      if (index === -1) {
        console.warn("No responsible found in shift: " + JSON.stringify(this.currentShift));
        index = 0;
      }

      this.currentShift.shiftMembers[index].employee.main = true;
      const tempMember = this.currentShift.shiftMembers[0];
      this.currentShift.shiftMembers[0] = this.currentShift.shiftMembers[index];
      this.currentShift.shiftMembers[index] = tempMember;

      this.comments = [];
      if (widgetType === "shift-pass") {
        for (const commentObj of this.currentShift.shiftPassingComments || []) {
          this.setMessage(commentObj);
        }
      } else {
        for (const commentObj of this.currentShift.shiftAcceptingComments || []) {
          this.setMessage(commentObj);
        }
      }
    }

    this.absentMembers = this.currentShift.shiftMembers.filter(
      el => el.status === "absent"
    );
    this.presentMembers = this.currentShift.shiftMembers.filter(
      el => el.status !== "absent"
    );
  }

  getDisplayPosition(code): string {
    if (code) {
      return this.mapPosition.find(el => el.code === code).name;
    }
  }

  async onSendMessage() {
    if (this.input.nativeElement.value) {
      const comment = await this.shiftService.sendComment(
        this.currentShift.shiftMembers.find(el => el.position === 'responsible').employee.id,
        this.currentShift.id,
        this.input.nativeElement.value,
        this.aboutWidget.widgetType);
      this.setMessage(comment);
    }
    setTimeout(() => {
      this.scrollBottom();
    }, 50);
  }

  private setMessage(comment: ShiftComment): void {
    this.comments.push(comment);
    try {
      this.input.nativeElement.value = '';
    } catch { }
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

  showPeople() {
    const classes: DOMTokenList = this.addShift.nativeElement.classList;
    if (classes.contains("onShift__add-active")) {
      classes.remove("onShift__add-active");
      this.allPeople.nativeElement.classList.remove(
        "onShift__allPeople-active"
      );
    } else {
      this.showFreeShiftMembers();
      classes.add("onShift__add-active");
      this.allPeople.nativeElement.classList.add("onShift__allPeople-active");
    }
  }

  @HostListener('document:changeShift_clickAddBtn', ['$event'])
  removeAddPeople(event) {
    const classes: DOMTokenList = this.addShift.nativeElement.classList;
    if (classes.contains("onShift__add-active")) {
      classes.remove("onShift__add-active");
      this.allPeople.nativeElement.classList.remove(
        "onShift__allPeople-active"
      );
    }
  }

  async showFreeShiftMembers() {
    const tempShiftMembers = await this.shiftService.getFreeShiftMembers(this.currentShift.id);
    this.addingShiftMembers.splice(0, this.addingShiftMembers.length);
    for (const i in tempShiftMembers) {
      const addingShiftMember: ShiftMember = new (class implements ShiftMember {
        employee = null;
        shiftType = null;
        status = null;
        position = "common";
      })();
      addingShiftMember.employee = tempShiftMembers[i];
      this.addingShiftMembers.push(addingShiftMember);
    }
  }

  shiftApply() {
    if (this.aboutWidget.widgetType === "shift-pass") {
      this.shiftService.applyShift(this.currentShift.id, "pass");
    } else {
      this.shiftService.applyShift(this.currentShift.id, "accept");
    }
  }
}

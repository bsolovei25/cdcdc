import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "evj-change-shift",
  templateUrl: "./change-shift.component.html",
  styleUrls: ["./change-shift.component.scss"]
})
export class ChangeShiftComponent implements OnInit {
  @ViewChild("input", { static: false }) input: ElementRef;
  @ViewChild("scroll", { static: false }) scroll: ElementRef;

  comments: string[] = ["qwerewqrewr", "weqrqweqr", "xcvxvcv"];

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
}

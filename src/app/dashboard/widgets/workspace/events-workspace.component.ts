import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
  Input
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
  selector: "evj-events-workspace",
  templateUrl: "./events-workspace.component.html",
  styleUrls: ["./events-workspace.component.scss"]
})
export class EventsWorkSpaceComponent implements OnInit {

  subscription: Subscription;

  static itemCols = 25;
  static itemRows = 45;

  constructor(
    private widgetService: NewWidgetService,
    private shiftService: ShiftService,
    @Inject("isMock") public isMock: boolean,
    @Inject("widgetId") public widgetId: string
  ) {
  }

  ngOnInit() {

    
  }


  

}

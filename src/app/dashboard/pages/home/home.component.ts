import {Component, OnInit} from '@angular/core';
import {ShiftService} from "../../services/shift.service";

@Component({
  selector: 'evj-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(shiftService: ShiftService) {
    shiftService.getShiftPass();
  }

  ngOnInit() {

  }

}

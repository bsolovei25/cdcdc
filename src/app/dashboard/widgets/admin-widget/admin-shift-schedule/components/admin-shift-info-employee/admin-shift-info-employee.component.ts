import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'evj-admin-shift-info-employee',
  templateUrl: './admin-shift-info-employee.component.html',
  styleUrls: ['./admin-shift-info-employee.component.scss']
})
export class AdminShiftInfoEmployeeComponent implements OnInit {
  @Input() public data;
  @Input() public type: string;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { IAdminShiftUserBrigade } from '../../admin-shift-schedule.component';

@Component({
  selector: 'evj-admin-shift-info-employee',
  templateUrl: './admin-shift-info-employee.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./admin-shift-info-employee.component.scss']
})
export class AdminShiftInfoEmployeeComponent implements OnInit {
  @Input() public data: IAdminShiftUserBrigade;
  @Input() public type: string;

  constructor() { }

  ngOnInit(): void {
  }

}

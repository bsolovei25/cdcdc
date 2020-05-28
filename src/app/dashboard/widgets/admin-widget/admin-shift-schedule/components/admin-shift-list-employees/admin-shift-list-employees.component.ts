import { Component, OnInit, ChangeDetectionStrategy, Input, TemplateRef } from '@angular/core';
import { IAdminShiftUserBrigade } from '../../admin-shift-schedule.component';


@Component({
  selector: 'evj-admin-shift-list-employees',
  templateUrl: './admin-shift-list-employees.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./admin-shift-list-employees.component.scss']
})
export class AdminShiftListEmployeesComponent implements OnInit {
  @Input() template: TemplateRef<any>;
  @Input() public data: IAdminShiftUserBrigade[];

  constructor() { }

  ngOnInit(): void {
  }

}

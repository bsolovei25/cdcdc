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
  @Input() public data: IAdminShiftUserBrigade[]

  // public data = [
  //   {
  //     fio: 'Иванов Иван Иванович',
  //     specialty: 'Слесарь АСУ ТП',
  //     avatar: 'slesar',
  //     brigade: 1,
  //   },
  //   {
  //     fio: 'Иванов Иван Иванович',
  //     specialty: 'Слесарь АСУ ТП',
  //     avatar: 'slesar',
  //     brigade: 2,
  //   }, {
  //     fio: 'Иванов Иван Иванович',
  //     specialty: 'Слесарь АСУ ТП',
  //     avatar: 'slesar',
  //     brigade: 3,
  //   },
  //   {
  //     fio: 'Иванов Иван Иванович',
  //     specialty: 'Слесарь АСУ ТП',
  //     avatar: 'slesar',
  //     brigade: 1,
  //   }
  // ]

  constructor() { }

  ngOnInit(): void {
  }

}

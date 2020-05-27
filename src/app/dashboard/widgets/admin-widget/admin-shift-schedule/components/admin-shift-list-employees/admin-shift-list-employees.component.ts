import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'evj-admin-shift-list-employees',
  templateUrl: './admin-shift-list-employees.component.html',
  styleUrls: ['./admin-shift-list-employees.component.scss']
})
export class AdminShiftListEmployeesComponent implements OnInit {

  public data = [
    {
      fio: 'Иванов Иван Иванович',
      specialty: 'Слесарь АСУ ТП',
      avatar: 'slesar',
      brigade: 1,
    },
    {
      fio: 'Иванов Иван Иванович',
      specialty: 'Слесарь АСУ ТП',
      avatar: 'slesar',
      brigade: 2,
    }, {
      fio: 'Иванов Иван Иванович',
      specialty: 'Слесарь АСУ ТП',
      avatar: 'slesar',
      brigade: 3,
    },
    {
      fio: 'Иванов Иван Иванович',
      specialty: 'Слесарь АСУ ТП',
      avatar: 'slesar',
      brigade: 1,
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

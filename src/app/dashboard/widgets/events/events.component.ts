import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'evj-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  categories = [
    {
      iconUrl: './assets/icons/widgets/events/status.svg',
      closedCount: 5,
      allCount: 10,
      name: "Состояние оборудования отказы"
    },
    {
      iconUrl: './assets/icons/widgets/events/safety.svg',
      closedCount: 5,
      allCount: 10,
      name: "Безопасноть"
    },
    {
      iconUrl: './assets/icons/widgets/events/tasks.svg',
      closedCount: 5,
      allCount: 10,
      name: "Производственные задания и разпоряжения"
    },
    {
      iconUrl: './assets/icons/widgets/events/review.svg',
      closedCount: 5,
      allCount: 10,
      name: "Смотр"
    },
    {
      iconUrl: './assets/icons/widgets/events/fire.svg',
      closedCount: 5,
      allCount: 10,
      name: "Сброс на факел"
    }
  ];

  notifications: any[] = [
    {
      id: 1,
      serialNumber: 123,
      priority: "critical",
      dateTime: new Date("2013-10-21T13:28:06"),
      iconUrl: "./assets/icons/widgets/events/review.svg",
      status: "new",
      heading: "Отклонение",
      body: "Превышение уровня в колонне К-8 (КИП поз. 12LISAННL-1055) в 11:20"
    },
    {
      id: 2,
      serialNumber: 1243,
      priority: "critical",
      dateTime: new Date("2013-10-21T13:28:06"),
      iconUrl: "./assets/icons/widgets/events/review.svg",
      status: "new",
      heading: "Отклонение",
      body: "Превышение уровня в колонне К-8 (КИП поз. 12LISAННL-1055) в 11:20"
    },
    {
      id: 3,
      serialNumber: 123,
      priority: "critical",
      dateTime: new Date("2013-10-21T13:28:06"),
      iconUrl: "./assets/icons/widgets/events/review.svg",
      status: "new",
      heading: "Отклонение в два",
      body: "Превышение уровня в колонне К-8 (КИП поз. 12LISAННL-1055) в 11:20"
    },
    {
      id: 3,
      serialNumber: 123,
      priority: "critical",
      dateTime: new Date("2013-10-21T13:28:06"),
      iconUrl: "./assets/icons/widgets/events/review.svg",
      status: "new",
      heading: "Отклонение в два",
      body: "Превышение уровня в колонне К-8 (КИП поз. 12LISAННL-1055) в 11:20"
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }


}

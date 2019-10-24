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

  constructor() {
  }

  ngOnInit() {
  }


}

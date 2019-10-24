import {Component, OnInit} from '@angular/core';
import {EventsCategory} from "../../models/events-category";
import {EventsFilter} from "../../models/events-filter";

@Component({
  selector: 'evj-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  categories = [
    {
      iconUrl: './assets/icons/widgets/events/status.svg',
      counters: {
        closed: 5,
        all: 10,
      },
      name: "Состояние оборудования отказы",
      isActive: false
    },
    {
      iconUrl: './assets/icons/widgets/events/safety.svg',
      counters: {
        closed: 5,
        all: 10,
      },
      name: "Безопасноть",
      isActive: false
    },
    {
      iconUrl: './assets/icons/widgets/events/tasks.svg',
      counters: {
        closed: 5,
        all: 10,
      },
      name: "Производственные задания и разпоряжения",
      isActive: false
    },
    {
      iconUrl: './assets/icons/widgets/events/review.svg',
      counters: {
        closed: 5,
        all: 10,
      },
      name: "Смотр",
      isActive: false
    },
    {
      id: "5",
      iconUrl: './assets/icons/widgets/events/fire.svg',
      counters: {
        closed: 5,
        all: 10,
      },
      name: "Сброс на факел",
      isActive: false
    }
  ];

  notifications: any[] = [
    {
      id: 1,
      serialNumber: 123,
      priority: "danger",
      dateTime: new Date("2013-10-21T13:28:06"),
      iconUrl: "./assets/icons/widgets/events/review.svg",
      status: {code: "new", name: "Новое"},
      heading: "Отклонение",
      body: "Превышение уровня в колонне К-8 (КИП поз. 12LISAННL-1055) в 11:20"
    },
    {
      id: 2,
      serialNumber: 1243,
      priority: "warning",
      dateTime: new Date("2013-10-21T13:28:06"),
      iconUrl: "./assets/icons/widgets/events/review.svg",
      status: {code: "new", name: "Новое"},
      heading: "Отклонение",
      body: "Превышение уровня в колонне К-8 (КИП поз. 12LISAННL-1055) в 11:20"
    },
    {
      id: 3,
      serialNumber: 123,
      priority: "standart",
      dateTime: new Date("2013-10-21T13:28:06"),
      iconUrl: "./assets/icons/widgets/events/review.svg",
      status: {code: "new", name: "Новое"},
      heading: "Отклонение в два",
      body: "Превышение уровня в колонне К-8 (КИП поз. 12LISAННL-1055) в 11:20"
    },
    {
      id: 3,
      serialNumber: 123,
      priority: "danger",
      dateTime: new Date("2013-10-21T13:28:06"),
      iconUrl: "./assets/icons/widgets/events/review.svg",
      status: {code: "new", name: "Новое"},
      heading: "Отклонение в два",
      body: "Превышение уровня в колонне К-8 (КИП поз. 12LISAННL-1055) в 11:20"
    }
  ];


  filters: EventsFilter[] = [
    {
      code: "all",
      name: "Все",
      counter: 11,
      isActive: true
    },
    {
      code: "closed",
      name: "Отработано",
      counter: 11,
      isActive: false
    },
    {
      code: "in-work",
      name: "В работе",
      counter: 10,
      isActive: false
    },
  ];

  constructor() {
  }

  ngOnInit() {
  }

  onCategoryClick(category) {
    category.isActive = !category.isActive;
  }

  onFilterClick(filter) {
    this.filters.forEach(f => f.isActive = false);
    filter.isActive = true;
  }


}

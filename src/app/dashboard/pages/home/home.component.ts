import {Component, OnInit} from '@angular/core';
import {LineChartOptions} from "../../models/line-chart-options";
import {DndDropEvent} from "ngx-drag-drop";

@Component({
  selector: 'evj-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public widgets = [
    {
      id: 1,
      options: {
        name: "Уровень в кубе колонны К-8 (12LISAННL-1055)",
        code: "C-1",
        units: "кг/м3",
        type: ""
      }
    },
    {
      id: 2,
      options: {
        name: "Уровень в кубе колонны К-8 (12LISAННL-1055)",
        code: "C-2",
        units: "кг/м3",
        type: ""
      }
    },
    {
      id: 3,
      options: {
        name: "Уровень в кубе колонны К-8 (12LISAННL-1055)",
        code: "C-3",
        units: "кг/м3",
        type: ""
      }
    },
    {
      id: 4,
      options: null
    },
    {
      id: 5,
      options: null
    },
    {
      id: 6,
      options: null
    },
    {
      id: 7,
      options: null
    },
    {
      id: 8,
      options: {
        name: "Уровень в кубе колонны К-8 (12LISAННL-1055)",
        code: "C-3",
        units: "кг/м3",
        type: ""
      }
    },
    {
      id: 9,
      options: {
        name: "Уровень в кубе колонны К-8 (12LISAННL-1055)",
        code: "C-3",
        units: "кг/м3",
        type: ""
      }
    },
    {
      id: 10,
      options: {
        name: "Уровень в кубе колонны К-8 (12LISAННL-1055)",
        code: "C-3",
        units: "кг/м3",
        type: ""
      }
    },
    {
      id: 11,
      options: {
        name: "Уровень в кубе колонны К-8 (12LISAННL-1055)",
        code: "C-3",
        units: "кг/м3",
        type: ""
      }
    },
    {
      id: 12,
      options: null
    }
  ];


  onDrop(event: DndDropEvent, currentWidget) {
    currentWidget.options = event.data.options;
    event.data.options = null;
    this.widgets.find(w => w.id === event.data.id).options = null;
  }


  constructor() {
    console.log(this.widgets);
  }

  ngOnInit() {
  }

}

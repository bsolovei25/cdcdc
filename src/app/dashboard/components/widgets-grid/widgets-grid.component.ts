import {Component, OnInit} from '@angular/core';
import {DndDropEvent} from "ngx-drag-drop";

@Component({
  selector: 'evj-widgets-grid',
  templateUrl: './widgets-grid.component.html',
  styleUrls: ['./widgets-grid.component.scss']
})
export class WidgetsGridComponent implements OnInit {
  draggingMode = false;

  cells = [
    {
      position: 'bb1',
      widget: {
        name: "Уровень в кубе колонны К-8 (12LISAННL-1055)",
        code: "C-1",
        units: "кг/м3",
        type: ""
      }
    },
    {
      position: 'bb2',
      widget: null
    },
    {
      position: 'bs1',
      widget: null
    },
    {
      position: 'ss1',
      widget: null
    },
    {
      position: 'ss2',
      widget: null
    },
    {
      position: 'ss3',
      widget: null
    },
    {
      position: 'ss4',
      widget: null
    },
    {
      position: 'ss5',
      widget: null
    },
    {
      position: 'ss6',
      widget: null
    }
  ];


  constructor() {
  }

  ngOnInit() {
  }

  onDragStart(event) {
    this.draggingMode = true;
  }

  onDragEnd(event) {
    this.draggingMode = false;
  }

  onDrop(event: DndDropEvent, cell) {

    if (event.data.position) {
      this.cells.find(c => c.position === event.data.position).widget = null && cell.widget;
    }

    cell.widget = event.data.widget;

    this.draggingMode = false;

  }

}

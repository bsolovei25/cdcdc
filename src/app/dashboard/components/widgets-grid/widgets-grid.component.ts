import {Component, OnInit} from '@angular/core';
import {DndDropEvent} from "ngx-drag-drop";
import {WidgetsService} from "../../services/widgets.service";

@Component({
  selector: 'evj-widgets-grid',
  templateUrl: './widgets-grid.component.html',
  styleUrls: ['./widgets-grid.component.scss']
})
export class WidgetsGridComponent implements OnInit {
  draggingMode = false;

  cells = [
    //uncomment to unblock position bb1
    // {
    //   position: 'bb1',
    //   widget: null,
    //   data: null
    // },
    {
      position: 'bb2',
      widget: null,
      data: null
    },
    {
      position: 'bs1',
      widget: null,
      data: null
    },
    {
      position: 'ss1',
      widget: null,
      data: null
    },
    {
      position: 'ss2',
      widget: null,
      data: null

    },
    {
      position: 'ss3',
      widget: null,
      data: null
    },
    {
      position: 'ss4',
      widget: null,
      data: null

    },
    {
      position: 'ss5',
      widget: null,
      data: null
    },
    {
      position: 'ss6',
      widget: null,
      data: null
    }
  ];


  constructor(private widgetsService: WidgetsService) {
    this.widgetsService.getUserGrid().subscribe(ref => {
      this.cells = ref;

      this.cells.forEach(c => {
        if (c.widget) {
          this.widgetsService.getWidgetLiveData(c.widget.id).subscribe(ref => {
            c.data = ref;
          });
        } else {
          c.data = null;
        }
      });


    });
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

    if (cell.widget) {
      this.widgetsService.getWidgetLiveData(cell.widget.id).subscribe(ref => {
        cell.data = ref;
      });
    } else {
      cell.data = null;
    }

    this.draggingMode = false;

  }

}

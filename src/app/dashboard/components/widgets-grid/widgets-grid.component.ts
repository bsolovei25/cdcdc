import {Component, OnInit} from '@angular/core';
import {DndDropEvent} from "ngx-drag-drop";
import {WidgetsService} from "../../services/widgets.service";
import {UserSettingsService} from '../../services/user-settings.service';

@Component({
  selector: 'evj-widgets-grid',
  templateUrl: './widgets-grid.component.html',
  styleUrls: ['./widgets-grid.component.scss']
})

export class WidgetsGridComponent implements OnInit {
  draggingMode = false;

  constructor(private widgetsService: WidgetsService, private userService: UserSettingsService) {

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
      this.userService.cells.find(c => c.position === event.data.position).widget = null && cell.widget;
    }

    cell.widget = null;

    cell.widget = event.data.widget;

    if (cell.widget) {
      this.widgetsService.getWidgetLiveData(cell.widget.id).subscribe(ref => {
        cell.data = ref;
      });
    } else {
      cell.data = null;
    }

    this.draggingMode = false;

    // TODO
    console.log(this.userService.cells);
  }
}

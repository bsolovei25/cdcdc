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
    this.userService.addCellByPosition(event.data.position, event.data.widget, cell);
    this.draggingMode = false;
  }
}

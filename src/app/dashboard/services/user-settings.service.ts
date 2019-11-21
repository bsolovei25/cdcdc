import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {WidgetsService} from './widgets.service';
import {Machine_MI, MI_DataGet, MI_DataSend, MI_ParamSend} from '../models/manual-input.model';
import {UserGrid, UserSettings} from '../models/user-settings.model';

@Injectable({providedIn: 'root'})
export class UserSettingsService {

  private restUrl: string;

  public UserId = 1;
  public ScreenId = 1;

  // temp
  public cells = [
    {
      position: 'bb1',
      widget: null,
      data: null
    },
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

  public screens = [
    {
      id: 1,
      name: 'Экран 1',
      isActive: true
    },
    {
      id: 2,
      name: 'Экран 2',
      isActive: false
    },
    {
      id: 3,
      name: 'Экран 3',
      isActive: false
    }
  ];

  public availableWidgets;

  constructor(private http: HttpClient, private widgetsService: WidgetsService) {
    this.restUrl = environment.restUrl;
    this.getUserData();
  }

  private async getUserData() {

    this.availableWidgets = await this.widgetsService.getAvailableWidgets();

    this.http.get(this.restUrl + '/user-management/getscreen/1/1').subscribe((ref: UserSettings) => {
      console.log(ref);
      for (const i in ref.userGrid) {
        for (const j in this.cells) {
          if (this.cells[j].position === ref.userGrid[i].position) {
            this.cells[j].position = ref.userGrid[i].position;
            this.cells[j].widget = this.availableWidgets.find(e => e.id === ref.userGrid[i].widgetId);
          }
        }
      }
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

  public deleteCellByPosition(position) {
    let cell = this.cells.find(el => el.position === position);
    cell.widget = null;
    cell.data = null;
    this.screenSave();
  }

  public addCellByPosition(position, widget, cell) {
    console.log("addcell");
    if (position) {
      this.cells.find(c => c.position === position).widget = null && cell.widget;
    }
    cell.widget = widget;
    if (cell.widget) {
      // this.widgetsService.getWidgetLiveData(cell.widget.id).subscribe(ref => {
      //   cell.data = ref;
      // });
    } else {
      cell.data = null;
    }
    this.screenSave();
  }

  private screenSave() {
    console.log(this.cells);
    const UserId = this.UserId;
    const ScreenId = this.ScreenId;
    let userSettings: UserSettings = new class implements UserSettings {
      userId = UserId;
      screenId = ScreenId;
      userGrid: UserGrid[] = [];
    };
    for (const i in this.cells) {
      let cell = this.cells[i];
      if (cell.widget != null) {
        let cellSetting: UserGrid = new class implements UserGrid {
          widgetId = cell.widget.id;
          position = cell.position;
        };
        userSettings.userGrid.push(cellSetting);
      }
    }
    console.log(userSettings);

    this.http.post(this.restUrl + '/user-management/setscreen/', userSettings)
      .subscribe(
        ans => {
          console.log(ans);
        },
        error => console.log(error)
      );
  }
}

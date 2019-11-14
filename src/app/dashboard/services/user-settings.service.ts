import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {WidgetsService} from './widgets.service';

@Injectable({providedIn: 'root'})
export class UserSettingsService {

  private restUrl: string;

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

  public availableWidgets;

  constructor(private http: HttpClient, private widgetsService: WidgetsService) {
    this.restUrl = environment.restUrl;
    this.getUserData();
  }

  private async getUserData() {

    this.availableWidgets = await this.widgetsService.getAvailableWidgets();

    this.http.get('./assets/mock/user_grid.json').subscribe(ref => {
      for (const i in ref) {
        for (const j in this.cells) {
          if (this.cells[j].position === ref[i].position) {
            this.cells[j].position = ref[i].position;
            this.cells[j].widget = this.availableWidgets.find(e => e.id === ref[i].id);
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
}

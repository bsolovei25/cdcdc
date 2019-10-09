import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {

  constructor(public http: HttpClient) {
  }

  getAvailableWidgets(): Observable<any> {
    return this.http.get('./assets/mock/widgets.json');
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';
import { IAlertWindowModel } from '@shared/models/alert-window.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentCodingService {

  private restUrl: string;

  public alertWindow$: BehaviorSubject<IAlertWindowModel> = new BehaviorSubject<IAlertWindowModel>(null);

  constructor(private http: HttpClient, configService: AppConfigService) {
    this.restUrl = configService.restUrl;
  }

  public closeAlert(): void {
    this.alertWindow$.next(null);
  }
}

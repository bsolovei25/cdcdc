import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/services/appConfigService';
import { BehaviorSubject } from 'rxjs';
import { IAlertWindowModel } from '@shared/models/alert-window.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentsScansService {

  private restUrl: string;

  public alertWindow$: BehaviorSubject<IAlertWindowModel> = new BehaviorSubject<IAlertWindowModel>(null);

  constructor(private http: HttpClient, configService: AppConfigService) {
    this.restUrl = configService.restUrl;
  }

  public closeAlert(): void {
    this.alertWindow$.next(null);
  }
}

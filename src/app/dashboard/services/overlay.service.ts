import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../services/appConfigService';
import { BehaviorSubject } from 'rxjs';
import { IAlertWindowModel } from '@shared/models/alert-window.model';

@Injectable({
    providedIn: 'root',
})
export class OverlayService {

    public closed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public dashboardAlert$: BehaviorSubject<IAlertWindowModel> = new BehaviorSubject<IAlertWindowModel>(null);

    public closeDashboardAlert(): void {
        this.dashboardAlert$.next(null);
    }

}

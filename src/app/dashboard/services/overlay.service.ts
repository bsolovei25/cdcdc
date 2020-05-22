import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../services/appConfigService';
import { BehaviorSubject } from 'rxjs';
import { IAlertWindowModel } from '@shared/models/alert-window.model';
import { IAlertPasswordModel } from '../../@shared/models/alert-password.model';

@Injectable({
    providedIn: 'root',
})
export class OverlayService {
    public closed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public dashboardAlert$: BehaviorSubject<IAlertWindowModel> = new BehaviorSubject<
        IAlertWindowModel
    >(null);
    public dashboardAlertPassword$: BehaviorSubject<IAlertPasswordModel> = new BehaviorSubject<
        IAlertPasswordModel
    >(null);

    public closeDashboardAlert(): void {
        this.dashboardAlert$.next(null);
    }

    public closeDashboardPasswordAlert(): void {
        this.dashboardAlertPassword$.next(null);
    }
}

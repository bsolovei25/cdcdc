import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';
import { IKpeAccTimelinesDataEditPlan } from '@dashboard/models/KPE/kpe-accuracy-timelines-data.model';
import { IAlertWindowModel } from '@shared/interfaces/alert-window.model';

@Injectable({
  providedIn: 'root'
})
export class KpeAccuracyTimelineDataService {
    private readonly restUrl: string;

    constructor(
        private http: HttpClient,
        private configService: AppConfigService
    ) {
        this.restUrl = configService.restUrl;
    }

    public planCorrectionFormAlert: IAlertWindowModel = {
        isShow: false,
        questionText: 'Вы пытаетесь отправить пустую корректировку. Желаете вернуться к заполнению формы или закрыть её?',
        acceptText: 'Закрыть',
        cancelText: 'Вернуться',
        acceptFunction: () => null,
        cancelFunction: () => null,
        closeFunction: () => (this.planCorrectionFormAlert.isShow = false)
    }

  public async submitPlanCorrection(data: IKpeAccTimelinesDataEditPlan): Promise<IKpeAccTimelinesDataEditPlan> {
        return this.http.post<IKpeAccTimelinesDataEditPlan>(`${this.restUrl}/api/kpe/ExecutionProduction/adjustment/save`, data).toPromise()
  }
}

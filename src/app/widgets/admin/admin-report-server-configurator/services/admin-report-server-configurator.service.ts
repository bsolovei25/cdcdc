import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'any',
})

export class AdminReportConfiguratorService {
    public headerSettingsPicker: BehaviorSubject<number> = new BehaviorSubject(null);
}
import { Injectable } from '@angular/core';
import { IChildrenFolder, IFolder, ITemplate, ITemplateFolder, IReportTemplate } from '@dashboard/models/ADMIN/report-server.model';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'any',
})
export class AdminReportConfiguratorService {
    public data: IFolder;
    public reports: IReportTemplate[];
    public headerSettingsPicker: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public folders$: BehaviorSubject<ITemplateFolder[] | IChildrenFolder[] | IFolder>
        = new BehaviorSubject<ITemplateFolder[] | IChildrenFolder[] | IFolder>(null);
    public reports$: BehaviorSubject<ITemplate[]> = new BehaviorSubject<ITemplate[]>(null);
    public reportParameters$: BehaviorSubject<IReportTemplate> = new BehaviorSubject<IReportTemplate>(null);
    public address$: BehaviorSubject<ITemplateFolder> = new BehaviorSubject<ITemplateFolder>(null);
    public currentTab: BehaviorSubject<number> = new BehaviorSubject(1);
    public search$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor() {
    }

    public openParameters(): void {
        this.headerSettingsPicker.next(1);
    }

    public openAccessLevel(): void {
        this.headerSettingsPicker.next(2);
    }
}


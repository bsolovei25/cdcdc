import { Injectable } from "@angular/core";
import { IChildrenFolder, IFolder, ITemplate, ITemplateFolder } from "@dashboard/models/ADMIN/report-server.model";
import { BehaviorSubject } from "rxjs";
import { IReportTemplate } from "../models/admin-report-server-configurator.model";
import { AdminReportServerConfiguratorRootService } from "./admin-report-server-configurator-root.service";
import { AdminReportServerConfiguratorModule } from "@widgets/admin/admin-report-server-configurator/admin-report-server-configurator.module";


@Injectable({
    providedIn: 'any',
})

export class AdminReportConfiguratorService {
    public headerSettingsPicker: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public folders$: BehaviorSubject<ITemplateFolder[] | IChildrenFolder[] | IFolder>
    = new BehaviorSubject<ITemplateFolder[] | IChildrenFolder[] | IFolder>(null);
    public reports$: BehaviorSubject<ITemplate[]> = new BehaviorSubject<ITemplate[]>(null);
    public reportParameters$: BehaviorSubject<IReportTemplate> = new BehaviorSubject<IReportTemplate>(null);
    public address$: BehaviorSubject<ITemplateFolder> = new BehaviorSubject<ITemplateFolder>(null);
    public currentTab: BehaviorSubject<number> = new BehaviorSubject(1);

    constructor(
    ) {
    }  
}


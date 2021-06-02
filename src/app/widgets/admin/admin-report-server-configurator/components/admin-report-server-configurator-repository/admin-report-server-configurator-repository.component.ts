import { Component, OnInit } from '@angular/core';
import { IReportTemplate, IFolder } from '@dashboard/models/ADMIN/report-server.model';
import { AdminReportServerConfiguratorRootService } from '../../services/admin-report-server-configurator-root.service';
import { AdminReportConfiguratorService } from '../../services/admin-report-server-configurator.service';


@Component({
    selector: 'evj-admin-report-server-configurator-repository',
    templateUrl: './admin-report-server-configurator-repository.component.html',
    styleUrls: ['./admin-report-server-configurator-repository.component.scss'],
})
export class AdminReportServerConfiguratorRepositoryComponent implements OnInit {
    public data: IFolder;
    public reports: IReportTemplate[];

    constructor(
        private arscRootService: AdminReportServerConfiguratorRootService,
        private arscService: AdminReportConfiguratorService,
        public helperService: AdminReportConfiguratorService,
    ) {
    }

    ngOnInit(): void {
        this.templateFolder();
        this.reportTemplate();
    }

    public async templateFolder(): Promise<void> {
        const data = await this.arscRootService.getTemplateFolders();
        this.data = data;
        this.arscService.data = data;
    }

    public async reportTemplate(): Promise<void> {
        const data = await this.arscRootService.getReportTemplate();
        this.reports = data.filter(value => !value.folderId);
        this.arscService.reports = data.filter(value => !value.folderId);
    }
}

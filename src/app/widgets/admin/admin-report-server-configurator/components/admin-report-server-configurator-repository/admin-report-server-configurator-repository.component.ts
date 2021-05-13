import { Component, OnInit } from '@angular/core';
import { IReportTemplate } from '@dashboard/models/ADMIN/report-server.model';
import { IFolder } from '../../models/admin-report-server-configurator.model';
import { AdminReportServerConfiguratorRootService } from '../../services/admin-report-server-configurator-root.service';
import { AdminReportConfiguratorService } from '../../services/admin-report-server-configurator.service';

@Component({
  selector: 'evj-admin-report-server-configurator-repository',
  templateUrl: './admin-report-server-configurator-repository.component.html',
  styleUrls: ['./admin-report-server-configurator-repository.component.scss']
})
export class AdminReportServerConfiguratorRepositoryComponent implements OnInit {

  constructor(
    private arscRootService: AdminReportServerConfiguratorRootService,
    private arscService: AdminReportConfiguratorService
    ) { }

  ngOnInit(): void {
    this.templateFolder();
    this.reportTemplate();
  }

  public async templateFolder(): Promise<void> {
    const data = await this.arscRootService.getTemplateFolder();
    this.arscService.data = data;
  }

  public async reportTemplate(): Promise<void> {
    const data = await this.arscRootService.getReportTemplate();
    this.arscService.reports = data.filter(value => !value.folderId);
  }
}

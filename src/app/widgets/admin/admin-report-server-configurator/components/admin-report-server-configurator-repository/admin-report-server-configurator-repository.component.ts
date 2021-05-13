import { Component, OnInit } from '@angular/core';
import { IReportTemplate } from '@dashboard/models/ADMIN/report-server.model';
import { IFolder } from '../../models/admin-report-server-configurator.model';
import { AdminReportServerConfiguratorRootService } from '../../services/admin-report-server-configurator-root.service';

@Component({
  selector: 'evj-admin-report-server-configurator-repository',
  templateUrl: './admin-report-server-configurator-repository.component.html',
  styleUrls: ['./admin-report-server-configurator-repository.component.scss']
})
export class AdminReportServerConfiguratorRepositoryComponent implements OnInit {
  
  public data: IFolder;
  public reports: IReportTemplate[];

  constructor(
    private arscRootService: AdminReportServerConfiguratorRootService,
    ) { }

  ngOnInit(): void {
    this.templateFolder();
    this.reportTemplate();
  }

  public async templateFolder(): Promise<void> {
    const data = await this.arscRootService.getTemplateFolder();
    this.data = data;
    console.log(data);
  }

  public async reportTemplate(): Promise<void> {
    const data = await this.arscRootService.getReportTemplate();
    this.reports = data.filter(value => !value.folderId);
    console.log(data);
  }
}

import { Component, OnInit } from '@angular/core';
import { IFolder } from '../../models/admin-report-server-configurator.model';
import { AdminReportServerConfiguratorRootService } from '../../services/admin-report-server-configurator-root.service';

@Component({
  selector: 'evj-admin-server-configurator-reference-menu',
  templateUrl: './admin-server-configurator-reference-menu.component.html',
  styleUrls: ['./admin-server-configurator-reference-menu.component.scss']
})
export class AdminServerConfiguratorReferenceMenuComponent implements OnInit {
  public data: IFolder;

  constructor(private arscService: AdminReportServerConfiguratorRootService) { }

  ngOnInit(): void {
    this.templateFolder();
  }

  public async templateFolder(): Promise<void> {
    const data = await this.arscService.getTemplateFolder();
    this.data = data;
    console.log(data);
  }
}

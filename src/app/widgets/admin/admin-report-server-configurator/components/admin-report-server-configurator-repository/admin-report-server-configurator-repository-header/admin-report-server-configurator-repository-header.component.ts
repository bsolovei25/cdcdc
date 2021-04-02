import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminReportServerConfiguratorRepositoryAddComponent } from '../admin-report-server-configurator-repository-add/admin-report-server-configurator-repository-add.component';

@Component({
  selector: 'evj-admin-report-server-configurator-repository-header',
  templateUrl: './admin-report-server-configurator-repository-header.component.html',
  styleUrls: ['./admin-report-server-configurator-repository-header.component.scss']
})
export class AdminReportServerConfiguratorRepositoryHeaderComponent implements OnInit {
  public addFile: boolean = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public addFolder(): void {
    const dialogref = this.dialog.open(AdminReportServerConfiguratorRepositoryAddComponent)
  }

}

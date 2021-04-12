import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminReportServerConfiguratorParametersSelectComponent } from '../admin-report-server-configurator-parameters-select/admin-report-server-configurator-parameters-select.component';

@Component({
  selector: 'evj-admin-report-server-configurator-parameters-header',
  templateUrl: './admin-report-server-configurator-parameters-header.component.html',
  styleUrls: ['./admin-report-server-configurator-parameters-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminReportServerConfiguratorParametersHeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }
  openSelect(): void {
    const dialogRef = this.dialog.open(AdminReportServerConfiguratorParametersSelectComponent, );

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}

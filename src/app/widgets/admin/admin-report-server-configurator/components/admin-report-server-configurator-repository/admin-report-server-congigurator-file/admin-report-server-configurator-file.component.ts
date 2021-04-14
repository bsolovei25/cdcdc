import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminReportNameConfiguratorComponent } from '../../admin-report-name-configurator/admin-report-name-configurator.component';

@Component({
  selector: 'evj-admin-report-server-configurator-file',
  templateUrl: './admin-report-server-configurator-file.component.html',
  styleUrls: ['./admin-report-server-configurator-file.component.scss']
})
export class AdminReportServerConfiguratorFileComponent implements OnInit {

  public readonly folderIcon = "assets/icons/widgets/admin/admin-report-server-configurator/folder.svg"
  public readonly windowsIcon = "assets/icons/widgets/admin/admin-report-server-configurator/windows.svg";
  public readonly editIcon = "assets/icons/widgets/admin/admin-report-server-configurator/edit.svg";
  public readonly trashIcon = "assets/icons/widgets/admin/admin-report-server-configurator/trash.svg";

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  public editFile(): void {
    const dialogRef = this.dialog.open(AdminReportNameConfiguratorComponent, {
      data: {
      },
  });
  }

}

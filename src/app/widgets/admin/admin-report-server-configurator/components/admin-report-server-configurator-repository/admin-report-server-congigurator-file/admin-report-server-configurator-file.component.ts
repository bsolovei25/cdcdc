import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}

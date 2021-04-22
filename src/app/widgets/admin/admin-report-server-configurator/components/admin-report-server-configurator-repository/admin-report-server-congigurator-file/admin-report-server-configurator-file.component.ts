import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IReportTemplate, ITemplate, ITemplateFolder } from '@widgets/admin/admin-report-server-configurator/models/admin-report-server-configurator.model';
import { AdminReportServerConfiguratorRootService } from '@widgets/admin/admin-report-server-configurator/services/admin-report-server-configurator-root.service';
import { AdminReportNameConfiguratorComponent } from '../../admin-report-name-configurator/admin-report-name-configurator.component';

@Component({
  selector: 'evj-admin-report-server-configurator-file',
  templateUrl: './admin-report-server-configurator-file.component.html',
  styleUrls: ['./admin-report-server-configurator-file.component.scss']
})
export class AdminReportServerConfiguratorFileComponent implements OnInit {

  public readonly folderIcon = "assets/icons/widgets/admin/admin-report-server-configurator/folder.svg";
  public readonly reportIcon = "assets/icons/widgets/admin/admin-report-server-configurator/report.svg";
  public readonly windowsIcon = "assets/icons/widgets/admin/admin-report-server-configurator/windows.svg";
  public readonly editIcon = "assets/icons/widgets/admin/admin-report-server-configurator/edit.svg";
  public readonly trashIcon = "assets/icons/widgets/admin/admin-report-server-configurator/trash.svg";

  @Input() item: ITemplateFolder = null;
  @Input() report: IReportTemplate = null;
  @Input() childrens: ITemplateFolder = null;
  @Input() templates: ITemplate = null;

  constructor(
    public dialog: MatDialog,
    private arscRootService: AdminReportServerConfiguratorRootService
  ) { }

  ngOnInit(): void {
  }

  async editFile(item: IReportTemplate): Promise<void> {    
    const res = await this.arscRootService.getReportFileNameOptions(item.id);
    const dialogRef = this.dialog.open(AdminReportNameConfiguratorComponent, {
      data: {
        item,
        res,
      },
    });
    const name = item.name;
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          await this.arscRootService.putReportTemplate(item);
        } catch {
          item.name = name;
        }
        await this.arscRootService.postReportFileNameOptions(item.id, result.result.res);
        item.name = result.result.item.name;
      } else {
        item.name = name;
      }
    });
  }

  public async deleteFolder(item: ITemplateFolder): Promise<void> {
    this.arscRootService.deleteFolder(item.id);
  }

}

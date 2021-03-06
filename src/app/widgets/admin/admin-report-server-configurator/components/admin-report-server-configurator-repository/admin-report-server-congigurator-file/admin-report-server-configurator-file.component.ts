import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
    IReportTemplate,
    ITemplate,
    ITemplateFolder
} from '@dashboard/models/ADMIN/report-server.model';
import { AdminReportServerConfiguratorRootService } from '@widgets/admin/admin-report-server-configurator/services/admin-report-server-configurator-root.service';
import { AdminReportConfiguratorService } from '@widgets/admin/admin-report-server-configurator/services/admin-report-server-configurator.service';
import { AdminReportNameConfiguratorComponent } from '../../admin-report-name-configurator/admin-report-name-configurator.component';

@Component({
    selector: 'evj-admin-report-server-configurator-file',
    templateUrl: './admin-report-server-configurator-file.component.html',
    styleUrls: ['./admin-report-server-configurator-file.component.scss']
})
export class AdminReportServerConfiguratorFileComponent implements OnInit {

    public readonly folderIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/folder.svg';
    public readonly reportIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/report.svg';
    public readonly windowsIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/windows.svg';
    public readonly editIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/edit.svg';
    public readonly trashIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/trash.svg';

    @Input() item: ITemplateFolder = null;
    @Input() report: IReportTemplate = null;
    @Input() childrens: ITemplateFolder = null;
    @Input() templates: ITemplate = null;

    constructor(
        public dialog: MatDialog,
        private arscRootService: AdminReportServerConfiguratorRootService,
        public arscService: AdminReportConfiguratorService
    ) {
    }

    ngOnInit(): void {
    }

    async editFile(item: IReportTemplate | ITemplate): Promise<void> {
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

    public async deleteFolder(item: ITemplateFolder): Promise<unknown> {
        return this.arscRootService.deleteFolder(item.id);
    }

    public openFolder(folder?: ITemplateFolder): void {
        this.arscService.data = null;
        this.arscService.reports = null;
        this.arscService.folders$.next(folder.childFolders);
        this.arscService.reports$.next(folder.templates);
        this.arscService.address$.next(folder)
    }

    public async openTemplate(template: IReportTemplate | ITemplate): Promise<void> {
        const data = await this.arscRootService.getReporting(template.id);
        this.arscService.reportParameters$.next(data);
        this.arscService.openParameters();
        this.arscService.headerSettingsPicker.next(1);
    }

    public async deleteTemplate(item: ITemplate): Promise<unknown> {
        return this.arscRootService.deleteReportTemplate(item.id);
    }

    public async deleteReport(item: IReportTemplate): Promise<unknown> {
        return this.arscRootService.deleteReportTemplate(item.id);
    }
}

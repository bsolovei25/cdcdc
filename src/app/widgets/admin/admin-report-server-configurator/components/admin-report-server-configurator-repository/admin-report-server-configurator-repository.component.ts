import { Component, OnInit } from '@angular/core';
import { IReportTemplate, IFolder } from '@dashboard/models/ADMIN/report-server.model';
import { AdminReportServerConfiguratorRootService } from '../../services/admin-report-server-configurator-root.service';
import { AdminReportConfiguratorService } from '../../services/admin-report-server-configurator.service';
import {
    IReportSvgFile,
    IReportFolder,
    IReportFoldersResponse
} from '@widgets/admin/admin-report-server-configurator/models/admin-report-server-configurator.model';


@Component({
    selector: 'evj-admin-report-server-configurator-repository',
    templateUrl: './admin-report-server-configurator-repository.component.html',
    styleUrls: ['./admin-report-server-configurator-repository.component.scss'],
})
export class AdminReportServerConfiguratorRepositoryComponent implements OnInit {

    public data: IFolder;
    public reports: IReportTemplate[];
    public folders: IReportFolder[];
    public files: IReportSvgFile[];

    constructor(
        private arscRootService: AdminReportServerConfiguratorRootService,
        private arscService: AdminReportConfiguratorService,
        public helperService: AdminReportConfiguratorService,
    ) {
    }

    ngOnInit(): void {
        this.reloadFolders();
    }

    public async reportTemplate(): Promise<void> {
        const data = await this.arscRootService.getReportTemplate();
        this.reports = data.filter(value => !value.folderId);
        this.arscService.reports = data.filter(value => !value.folderId);
    }

    public onClickOpenFolder(folder: IReportFolder): void {
        this.arscRootService.selectedFolderId = folder.id;
        this.loadFolder(folder.id);
    }

    public onClickStorage(): void {
        this.arscRootService.selectedFolderId = null;
        this.reloadFolders();
    }

    public reloadFolders(): void {
        if (this.arscRootService.selectedFolderId) {
            this.loadFolder(this.arscRootService.selectedFolderId)
        } else {
            this.loadFolders();
        }
    }

    private loadFolders(): void {
        this.arscRootService
            .getFolders()
            .subscribe((resp: IReportFoldersResponse) => {
                this.folders = resp?.folders;
                this.files = null;
            });
    }

    private loadFolder(folderId: number): void {
        this.arscRootService
            .getFolder(folderId)
            .subscribe((resp: IReportFolder) => {
                this.folders = resp?.folders;
                this.files = resp?.files;
            });
    }
}

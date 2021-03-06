import { Component, Input, OnInit } from '@angular/core';
import { IChildrenFolder } from '@dashboard/models/ADMIN/report-server.model';
import {
    IFolder,
    IReportTemplate,
    ITemplateFolder,
    ITemplate
} from '@dashboard/models/ADMIN/report-server.model';
import { AdminReportServerConfiguratorRootService } from '../../services/admin-report-server-configurator-root.service';
import { AdminReportConfiguratorService } from '../../services/admin-report-server-configurator.service';

@Component({
    selector: 'evj-admin-server-configurator-reference-menu',
    templateUrl: './admin-server-configurator-reference-menu.component.html',
    styleUrls: ['./admin-server-configurator-reference-menu.component.scss']
})
export class AdminServerConfiguratorReferenceMenuComponent implements OnInit {

    @Input() public data: IFolder;
    @Input() public reports: IReportTemplate[];
    @Input() public childrens: ITemplateFolder[] | IChildrenFolder[] | IFolder;
    @Input() public templates: ITemplate[];

    public search: string = '';

    constructor(
        private arscService: AdminReportConfiguratorService,
        private arscRootService: AdminReportServerConfiguratorRootService
    ) {
    }

    ngOnInit(): void {
        this.arscService.folders$.subscribe(value => {
            this.childrens = value;
        });
        this.arscService.reports$.subscribe(value => {
            this.templates = value;
        });
        this.arscService.search$.subscribe(value => {
            this.search = value;
        });
    }

    public openFolder(folder?: ITemplateFolder): void {
        this.data = null;
        this.reports = null;
        console.log(folder);
        this.arscService.folders$.next(folder.childFolders);
        this.arscService.reports$.next(folder.templates);
        this.arscService.address$.next(folder);
    }

    public async openTemplate(template: IReportTemplate): Promise<void> {
        const data = await this.arscRootService.getReporting(template.id);
        this.arscService.reportParameters$.next(data);
    }

    // public drop(event: CdkDragDrop<ITemplateFolder[]>): void {
    //     transferArrayItem(
    //         this.arscService.data?.folders,
    //         this.arscService.data?.folders[event.currentIndex].childFolders,
    //         event.previousIndex,
    //         event.currentIndex
    //     );
    // }
}

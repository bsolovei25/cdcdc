import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminReportServerConfiguratorRootService } from '@widgets/admin/admin-report-server-configurator/services/admin-report-server-configurator-root.service';
import { AdminReportConfiguratorService } from '@widgets/admin/admin-report-server-configurator/services/admin-report-server-configurator.service';
import { ITemplateFolder } from '@dashboard/models/ADMIN/report-server.model';
import { IReportFoldersResponse } from '@widgets/admin/admin-report-server-configurator/models/admin-report-server-configurator.model';

@Component({
    selector: 'evj-admin-report-server-configurator-repository-address',
    templateUrl: './admin-report-server-configurator-repository-address.component.html',
    styleUrls: ['./admin-report-server-configurator-repository-address.component.scss'],
})
export class AdminReportServerConfiguratorRepositoryAddressComponent implements OnInit {

    @Output() onClickStorage: EventEmitter<void> = new EventEmitter<void>();

    public readonly arrowsIcon: string = 'assets/icons/widgets/admin/admin-report-server-configurator/path-arrows.svg';
    public path: ITemplateFolder[] = [];

    constructor(
        public arscService: AdminReportConfiguratorService,
        public arscRootService: AdminReportServerConfiguratorRootService
    ) {
    }

    ngOnInit(): void {
        this.arscService.address$.subscribe((value) => {
            if (value) {
                this.path.push(value);
            }
        });
        console.log(this.path);
    }

    public openFolder(item: ITemplateFolder): void {
        this.arscService.folders$.next(item.childFolders);
        this.arscService.reports$.next(item.templates);
        const idx = this.path.findIndex((v) => v?.id === item?.id);
        this.path.splice(idx + 1, this.path.length);
    }

    // public loadAllFolders(): void {
    //     this.arscRootService
    //         .getFolders()
    //         .subscribe((resp: IReportFoldersResponse) => {
    //             console.log('folders', resp);
    //
    //             // this.arscService.folders$.next(data.folders);
    //             // this.arscService.reports$.next(data.templates);
    //             // this.arscService.headerSettingsPicker.next(null);
    //         });
    // }
}

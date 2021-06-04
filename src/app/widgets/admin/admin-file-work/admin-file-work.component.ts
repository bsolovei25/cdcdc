import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import {
    IReportFolder,
    IReportSvgFile
} from '@widgets/admin/admin-report-server-configurator/models/admin-report-server-configurator.model';

@Component({
    selector: 'evj-admin-file-work',
    templateUrl: './admin-file-work.component.html',
    styleUrls: ['./admin-file-work.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFileWorkComponent {

    @Input() folders: IReportFolder[];
    @Input() files: IReportSvgFile[];

    @Output() onClickFolder: EventEmitter<IReportFolder> = new EventEmitter<IReportFolder>();
    @Output() folderOrFileChanges: EventEmitter<void> = new EventEmitter<void>();

    constructor() {
    }

    public onClickOpenFolder(folder: IReportFolder): void {
        this.onClickFolder.emit(folder);
    }

    public onFolderOrFileChanges(): void {
        this.folderOrFileChanges.emit();
    }

}

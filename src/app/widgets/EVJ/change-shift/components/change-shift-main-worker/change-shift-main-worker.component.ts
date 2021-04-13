import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IChangeShiftMember, IChangeShiftModel } from '../../change-shift.interfaces';
import { ChangeShiftHelperService } from '../../services/change-shift-helper.service';
import { AvatarConfiguratorService } from '@core/service/avatar-configurator.service';

@Component({
    selector: 'evj-change-shift-main-worker',
    templateUrl: './change-shift-main-worker.component.html',
    styleUrls: ['./change-shift-main-worker.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeShiftMainWorkerComponent implements OnInit {
    @Input() set worker(value: IChangeShiftMember) {
        this._worker = value;
        if (!value) {
            return;
        }
        this.avatarPath = value.user?.photoId
            ? this.avatarConfiguratorService.getAvatarPath(value.user.photoId)
            : this.changeShiftHelperService.defaultAvatarPath;
        this.isBaseRole = this.changeShiftHelperService.isBaseRole(value?.unitRole?.type);
    }

    @Input() set shift(value: IChangeShiftModel) {
        this.statusIcon = this.changeShiftHelperService.getIconType(value?.status);
        this.statusTooltip = this.changeShiftHelperService.getDisplayShiftStatus(value?.status);
    }

    // tslint:disable-next-line:variable-name
    public _worker: IChangeShiftMember;
    public avatarPath: string = this.changeShiftHelperService.defaultAvatarPath;
    public statusTooltip: string;
    public statusIcon: string;
    public displayPosition: string;
    public isBaseRole: boolean = false;

    constructor(
        private changeShiftHelperService: ChangeShiftHelperService,
        private avatarConfiguratorService: AvatarConfiguratorService
    ) {}

    ngOnInit(): void {}
}

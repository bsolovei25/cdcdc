import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChangeShiftMemberAction, IChangeShiftMember } from '../../change-shift.interfaces';
import { ChangeShiftHelperService } from '../../services/change-shift-helper.service';
import { AvatarConfiguratorService } from '@core/service/avatar-configurator.service';
import { ChangeShiftKeeperService } from '../../services/change-shift-keeper.service';
import { PopoverOverlayService } from '@shared/components/popover-overlay/popover-overlay.service';
import { ChangeShiftMemberContextComponent } from '../change-shift-member-context/change-shift-member-context.component';
import { ConnectionPositionPair } from '@angular/cdk/overlay';

@Component({
    selector: 'evj-change-shift-member',
    templateUrl: './change-shift-member.component.html',
    styleUrls: ['./change-shift-member.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeShiftMemberComponent implements OnInit {
    @ViewChild('member') memberComponent: ElementRef;
    // TODO: add handler disabled & disabledApply
    @Input() public disabled: boolean = true;
    @Input() public disabledApply: boolean = true;
    @Input() private set member(value: IChangeShiftMember) {
        this._member = value;
        this.isStar = this.changeShiftHelperService.isBaseRole(value?.unitRole?.type);
        this.isPreview = !value.user;
        this.displayStatus = this.changeShiftHelperService.getDisplayMemberStatus(value?.user?.status);
        this.avatarPath = value?.user?.photoId
            ? this.avatarConfiguratorService.getAvatarPath(value?.user?.photoId)
            : this.changeShiftHelperService.defaultAvatarPath;
    }
    // tslint:disable-next-line:variable-name
    public _member: IChangeShiftMember = null;
    public isPreview: boolean = true;
    public isStar: boolean = false;
    public displayStatus: string = null;
    public avatarPath: string = this.changeShiftHelperService.defaultAvatarPath;

    constructor(
        private changeShiftHelperService: ChangeShiftHelperService,
        private changeShiftKeeperService: ChangeShiftKeeperService,
        private avatarConfiguratorService: AvatarConfiguratorService,
        private popoverOverlayService: PopoverOverlayService
    ) {}

    ngOnInit(): void {}

    public cardVerify(): void {
        if (this.disabled) {
            return;
        }
        if (!this._member?.user) {
            if (this.disabledApply) {
                return;
            }
            this.changeShiftKeeperService.memberAction(this._member, 'add').then();
            return;
        }
        const shiftStatus = this.changeShiftKeeperService.shift$?.getValue()?.status;
        const actions = this.changeShiftHelperService.getAvailableActions(this._member, shiftStatus);
        if (!actions?.length) {
            return;
        }
        const origin = this.memberComponent.nativeElement;
        const positions: ConnectionPositionPair[] = [
            {
                originX: 'center',
                originY: 'bottom',
                overlayX: 'center',
                overlayY: 'top',
            },
        ];
        const popoverRef = this.popoverOverlayService.open({
            content: ChangeShiftMemberContextComponent,
            origin,
            data: {
                actions,
                width: origin.clientWidth,
            },
            positions,
            width: origin.clientWidth,
        });
        popoverRef.afterClosed$.subscribe((res) => {
            const action = res.data as ChangeShiftMemberAction;
            this.changeShiftKeeperService.memberAction(this._member, action).then();
        });
        popoverRef.overlay.backdropClick().subscribe((x) => {
            popoverRef.overlay.dispose();
        });
    }
}

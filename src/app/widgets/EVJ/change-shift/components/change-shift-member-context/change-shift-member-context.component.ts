import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PopoverRef } from '@shared/components/popover-overlay/popover-overlay.ref';
import { ChangeShiftMemberAction } from '../../change-shift.interfaces';
import { ChangeShiftHelperService } from '../../services/change-shift-helper.service';

@Component({
    selector: 'evj-change-shift-member-context',
    templateUrl: './change-shift-member-context.component.html',
    styleUrls: ['./change-shift-member-context.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeShiftMemberContextComponent implements OnInit {
    public originWidth: number = 200;
    public actions: { title: string; value: ChangeShiftMemberAction }[] = [];

    constructor(private popoverRef: PopoverRef, private changeShiftHelperService: ChangeShiftHelperService) {}

    ngOnInit(): void {
        this.originWidth = this.popoverRef.data.width;
        this.actions = this.actionsMapper(this.popoverRef.data.actions);
    }

    public chooseAction(action: ChangeShiftMemberAction): void {
        this.popoverRef.close('close', action);
    }

    private actionsMapper(actions: ChangeShiftMemberAction[]): { title: string; value: ChangeShiftMemberAction }[] {
        return actions.map((x) => ({
            title: this.changeShiftHelperService.getDisplayAction(x),
            value: x,
        }));
    }
}

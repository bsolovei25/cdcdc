import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ChangeShiftHelperService } from '../../services/change-shift-helper.service';
import { ChangeShiftKeeperService } from '../../services/change-shift-keeper.service';

@Component({
    selector: 'evj-change-shift-dates',
    templateUrl: './change-shift-dates.component.html',
    styleUrls: ['./change-shift-dates.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeShiftDatesComponent implements OnInit {
    @Input() set dates(value: Date[]) {
        if (!value?.[0] || !value?.[1]) return;
        value = value.map((x) => new Date(x));
        this.displayDates = this.changeShiftHelperService.formatDateString(value[0], value[1]);
    }
    public displayDates: string;

    constructor(
        private changeShiftHelperService: ChangeShiftHelperService,
        private changeShiftKeeperService: ChangeShiftKeeperService
    ) {}

    ngOnInit(): void {}

    public openDialog(): void {
        this.changeShiftKeeperService.openRolesControl();
    }
}

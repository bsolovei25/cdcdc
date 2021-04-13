import { Component, OnInit } from '@angular/core';
import { ChangeShiftRolesService } from '../../services/change-shift-roles.service';

@Component({
    selector: 'evj-change-shift-roles-header-right',
    templateUrl: './change-shift-roles-header-right.component.html',
    styleUrls: ['./change-shift-roles-header-right.component.scss'],
})
export class ChangeShiftRolesHeaderRightComponent implements OnInit {
    constructor(private changeShiftRolesService: ChangeShiftRolesService) {}

    ngOnInit(): void {}

    public addRole(): void {
        this.changeShiftRolesService.addRole();
    }

    public close(): void {
        this.changeShiftRolesService.closeDialog(false);
    }
}

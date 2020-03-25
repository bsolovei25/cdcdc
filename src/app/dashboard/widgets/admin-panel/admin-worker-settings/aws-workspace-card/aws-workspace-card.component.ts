import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IWorkspace, EnumClaims } from '../../../../models/admin-panel';
import { SelectionModel } from '@angular/cdk/collections';
import { AdminPanelService } from '../../../../services/admin-panel/admin-panel.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
    selector: 'evj-aws-workspace-card',
    templateUrl: './aws-workspace-card.component.html',
    styleUrls: ['./aws-workspace-card.component.scss'],
})
export class AwsWorkspaceCardComponent implements OnInit {
    @Input() public workspace: IWorkspace = {
        id: null,
        screenName: '',
    };
    @Input() public author: string = '';
    @Input() public isActive: boolean = false;
    @Input() public isChangingCardState: boolean = false;
    @Output() public selectedWorkspace: EventEmitter<IWorkspace> = new EventEmitter<IWorkspace>();

    public claims = EnumClaims;
    public selectedValue: string = EnumClaims[0];
    public select: SelectionModel<IWorkspace> = new SelectionModel<IWorkspace>(true);

    constructor(private adminService: AdminPanelService) {}

    public ngOnInit(): void {
        if (this.isActive) {
            this.select.select(this.workspace);
        }
    }

    public changeCardState(): void {
        if (this.isChangingCardState) {
            this.select.toggle(this.workspace);
            this.selectedWorkspace.emit(this.workspace);
        }
    }

    public getValuesSelect(): string[] {
        const claimsArray: string[] = [];
        for (let i = 1; EnumClaims[i]; i++) {
            claimsArray.push(EnumClaims[i]);
        }
        return claimsArray;
    }

    public onChangeSelect(event: MatSelectChange): void {
        console.log(event);
        console.log(this.selectedValue);
    }
}

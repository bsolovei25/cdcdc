import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { IWorkspace, EnumClaims, IScreen, IClaim } from '../../../../models/admin-panel';
import { SelectionModel } from '@angular/cdk/collections';
import { AdminPanelService } from '../../../../services/admin-panel/admin-panel.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'evj-aws-workspace-card',
    templateUrl: './aws-workspace-card.component.html',
    styleUrls: ['./aws-workspace-card.component.scss'],
})
export class AwsWorkspaceCardComponent implements OnInit, AfterViewInit {
    @Input() public workspace: IWorkspace = {
        id: null,
        screenName: '',
    };
    @Input() public screenId: number = null;
    @Input() public author: string = '';
    @Input() public isActive: boolean = false;
    @Input() public isChangingCardState: boolean = false;
    @Output() public selectedWorkspace: EventEmitter<IWorkspace> = new EventEmitter<IWorkspace>();
    @Output() public selectedWorkspaceClaims: EventEmitter<{
        workspaceId: number;
        claims: IClaim[];
    }> = new EventEmitter<{ workspaceId: number; claims: IClaim[] }>();

    public select: SelectionModel<IWorkspace> = new SelectionModel<IWorkspace>(true);

    public selectFormControl: FormControl = new FormControl();

    constructor(private adminService: AdminPanelService) {}

    public ngOnInit(): void {
        if (this.isActive) {
            this.select.select(this.workspace);
        }
    }

    public ngAfterViewInit(): void {
        if (this.screenId) {
            this.adminService.getWorkerScreenClaims(this.screenId).subscribe((item) => {
                const claimsArray: string[] = [];
                item.forEach((claims) => {
                    claimsArray.push(EnumClaims[claims.userScreenClaim.id]);
                });
                this.selectFormControl.setValue(claimsArray);
            });
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

    public onChangeSelect(): void {
        const claims: IClaim[] = [];
        this.selectFormControl.value.forEach((claim: string) =>
            claims.push({ id: EnumClaims[claim] })
        );
        this.selectedWorkspaceClaims.emit({ workspaceId: this.workspace.id, claims });
    }
}

import {
    Component,
    OnInit,
    Input,
    AfterViewInit,
    ChangeDetectorRef,
    Output,
    EventEmitter,
} from '@angular/core';
import {
    IWorkspace,
    IGlobalClaim,
    ScreenClaimsEnum,
} from '../../../../../../dashboard/models/admin-panel';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { AdminPanelService } from '../../../../../../dashboard/services/admin-panel/admin-panel.service';
import { fillDataShape } from '@shared/functions/common-functions';

@Component({
    selector: 'evj-aws-workspace-card',
    templateUrl: './aws-workspace-card.component.html',
    styleUrls: ['./aws-workspace-card.component.scss'],
})
export class AwsWorkspaceCardComponent implements OnInit, AfterViewInit {
    @Input() public workspace: IWorkspace = {
        id: null,
        screenName: '',
        claims: [],
    };
    @Input() public isActive: boolean = false;
    @Input() public isChangingCardState: boolean = false;
    @Input() private workerScreens: IWorkspace[] = [];
    @Input() private workerSpecialClaims: IGlobalClaim[] = [];

    @Output() private changingSelect: EventEmitter<void> = new EventEmitter<void>();

    private allScreenClaims: IGlobalClaim[] = [];

    private currentWorkspace: IWorkspace = null;

    public select: SelectionModel<IWorkspace> = new SelectionModel<IWorkspace>();

    public selectFormControl: FormControl = new FormControl();

    constructor(private adminService: AdminPanelService, private cdRef: ChangeDetectorRef) {}

    public ngOnInit(): void {
        if (this.isActive) {
            this.select.select(this.workspace);
        }
        this.allScreenClaims = this.adminService.screenSpecialClaims;

        this.allScreenClaims.sort(
            (a, b) => ScreenClaimsEnum[a.claimType] - ScreenClaimsEnum[b.claimType]
        );
    }

    public ngAfterViewInit(): void {
        if (this.isActive) {
            this.currentWorkspace = this.workerScreens.find(
                (item) => item.id === this.workspace.id
            );
            if (this.currentWorkspace) {
                const claimsArray: string[] = [];
                this.currentWorkspace.claims.sort(
                    (a, b) => ScreenClaimsEnum[a.claimType] - ScreenClaimsEnum[b.claimType]
                );
                this.currentWorkspace.claims.forEach((claim) => claimsArray.push(claim.claimName));
                this.selectFormControl.setValue(claimsArray);
                this.cdRef.detectChanges();
            }
        }
    }

    public changeCardState(): void {
        if (this.isChangingCardState) {
            if (this.select.isEmpty()) {
                const workspace = fillDataShape(this.workspace);
                workspace.claims = [];
                this.workerScreens.push(workspace);
                this.currentWorkspace = workspace;
            } else {
                this.deleteAllWorkspaceClaims();
                const index = this.workerScreens.findIndex((item) => item.id === this.workspace.id);
                if (index !== -1) {
                    this.workerScreens.splice(index, 1);
                }
            }

            this.select.toggle(this.workspace);
            this.changingSelect.emit();
        }
    }

    public getValuesSelect(): string[] {
        const claimsArray: string[] = [];
        this.allScreenClaims.forEach((claim) => {
            claimsArray.push(claim.claimName);
        });

        return claimsArray;
    }

    private deleteAllWorkspaceClaims(): void {
        while (true) {
            const index = this.workerSpecialClaims.findIndex(
                (claim) => claim.value === this.workspace.id.toString()
            );
            if (index !== -1) {
                this.workerSpecialClaims.splice(index, 1);
            } else {
                break;
            }
        }
    }

    private changeClaimsInWorkspace(claims: IGlobalClaim[]): void {
        const length = this.currentWorkspace.claims.length;
        this.currentWorkspace.claims.splice(0, length);
        claims.forEach((claim) => this.currentWorkspace.claims.push(claim));
    }

    private changeWorkerClaims(claims: IGlobalClaim[]): void {
        const addedClaims: IGlobalClaim[] = [];
        const deletedClaims: IGlobalClaim[] = [];
        this.allScreenClaims.forEach((claim) => {
            if (claims.findIndex((item) => item.claimType === claim.claimType) !== -1) {
                const addClaim: IGlobalClaim = fillDataShape(claim);
                addClaim.value = this.workspace.id.toString();
                addedClaims.push(addClaim);
            } else {
                const removeClaim: IGlobalClaim = fillDataShape(claim);
                removeClaim.value = this.workspace.id.toString();
                deletedClaims.push(removeClaim);
            }
        });

        addedClaims.forEach((claim) => {
            const index = this.workerSpecialClaims.findIndex(
                (item) => item.claimType === claim.claimType && item.value === claim.value
            );
            if (index === -1) {
                this.workerSpecialClaims.push(claim);
            }
        });

        deletedClaims.forEach((claim) => {
            const index = this.workerSpecialClaims.findIndex(
                (item) => item.claimType === claim.claimType && item.value === claim.value
            );
            if (index !== -1) {
                this.workerSpecialClaims.splice(index, 1);
            }
        });
    }

    public onChangeSelect(): void {
        const claimsNames: string[] = this.selectFormControl.value;
        if (claimsNames.length) {
            const claims: IGlobalClaim[] = [];
            claimsNames.forEach((name) => {
                const foundClaim = this.allScreenClaims.find((claim) => claim.claimName === name);
                if (foundClaim) {
                    foundClaim.value = this.workspace.id.toString();
                    claims.push(foundClaim);
                }
            });
            this.changeClaimsInWorkspace(claims);
            this.changeWorkerClaims(claims);
        }

        this.changingSelect.emit();
    }
}

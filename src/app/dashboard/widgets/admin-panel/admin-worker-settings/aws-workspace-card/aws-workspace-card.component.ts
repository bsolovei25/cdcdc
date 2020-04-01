import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    AfterViewInit,
    ChangeDetectorRef,
} from '@angular/core';
import {
    IWorkspace,
    EnumClaims,
    IScreen,
    IClaim,
    IGlobalClaim,
    ScreenClaimsEnum,
} from '../../../../models/admin-panel';
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
        claims: [],
    };
    @Input() public isActive: boolean = false;
    @Input() public isChangingCardState: boolean = false;
    @Input() private workerScreens: IWorkspace[] = [];
    @Input() private workerSpecialClaims: IGlobalClaim[] = [];

    public select: SelectionModel<IWorkspace> = new SelectionModel<IWorkspace>(true);

    public selectFormControl: FormControl = new FormControl();

    private allScreenClaims: IGlobalClaim[] = [];

    private currentWorkspace: IWorkspace = null;

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
            this.select.toggle(this.workspace);
        }
    }

    public getValuesSelect(): string[] {
        const claimsArray: string[] = [];
        this.allScreenClaims.forEach((claim) => {
            claimsArray.push(claim.claimName);
        });

        return claimsArray;
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
                addedClaims.push(claim);
            } else {
                deletedClaims.push(claim);
            }
        });

        addedClaims.forEach((claim) => {
            const index = this.workerSpecialClaims.findIndex(
                (item) => item.claimType === claim.claimType
            );
            if (index === -1) {
                this.workerSpecialClaims.push(claim);
            }
        });

        deletedClaims.forEach((claim) => {
            const index = this.workerSpecialClaims.findIndex(
                (item) => item.claimType === claim.claimType
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
    }
}

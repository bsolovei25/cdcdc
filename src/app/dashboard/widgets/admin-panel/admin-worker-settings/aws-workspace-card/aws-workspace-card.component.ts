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
            const currentWorkspace = this.workerScreens.find(
                (item) => item.id === this.workspace.id
            );
            if (currentWorkspace) {
                const claimsArray: string[] = [];
                currentWorkspace.claims.sort(
                    (a, b) => ScreenClaimsEnum[a.claimType] - ScreenClaimsEnum[b.claimType]
                );
                currentWorkspace.claims.forEach((claim) => claimsArray.push(claim.claimName));
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

    public onChangeSelect(): void {
        const claims: IClaim[] = [];
        this.selectFormControl.value.forEach((claim: string) =>
            claims.push(
                this.adminService.screenClaims.find((item: IClaim) => item.id === EnumClaims[claim])
            )
        );
    }
}

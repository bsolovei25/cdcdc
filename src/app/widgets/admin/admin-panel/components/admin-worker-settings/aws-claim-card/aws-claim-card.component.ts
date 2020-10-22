import { Component, OnInit, Input } from '@angular/core';
import { AdminPanelService } from '../../../../../../dashboard/services/widgets/admin-panel/admin-panel.service';

@Component({
    selector: 'evj-aws-claim-card',
    templateUrl: './aws-claim-card.component.html',
    styleUrls: ['./aws-claim-card.component.scss'],
})
export class AwsClaimCardComponent implements OnInit {
    @Input() public name: string = '';
    @Input() public isActive: boolean = false;
    @Input() public isChangingCardState: boolean = false;
    @Input() public isSpecialClaim: boolean = false;

    constructor(private adminPanel: AdminPanelService) {}

    public ngOnInit(): void {}

    public changeCardState(): void {
        if (this.isChangingCardState) {
            this.isActive = !this.isActive;
        }
    }
}

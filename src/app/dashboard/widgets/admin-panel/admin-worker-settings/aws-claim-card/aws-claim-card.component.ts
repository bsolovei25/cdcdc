import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'evj-aws-claim-card',
    templateUrl: './aws-claim-card.component.html',
    styleUrls: ['./aws-claim-card.component.scss'],
})
export class AwsClaimCardComponent implements OnInit {
    @Input() public name: string = '';
    @Input() public isActive: boolean = false;

    constructor() {}

    public ngOnInit(): void {}

    public changeCardState(): void {
        this.isActive = !this.isActive;
    }
}

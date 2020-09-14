import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsClaimCardComponent } from './aws-claim-card.component';

describe('AwsClaimCardComponent', () => {
    let component: AwsClaimCardComponent;
    let fixture: ComponentFixture<AwsClaimCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AwsClaimCardComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AwsClaimCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

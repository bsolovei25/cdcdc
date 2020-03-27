import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsCreateClaimComponent } from './aws-create-claim.component';

describe('AwsCreateClaimComponent', () => {
    let component: AwsCreateClaimComponent;
    let fixture: ComponentFixture<AwsCreateClaimComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AwsCreateClaimComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AwsCreateClaimComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

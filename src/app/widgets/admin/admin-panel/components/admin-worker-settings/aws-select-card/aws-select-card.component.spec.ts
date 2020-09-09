import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsSelectCardComponent } from './aws-select-card.component';

describe('AwsSelectCardComponent', () => {
    let component: AwsSelectCardComponent;
    let fixture: ComponentFixture<AwsSelectCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AwsSelectCardComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AwsSelectCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

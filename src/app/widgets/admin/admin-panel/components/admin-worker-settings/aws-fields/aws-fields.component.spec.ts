import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsFieldsComponent } from './aws-fields.component';

describe('AwsFieldsComponent', () => {
    let component: AwsFieldsComponent;
    let fixture: ComponentFixture<AwsFieldsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AwsFieldsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AwsFieldsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

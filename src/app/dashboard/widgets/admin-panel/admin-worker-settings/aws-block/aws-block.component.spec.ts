import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsBlockComponent } from './aws-block.component';

describe('AwsBlockComponent', () => {
    let component: AwsBlockComponent;
    let fixture: ComponentFixture<AwsBlockComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AwsBlockComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AwsBlockComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

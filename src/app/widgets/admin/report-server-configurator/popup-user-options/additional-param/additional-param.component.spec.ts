import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalParamComponent } from './additional-param.component';

describe('AdditionalParamComponent', () => {
    let component: AdditionalParamComponent;
    let fixture: ComponentFixture<AdditionalParamComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AdditionalParamComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdditionalParamComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

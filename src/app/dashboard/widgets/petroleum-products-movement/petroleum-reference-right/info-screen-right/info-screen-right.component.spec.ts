import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoScreenRightComponent } from './info-screen-right.component';

describe('InfoScreenRightComponent', () => {
    let component: InfoScreenRightComponent;
    let fixture: ComponentFixture<InfoScreenRightComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InfoScreenRightComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InfoScreenRightComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

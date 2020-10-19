import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoScreenLeftComponent } from './info-screen-left.component';

describe('InfoScreenLeftComponent', () => {
    let component: InfoScreenLeftComponent;
    let fixture: ComponentFixture<InfoScreenLeftComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InfoScreenLeftComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InfoScreenLeftComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartScrollComponent } from './smart-scroll.component';

describe('SmartScrollComponent', () => {
    let component: SmartScrollComponent;
    let fixture: ComponentFixture<SmartScrollComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SmartScrollComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SmartScrollComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

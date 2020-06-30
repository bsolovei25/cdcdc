import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApsNotchedContainerComponent } from './aps-notched-container.component';

describe('ApsNotchedContainerComponent', () => {
    let component: ApsNotchedContainerComponent;
    let fixture: ComponentFixture<ApsNotchedContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ApsNotchedContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ApsNotchedContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

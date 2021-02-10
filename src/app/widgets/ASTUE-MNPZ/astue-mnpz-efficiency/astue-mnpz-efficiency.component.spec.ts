import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstueMnpzEfficiencyComponent } from './astue-mnpz-efficiency.component';

describe('AstueMnpzEfficiencyComponent', () => {
    let component: AstueMnpzEfficiencyComponent;
    let fixture: ComponentFixture<AstueMnpzEfficiencyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AstueMnpzEfficiencyComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AstueMnpzEfficiencyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

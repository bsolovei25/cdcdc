import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementationPieComponent } from './implementation-pie.component';

describe('ImplementationPieComponent', () => {
    let component: ImplementationPieComponent;
    let fixture: ComponentFixture<ImplementationPieComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ImplementationPieComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ImplementationPieComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

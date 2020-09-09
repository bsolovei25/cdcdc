import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGroupWorkerCardComponent } from './ag-group-worker-card.component';

describe('AgGroupWorkerCardComponent', () => {
    let component: AgGroupWorkerCardComponent;
    let fixture: ComponentFixture<AgGroupWorkerCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AgGroupWorkerCardComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AgGroupWorkerCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

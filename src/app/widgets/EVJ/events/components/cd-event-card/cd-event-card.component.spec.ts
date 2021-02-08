import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdEventCardComponent } from './cd-event-card.component';

describe('CdEventCardComponent', () => {
    let component: CdEventCardComponent;
    let fixture: ComponentFixture<CdEventCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CdEventCardComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CdEventCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

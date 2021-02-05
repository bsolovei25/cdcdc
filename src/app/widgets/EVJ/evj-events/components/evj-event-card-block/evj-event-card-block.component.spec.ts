import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvjEventCardBlockComponent } from './evj-event-card-block.component';

describe('EvjEventCardBlockComponent', () => {
    let component: EvjEventCardBlockComponent;
    let fixture: ComponentFixture<EvjEventCardBlockComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EvjEventCardBlockComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EvjEventCardBlockComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

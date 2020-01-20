import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatcherScreenComponent } from './dispatcher-screen.component';

describe('DispatcherScreenComponent', () => {
    let component: DispatcherScreenComponent;
    let fixture: ComponentFixture<DispatcherScreenComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DispatcherScreenComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DispatcherScreenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

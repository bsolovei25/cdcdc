import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapEcologyComponent } from './map-ecology.component';

describe('MapEcologyComponent', () => {
    let component: MapEcologyComponent;
    let fixture: ComponentFixture<MapEcologyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapEcologyComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapEcologyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

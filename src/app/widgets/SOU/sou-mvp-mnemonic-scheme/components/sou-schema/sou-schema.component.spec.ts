import { SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedModule } from '@shared/shared.module';
import { SouSchemaComponent } from './sou-schema.component';

let component: SouSchemaComponent;
let fixture: ComponentFixture<SouSchemaComponent>;

describe('SouSchemaComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                SouSchemaComponent,
            ],
            imports: [
                HttpClientTestingModule,
                AngularSvgIconModule,
                SharedModule,
            ]
        });
        fixture = TestBed.createComponent(SouSchemaComponent);
        component = fixture.componentInstance;
        component.sectionsData = [];
        component.unitName = 'kpa-c100';
        component.svgName = 'kpa-c100';
        fixture.detectChanges();
    });

    it('Should update svg when @input svgName changes', () => {
        const expectedFileName = 'test_svg_name'
        component.svgName = expectedFileName;
        expect(component.svgFileName).toEqual(`${expectedFileName}.svg`);
    });

    it('Should reset component when @input unitName changes', () => {
        const spy = spyOn(component, 'resetComponent');
        const previousValue = undefined;
        const nextValue= 'test_unit_name';
        const changes: SimpleChanges = {
            unitName: new SimpleChange(previousValue, nextValue, true),
        };

        component.ngOnChanges(changes);

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('Should call svg parsing when @input svgName changes', () => {
        const spy = spyOn(component, 'processSvgWhenItIsReady');
        const previousValue = undefined;
        const nextValue= 'gfu-2';
        component.svgName = 'gfu-2';
        const changes: SimpleChanges = {
            svgName: new SimpleChange(previousValue, nextValue, true),
        };

        component.ngOnChanges(changes);

        expect(spy).toHaveBeenCalledTimes(1);
    });
});

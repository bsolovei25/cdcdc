import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';import { OilControlComponent } from './oil-control.component';
import { OilControlTowerComponent } from './components/oil-control-tower/oil-control-tower.component';
import { OilControlTableComponent } from './components/oil-control-table/oil-control-table.component';
import { PaginatorComponent } from './components/paginator/paginator.component';


@NgModule({
    declarations: [OilControlComponent, OilControlTowerComponent, OilControlTableComponent, PaginatorComponent
    ],

    imports: [
        CommonModule,
        SharedModule,
        AngularSvgIconModule,
    ],
    exports: [
    ],
})
export class OilControlModule {
    enterComponent = OilControlComponent;
}

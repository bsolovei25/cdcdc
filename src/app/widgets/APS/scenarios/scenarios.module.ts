import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScenariosComponent } from './scenarios.component';
import { ExpandableBottomFrameComponent } from './components/expandable-bottom-frame/expandable-bottom-frame.component';
import { ApsNotchedContainerComponent } from './components/aps-notched-container/aps-notched-container.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ApsContextMenuDirective } from '../../../dashboard/components/aps-context-menu/aps-context-menu.directive';
import { ApsContextMenuComponent } from '../../../dashboard/components/aps-context-menu/aps-context-menu.component';
import { ApsDropdownMenuComponent } from '../../../dashboard/components/aps-dropdown-menu/aps-dropdown-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    declarations: [
        ScenariosComponent,
        ExpandableBottomFrameComponent,
        ApsNotchedContainerComponent,
        ApsContextMenuDirective,
        ApsContextMenuComponent,
        ApsDropdownMenuComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        AngularSvgIconModule,
        MatSelectModule,
        FormsModule,
        MatButtonModule,
        MatMenuModule,
    ],
    exports: [ApsContextMenuDirective],
    providers: [ApsContextMenuDirective],
})
export class ScenariosModule {
    enterComponent = ScenariosComponent;
}

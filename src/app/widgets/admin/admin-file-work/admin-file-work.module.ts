import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminFileWorkComponent } from './admin-file-work.component';
import { AdminFileWorkFolderComponent } from './components/admin-file-work-folder/admin-file-work-folder.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AdminFileWorkLinkOverlayComponent } from './components/admin-file-work-link-overlay/admin-file-work-link-overlay.component';
import { AdminFileWorkEditOverlayComponent } from './components/admin-file-work-edit-overlay/admin-file-work-edit-overlay.component';
import { AdminFileWorkSvgFileComponent } from './components/admin-file-work-svg-file/admin-file-work-svg-file.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AdminFileWorkComponent,
        AdminFileWorkFolderComponent,
        AdminFileWorkLinkOverlayComponent,
        AdminFileWorkEditOverlayComponent,
        AdminFileWorkSvgFileComponent,
    ],
    imports: [
        CommonModule,
        AngularSvgIconModule,
        SharedModule,
        FormsModule,
    ],
    exports: [
        AdminFileWorkComponent,
        AdminFileWorkFolderComponent,
        AdminFileWorkSvgFileComponent,
    ]
})
export class AdminFileWorkModule {
}

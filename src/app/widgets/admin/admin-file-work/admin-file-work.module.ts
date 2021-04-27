import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminFileWorkComponent } from './admin-file-work.component';
import { AdminFileWorkFolderComponent } from './components/admin-file-work-folder/admin-file-work-folder.component';
import { AngularSvgIconModule } from "angular-svg-icon";
import { AdminFileWorkLinkOverlayComponent } from './components/admin-file-work-link-overlay/admin-file-work-link-overlay.component';
import { AdminFileWorkEditOverlayComponent } from './components/admin-file-work-edit-overlay/admin-file-work-edit-overlay.component';

@NgModule({
    declarations: [AdminFileWorkComponent, AdminFileWorkFolderComponent, AdminFileWorkLinkOverlayComponent, AdminFileWorkEditOverlayComponent],
    imports: [CommonModule, AngularSvgIconModule],
    exports: [AdminFileWorkComponent, AdminFileWorkFolderComponent]
})
export class AdminFileWorkModule {}

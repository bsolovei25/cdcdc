import { Component, OnInit } from '@angular/core';
import { AdminPanelService } from '../../../services/admin-panel/admin-panel.service';

@Component({
    selector: 'evj-admin-ad-import',
    templateUrl: './admin-ad-import.component.html',
    styleUrls: ['./admin-ad-import.component.scss'],
})
export class AdminAdImportComponent implements OnInit {
    constructor(private adminService: AdminPanelService) {}

    public ngOnInit(): void {
    }
}

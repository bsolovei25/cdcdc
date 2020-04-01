import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdminPanelService } from '../../../services/admin-panel/admin-panel.service';

@Component({
    selector: 'evj-admin-ad-import',
    templateUrl: './admin-ad-import.component.html',
    styleUrls: ['./admin-ad-import.component.scss'],
})
export class AdminAdImportComponent implements OnInit {
    @Output() private clickClose: EventEmitter<void> = new EventEmitter<void>();

    private searchedWorker: string = '';

    public searchIcon: string = 'assets/icons/search-icon.svg';

    constructor(private adminService: AdminPanelService) {}

    public ngOnInit(): void {
        this.adminService.getAllLDAPUsers().subscribe((data) => console.log(data));
    }

    public onSearchWorker(inputedValue: string): void {
        this.searchedWorker = inputedValue;
    }

    public onClose(): void {
        this.clickClose.emit();
    }
}

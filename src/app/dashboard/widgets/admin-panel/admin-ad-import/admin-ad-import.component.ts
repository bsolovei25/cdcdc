import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdminPanelService } from '../../../services/admin-panel/admin-panel.service';
import { IUserLdapDto } from '../../../models/admin-panel';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'evj-admin-ad-import',
    templateUrl: './admin-ad-import.component.html',
    styleUrls: ['./admin-ad-import.component.scss'],
})
export class AdminAdImportComponent implements OnInit {
    @Output() private clickClose: EventEmitter<void> = new EventEmitter<void>();

    public workersLdap: IUserLdapDto[] = null;

    private searchedWorker: string = '';

    public searchIcon: string = 'assets/icons/search-icon.svg';

    public workerSelect: SelectionModel<IUserLdapDto> = new SelectionModel<IUserLdapDto>();

    constructor(private adminService: AdminPanelService) {}

    public ngOnInit(): void {
        this.adminService.getAllLDAPUsers().subscribe((data) => (this.workersLdap = data));
    }

    public onSearchWorker(inputedValue: string): void {
        this.searchedWorker = inputedValue;
    }

    public findSearchedWorker(worker: IUserLdapDto): boolean {
        const regexp: RegExp = /[a-z]/i;
        const isSearhingLogin: boolean = this.searchedWorker
            ? regexp.test(this.searchedWorker)
            : false;
        if (isSearhingLogin) {
            return worker.ldapUser.samAccountName
                .toLowerCase()
                .includes(this.searchedWorker.toLowerCase());
        }

        return worker.ldapUser.displayName
            .toLowerCase()
            .includes(this.searchedWorker.toLowerCase());
    }

    public onClose(): void {
        this.clickClose.emit();
    }

    public onClickAdd(): void {
        if (this.workerSelect.hasValue()) {
        }
    }
}

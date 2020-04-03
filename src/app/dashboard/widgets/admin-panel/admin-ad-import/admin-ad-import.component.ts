import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AdminPanelService } from '../../../services/admin-panel/admin-panel.service';
import { IUserLdapDto, IUserLdap, IUserImported } from '../../../models/admin-panel';
import { SelectionModel } from '@angular/cdk/collections';
import { fillDataShape } from '../../../../@shared/common-functions';
import { IUser } from '../../../models/events-widget';
import { Subscription } from 'rxjs';

@Component({
    selector: 'evj-admin-ad-import',
    templateUrl: './admin-ad-import.component.html',
    styleUrls: ['./admin-ad-import.component.scss'],
})
export class AdminAdImportComponent implements OnInit, OnDestroy {
    @Output() private closeLdap: EventEmitter<boolean> = new EventEmitter<boolean>();

    public isDataLoading: boolean = false;

    public workersLdap: IUserLdapDto[] = null;

    private searchedWorker: string = '';

    public searchIcon: string = 'assets/icons/search-icon.svg';

    public workerSelect: SelectionModel<IUserLdapDto> = new SelectionModel<IUserLdapDto>();

    private subscriptions: Subscription[] = [];

    constructor(private adminService: AdminPanelService) {}

    public ngOnInit(): void {
        this.isDataLoading = true;
        this.subscriptions.push(
            this.adminService.getAllLdapUsers().subscribe(
                (data) => (this.workersLdap = data),
                console.log,
                () => (this.isDataLoading = false)
            )
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subs) => subs.unsubscribe());
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
        this.closeLdap.emit(false);
    }

    public async onClickAdd(): Promise<void> {
        if (this.workerSelect.hasValue()) {
            const worker: IUserLdap = this.workerSelect.selected[0].ldapUser;
            const importedWorker: IUser = fillDataShape(this.adminService.defaultWorker);
            importedWorker.id = undefined;
            try {
                this.isDataLoading = true;
                const user = await this.adminService.getLdapUser(worker).toPromise();
                for (const key in user.user) {
                    if (importedWorker.hasOwnProperty(key) && key !== 'id') {
                        importedWorker[key] = user.user[key];
                    }
                }
                this.adminService.activeWorker$.next(importedWorker);
                this.isDataLoading = false;
                this.closeLdap.emit(true);
            } catch (error) {
                console.log(error.error);
                this.isDataLoading = false;
            }
        }
    }
}

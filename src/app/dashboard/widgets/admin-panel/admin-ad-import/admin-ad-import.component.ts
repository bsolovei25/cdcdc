import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AdminPanelService } from '../../../services/admin-panel/admin-panel.service';
import { IUserLdapDto, IUserLdap } from '../../../models/admin-panel';
import { SelectionModel } from '@angular/cdk/collections';
import { fillDataShape } from '../../../../@shared/common-functions';
import { IUser } from '../../../models/events-widget';
import { Subscription } from 'rxjs';
import { SnackBarService } from '../../../services/snack-bar.service';
import { IInputOptions } from '../../../../@shared/models/input.model';

@Component({
    selector: 'evj-admin-ad-import',
    templateUrl: './admin-ad-import.component.html',
    styleUrls: ['./admin-ad-import.component.scss'],
})
export class AdminAdImportComponent implements OnInit, OnDestroy {
    @Output() private closeLdap: EventEmitter<boolean> = new EventEmitter<boolean>();

    public isDataLoading: boolean = false;

    public workersLdap: IUserLdapDto[] = [];

    public inputOptions: IInputOptions = {
        type: 'text',
        state: 'normal',
        placeholder: 'Введите ФИО или логин пользователя',
        isMovingPlaceholder: true,
        icon: {
            src: 'assets/icons/search-icon.svg',
            svgStyle: { 'width.px': 17, 'height.px': 17 },
            isClickable: false,
        },
    };

    public searchedWorker: string = '';

    public searchIcon: string = 'assets/icons/search-icon.svg';

    public workerSelect: SelectionModel<IUserLdapDto> = new SelectionModel<IUserLdapDto>();

    private subscriptions: Subscription[] = [];

    constructor(private adminService: AdminPanelService, private snackBar: SnackBarService) {}

    public ngOnInit(): void {}

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subs) => subs.unsubscribe());
    }

    private getLdapWorkersList(
        searchLogin: string,
        skip: number = 0,
        take: number = 50,
        lastSid: string = ''
    ): void {
        this.isDataLoading = true;
        this.subscriptions.push(
            this.adminService.getAllLdapUsers(searchLogin, skip, take, lastSid).subscribe(
                (data) => {
                    if (skip) {
                        if (data.length) {
                            // TOFIX
                            // заменить проверку на последнего пользователя на фронте на
                            // this.workersLdap = this.workersLdap.concat(data);
                            const filteredData = data.filter(
                                (dataItem) =>
                                    !this.workersLdap.find(
                                        (user) => user.ldapUser.sid === dataItem.ldapUser.sid
                                    )
                            );

                            this.workersLdap = this.workersLdap.concat(filteredData);
                        }
                    } else {
                        this.workersLdap = data;
                    }
                },
                console.log,
                () => (this.isDataLoading = false)
            )
        );
    }

    public onSelectWorker(worker: IUserLdapDto): void {
        if (!worker.isUserImported) {
            this.workerSelect.select(worker);
        }
    }

    public onClose(): void {
        this.closeLdap.emit(false);
    }

    public onClickSearch(): void {
        const regexp: RegExp = /^[a-zA-Zа-яА-Я\.\s]{2,}/;
        this.searchedWorker.trim().toLowerCase();
        if (regexp.test(this.searchedWorker)) {
            this.getLdapWorkersList(this.searchedWorker);
        } else {
            this.snackBar.openSnackBar(
                'Поисковый запрос должен содержать не менее двух символов',
                'snackbar-red'
            );
        }
    }

    public onScroll(event: Event): void {
        const element: HTMLElement = event.target as HTMLElement;
        if (element.offsetHeight + element.scrollTop >= element.scrollHeight) {
            const lastSid: string = this.workersLdap.slice(-1)[0].user.sid;
            this.getLdapWorkersList(this.searchedWorker, this.workersLdap.length, 50, lastSid);
        }
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

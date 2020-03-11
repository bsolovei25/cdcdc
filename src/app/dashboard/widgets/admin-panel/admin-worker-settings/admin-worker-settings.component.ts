import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IWorkerOptionAdminPanel, IWorkspace } from '../../../models/admin-panel';
import { IUser } from '../../../models/events-widget';
import { AdminPanelService } from '../../../services/admin-panel/admin-panel.service';
import { Subscription } from 'rxjs';
import { fillDataShape } from '../../../../@shared/common-functions';

@Component({
    selector: 'evj-admin-worker-settings',
    templateUrl: './admin-worker-settings.component.html',
    styleUrls: ['./admin-worker-settings.component.scss'],
})
export class AdminWorkerSettingsComponent implements OnInit, OnDestroy {
    @Output() public closeWorkerSettings: EventEmitter<IUser> = new EventEmitter<IUser>();

    public isChangingOption: boolean = false;
    public isClaimsShowing: boolean = true;
    public isAlertShowing: boolean = false;

    public isCheckBoxClicked: boolean = false;

    public searchIcon: string = 'assets/icons/search-icon.svg';

    public value: string = 'Иванов Иван Иванович';
    public name: string = 'ФИО';

    public options: IWorkerOptionAdminPanel[];

    public worker: IUser = null;

    public workspaces: IWorkspace[] = [];

    private subscriptions: Subscription[] = [];

    constructor(private adminService: AdminPanelService) {}

    public ngOnInit(): void {
        this.subscriptions.push(
            this.adminService.activeWorker$.subscribe((worker: IUser) => {
                this.worker = fillDataShape(worker);
                this.options = [
                    {
                        name: 'ФИО',
                        value: this.adminService.getFullName(this.worker),
                        key: 'name',
                    },
                    {
                        name: 'Должность',
                        value: this.worker.positionDescription,
                        key: 'positionDescription',
                    },
                    {
                        name: 'Телефон',
                        value: this.worker.phone,
                        key: 'phone',
                    },
                    {
                        name: 'Почта',
                        value: this.worker.email,
                        key: 'email',
                    },
                    {
                        name: 'Бригада',
                        value: this.worker.brigade.number,
                        key: 'brigade',
                    },
                ];
            }),
            this.adminService.getAllScreens().subscribe((data: IWorkspace[]) => {
                this.workspaces = data;
            })
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe());
    }

    public onFieldChanging(event: IWorkerOptionAdminPanel): void {
        if (event.key === 'name') {
            const nameArray: string[] = event.value.split(' ');
            if (nameArray.length > 3) {
                console.error('INVALID WORKER NAME');
            } else {
                this.worker.lastName = nameArray[0] ? nameArray[0] : '';
                this.worker.firstName = nameArray[1] ? nameArray[1] : '';
                this.worker.middleName = nameArray[2] ? nameArray[2] : '';
            }
        } else {
            this.worker[event.key] = event.value;
        }

        console.log(this.worker);
    }

    public onReturn(): void {
        this.closeWorkerSettings.emit(null);
    }

    public onSave(): void {
        this.closeWorkerSettings.emit(this.worker);
    }
}

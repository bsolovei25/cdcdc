import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IWorkerOptionAdminPanel, IWorkspace, IScreen } from '../../../models/admin-panel';
import { IUser } from '../../../models/events-widget';
import { AdminPanelService } from '../../../services/admin-panel/admin-panel.service';
import { Subscription } from 'rxjs';
import { fillDataShape } from '../../../../@shared/common-functions';
import { async } from '@angular/core/testing';

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

    public options: IWorkerOptionAdminPanel[];

    public worker: IUser = null;

    public workspaces: IWorkspace[] = [];
    public workerScreens: IWorkspace[] = [];
    public workerScreensDetached: IScreen[] = [];

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
            this.adminService.activeWorkerScreens$.subscribe((workerScreens: IScreen[]) => {
                workerScreens.forEach((item: IScreen) => {
                    this.workerScreens.push(item.screen);
                });
                this.workerScreensDetached = workerScreens;
            }),
            this.adminService.getAllScreens().subscribe((data: IWorkspace[]) => {
                this.workspaces = data;
            })
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe());
    }

    public defineIsWorkspaceActive(workspace: IWorkspace): boolean {
        return !!this.workerScreens.find((item: IWorkspace) => item.id === workspace.id);
    }

    public onSelectWorkspace(event: IWorkspace): void {
        this.isAlertShowing = true;
        if (!this.defineIsWorkspaceActive(event)) {
            this.workerScreens.push(event);
        } else {
            const index: number = this.workerScreens.findIndex(
                (item: IWorkspace) => item.id === event.id
            );
            this.workerScreens.splice(index, 1);
        }
    }

    private addWorkspacesToWorker(): number[] {
        const idArray: number[] = [];
        this.workerScreens.forEach((item: IWorkspace) => {
            const addingFlag: boolean = !!this.workerScreensDetached.find(
                (wsd: IScreen) => wsd.screen.id === item.id
            );
            if (!addingFlag) {
                idArray.push(item.id);
            }
        });
        return idArray;
    }

    private removeWorkspacesFromWorker(): number[] {
        const idArray: number[] = [];
        this.workerScreensDetached.forEach((item: IScreen) => {
            const addingFlag: boolean = !!this.workerScreens.find(
                (wsd: IWorkspace) => wsd.id === item.screen.id
            );
            if (!addingFlag) {
                idArray.push(item.id);
            }
        });
        return idArray;
    }

    public onSelectClaim(): void {
        this.isAlertShowing = true;
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
        this.isAlertShowing = true;
    }

    public returnPhotoPath(): string {
        return this.adminService.getPhotoLink(this.worker);
    }

    public onReturn(): void {
        this.closeWorkerSettings.emit(null);
    }

    public async onSave(): Promise<void> {
        if (this.isCheckBoxClicked) {
            try {
                const promises: Promise<any>[] = [];
                promises.push(this.adminService.editWorkerData(this.worker).toPromise());
                this.addWorkspacesToWorker().forEach(async (index: number) => {
                    promises.push(
                        this.adminService.addWorkerScreen(this.worker.id, index).toPromise()
                    );
                });
                this.removeWorkspacesFromWorker().forEach(async (index: number) => {
                    promises.push(this.adminService.removeWorkerScreen(index).toPromise());
                });
                await Promise.all(promises);
                await this.adminService.updateAllWorkers();
                await this.adminService.updateAllBrigades();
                const userScreens: IScreen[] = await this.adminService
                    .getWorkerScreens(this.worker.id)
                    .toPromise();
                this.adminService.activeWorkerScreens$.next(userScreens);
                this.adminService.activeWorker$.next(this.worker);
            } catch (error) {
                throw new Error(error);
            }

            this.closeWorkerSettings.emit(this.worker);
        }
    }
}

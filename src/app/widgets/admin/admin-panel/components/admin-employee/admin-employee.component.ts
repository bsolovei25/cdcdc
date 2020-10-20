import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IUser } from '../../../../../dashboard/models/EVJ/events-widget';
import { Subscription } from 'rxjs';
import { AdminPanelService } from '../../../../../dashboard/services/admin-panel/admin-panel.service';

@Component({
    selector: 'evj-admin-employee',
    templateUrl: './admin-employee.component.html',
    styleUrls: ['./admin-employee.component.scss'],
})
export class AdminEmployeeComponent implements OnInit, OnDestroy {
    @Input() public searchedWorker: string = '';
    @Input() public workers: IUser[] = null;

    public defaultActiveWorker: IUser = {
        id: null,
        login: '',
        firstName: '',
        lastName: '',
        middleName: '',
        phone: 'Номер телефона',
        email: 'Электронная почта',
        position: 'common',
        positionDescription: '',
        displayName: '',
        isShiftWorker: false,
    };

    public activeWorker: IUser = null;

    private subscriptions: Subscription[] = [];
    private subsSelectedWorker: Subscription = null;

    constructor(private adminService: AdminPanelService) {}

    public ngOnInit(): void {
        this.subscriptions.push(
            this.adminService.activeWorker$.subscribe(
                (activeWorker: IUser) => (this.activeWorker = activeWorker)
            )
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe());
        if (this.subsSelectedWorker) {
            this.subsSelectedWorker.unsubscribe();
        }
    }

    public onSelectWorker(workerId: number): void {
        const worker: IUser = this.workers.find((item: IUser) => item.id === workerId);
        this.adminService.setActiveWorker(worker);

        if (this.subsSelectedWorker) {
            this.subsSelectedWorker.unsubscribe();
        }
        this.subsSelectedWorker = this.adminService
            .getAllWorkerScreenClaims(workerId)
            .subscribe((data) => {
                this.adminService.activeWorkerWorkspaces$.next(data.data);
            });
    }

    public showActiveWorker(workerId: number): boolean {
        return workerId === this.activeWorker.id;
    }

    public onSearchWorker(workerName: string): boolean {
        const name: string = workerName.toLowerCase();
        return name.includes(this.searchedWorker.toLowerCase());
    }

    public getWorkerFullName(worker: IUser): string {
        let name: string = `${worker.lastName} ${worker.firstName}`;
        if (worker.middleName) {
            name = `${name} ${worker.middleName}`;
        }
        return name;
    }

    public returnPhotoPath(): string {
        return this.adminService.getPhotoLink(this.activeWorker);
    }
}

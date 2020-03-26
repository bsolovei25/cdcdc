import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AdminPanelService } from '../../../services/admin-panel/admin-panel.service';
import { Subscription } from 'rxjs';
import { IUser } from '../../../models/events-widget';
import { IScreen, IBrigadeAdminPanel } from '../../../models/admin-panel';

@Component({
    selector: 'evj-admin-employee',
    templateUrl: './admin-employee.component.html',
    styleUrls: ['./admin-employee.component.scss'],
})
export class AdminEmployeeComponent implements OnInit, OnDestroy {
    @Input() public searchedWorker: string = '';
    @Input() public workers: IUser[] = null;

    private brigades: IBrigadeAdminPanel[] = [];

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
    };

    public activeWorker: IUser = null;

    private subscriptions: Subscription[] = [];
    private subsSelectedWorker: Subscription = null;

    constructor(private adminService: AdminPanelService) {}

    public ngOnInit(): void {
        this.subscriptions.push(
            this.adminService.activeWorker$.subscribe(
                (activeWorker: IUser) => (this.activeWorker = activeWorker)
            ),
            this.adminService.allBrigades$.subscribe((brigades) => (this.brigades = brigades))
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
        const workerBrigade: IBrigadeAdminPanel = this.brigades.find(
            (brigade: IBrigadeAdminPanel) => brigade.brigadeId === worker.brigade.id
        );
        this.adminService.setActiveWorker(worker);
        this.adminService.activeBrigade$.next(workerBrigade);

        if (this.subsSelectedWorker) {
            this.subsSelectedWorker.unsubscribe();
        }
        this.adminService.getWorkerScreens(workerId).subscribe((data: IScreen[]) => {
            this.adminService.activeWorkerScreens$.next(data);
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
        return `${worker.lastName} ${worker.firstName} ${worker.middleName}`;
    }

    public returnPhotoPath(): string {
        return this.adminService.getPhotoLink(this.activeWorker);
    }
}

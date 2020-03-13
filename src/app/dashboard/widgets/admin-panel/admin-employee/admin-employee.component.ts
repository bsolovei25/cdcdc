import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AdminPanelService } from '../../../services/admin-panel/admin-panel.service';
import { Subscription } from 'rxjs';
import { IUser } from '../../../models/events-widget';
import { IScreen } from '../../../models/admin-panel';

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
        brigade: {
            id: null,
            number: 'Номер бригады',
        },
        position: '',
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
        this.adminService.setActiveWorker(this.workers.find((item: IUser) => item.id === workerId));
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
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IWorker } from '../../../models/worker';
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
    public activeWorker: IUser = null;

    private subscriptions: Subscription[] = [];
    private subsSelectedWorker: Subscription = null;

    constructor(private adminPanel: AdminPanelService) {}

    public ngOnInit(): void {
        this.subscriptions.push(
            this.adminPanel.activeWorker$.subscribe(
                (activeWorker: IUser) => (this.activeWorker = activeWorker)
            )
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe());
    }

    public onSelectWorker(workerId: number): void {
        this.adminPanel.setActiveWorker(this.workers.find((item: IUser) => item.id === workerId));
        if (this.subsSelectedWorker) {
            this.subsSelectedWorker.unsubscribe();
        }
        this.subsSelectedWorker = this.adminPanel
            .getWorkerScreens(workerId)
            .subscribe((data: IScreen[]) => {
                this.adminPanel.activeWorkerScreens$.next(data);
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
}

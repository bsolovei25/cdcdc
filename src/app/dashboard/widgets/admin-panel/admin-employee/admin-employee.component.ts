import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IWorker } from '../../../models/worker';
import { AdminPanelService } from '../../../services/admin-panel/admin-panel.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'evj-admin-employee',
    templateUrl: './admin-employee.component.html',
    styleUrls: ['./admin-employee.component.scss'],
})
export class AdminEmployeeComponent implements OnInit, OnDestroy {
    @Input() searchedWorker: string = '';
    public activeWorker: IWorker = null;
    public workers: IWorker[];

    private subsriptions: Subscription[] = [];

    constructor(private adminPanel: AdminPanelService) {}

    public ngOnInit(): void {
        this.subsriptions.push(
            this.adminPanel.activeWorker$.subscribe(
                (activeWorker: IWorker) => (this.activeWorker = activeWorker)
            )
        );
        this.workers = this.adminPanel.workers;
    }

    public ngOnDestroy(): void {
        this.subsriptions.forEach((subs: Subscription) => subs.unsubscribe());
    }

    public onSelectWorker(workerId: number): void {
        this.adminPanel.setActiveWorker(this.workers.find((item: IWorker) => item.id === workerId));
    }

    public showActiveWorker(workerId: number): boolean {
        return workerId === this.activeWorker.id;
    }

    public onSearchWorker(workerName: string): boolean {
        const name: string = workerName.toLowerCase();
        return name.includes(this.searchedWorker.toLowerCase());
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { IBrigadeAdminPanel, IWorkerAdminPanel } from '../../../models/admin-panel';
import { AdminPanelService } from '../../../services/admin-panel/admin-panel.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'evj-admin-brigades',
    templateUrl: './admin-brigades.component.html',
    styleUrls: ['./admin-brigades.component.scss'],
})
export class AdminBrigadesComponent implements OnInit, OnDestroy {
    public brigades: IBrigadeAdminPanel[] = [];

    public workers: IWorkerAdminPanel[] = [];

    constructor(private adminPanel: AdminPanelService) {}

    public ngOnInit(): void {
        this.brigades = this.adminPanel.brigades;
        this.workers = this.adminPanel.activeBrigadeWorkers;

        this.brigades[0].isActiveBrigade = true;
        this.adminPanel.activeBrigade$.next(this.brigades[0].brigade);
        this.workers[0].isActiveWorker = true;
        this.adminPanel.activeWorker$.next(this.workers[0].worker);
    }

    public ngOnDestroy(): void {
        this.adminPanel.activeBrigade$.next(null);
    }

    public setActiveBrigade(brigade: IBrigadeAdminPanel): void {
        this.brigades.forEach((item) => {
            if (item.brigade.id === brigade.brigade.id) {
                item.isActiveBrigade = true;
                this.adminPanel.activeBrigade$.next(item.brigade);
            } else {
                item.isActiveBrigade = false;
            }
        });
    }

    public setActiveWorker(workerId: number): void {
        this.workers.forEach((item) => {
            if (item.worker.id === workerId) {
                item.isActiveWorker = true;
            } else {
                item.isActiveWorker = false;
            }
        });
    }
}

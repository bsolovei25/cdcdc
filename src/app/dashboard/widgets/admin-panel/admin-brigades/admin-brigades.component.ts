import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { IBrigadeAdminPanel, IWorkerAdminPanel } from '../../../models/admin-panel';
import { AdminPanelService } from '../../../services/admin-panel/admin-panel.service';
import { Subscription } from 'rxjs';
import { IBrigade } from '../../../models/shift.model';
import { SelectionModel } from '@angular/cdk/collections';
import { IUser } from '../../../models/events-widget';

@Component({
    selector: 'evj-admin-brigades',
    templateUrl: './admin-brigades.component.html',
    styleUrls: ['./admin-brigades.component.scss'],
})
export class AdminBrigadesComponent implements OnInit, OnDestroy {
    @Input() public brigades: IBrigadeAdminPanel[] = [];

    public workers: IUser[] = [];

    public selectBrigade: SelectionModel<IBrigadeAdminPanel> = new SelectionModel<
        IBrigadeAdminPanel
    >(true);

    public selectWorker: SelectionModel<IUser> = new SelectionModel<IUser>(true);

    constructor(private adminPanel: AdminPanelService) {}

    public ngOnInit(): void {
        // this.adminPanel.activeWorker$.next(this.workers[0]);
    }

    public ngOnDestroy(): void {}

    public setActiveBrigade(brigade: IBrigadeAdminPanel): void {
        if (!this.selectBrigade.isSelected(brigade)) {
            this.selectBrigade.clear();
            this.selectBrigade.select(brigade);
            this.workers = brigade.users;
        }
    }

    public setActiveWorker(worker: IUser): void {
        if (!this.selectWorker.isSelected(worker)) {
            this.selectWorker.clear();
            this.selectWorker.select(worker);
            this.adminPanel.activeWorker$.next(worker);
        }
    }
}

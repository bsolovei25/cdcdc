import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { IBrigadeAdminPanel, IWorkerAdminPanel, IScreen } from '../../../models/admin-panel';
import { AdminPanelService } from '../../../services/admin-panel/admin-panel.service';
import { Subscription, zip } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { IUser } from '../../../models/events-widget';

@Component({
    selector: 'evj-admin-brigades',
    templateUrl: './admin-brigades.component.html',
    styleUrls: ['./admin-brigades.component.scss'],
})
export class AdminBrigadesComponent implements OnInit, OnDestroy {
    //#region INPUTS

    @Input() public brigades: IBrigadeAdminPanel[] = [];

    //#endregion

    //#region SELECTION_MODELS

    public selectBrigade: SelectionModel<IBrigadeAdminPanel> = new SelectionModel<
        IBrigadeAdminPanel
    >(true);
    public selectWorker: SelectionModel<IUser> = new SelectionModel<IUser>(true);

    //#endregion

    //#region SUBSCRIPTIONS

    public subsSelectedWorker: Subscription = null;
    public subsActiveBrigadeWorker: Subscription = null;

    //#endregion

    public workers: IUser[] = [];

    constructor(private adminService: AdminPanelService) {}

    public ngOnInit(): void {
        const combine = zip(this.adminService.activeBrigade$, this.adminService.activeWorker$);
        this.subsActiveBrigadeWorker = combine.subscribe((data: [IBrigadeAdminPanel, IUser]) => {
            if (data[0]) {
                this.setActiveBrigade(data[0]);
            }
            if (data[1]) {
                this.brigades.forEach((brigade) => {
                    const worker: IUser = brigade.users.find(
                        (user: IUser) => user.id === data[1].id
                    );
                    if (worker) {
                        this.setActiveWorker(worker);
                    }
                });
            }
        });
    }

    public ngOnDestroy(): void {
        if (this.subsSelectedWorker) {
            this.subsSelectedWorker.unsubscribe();
        }
        if (this.subsActiveBrigadeWorker) {
            this.subsActiveBrigadeWorker.unsubscribe();
        }
    }

    public setActiveBrigade(brigade: IBrigadeAdminPanel): void {
        if (!this.selectBrigade.isSelected(brigade)) {
            this.selectBrigade.clear();
            this.selectBrigade.select(brigade);
            this.adminService.activeBrigade$.next(brigade);
            this.workers = brigade.users;
        }
    }

    public setActiveWorker(worker: IUser): void {
        if (!this.selectWorker.isSelected(worker)) {
            this.selectWorker.clear();
            this.selectWorker.select(worker);
            this.adminService.activeWorker$.next(worker);

            if (this.subsSelectedWorker) {
                this.subsSelectedWorker.unsubscribe();
            }

            this.subsSelectedWorker = this.adminService
                .getWorkerScreens(worker.id)
                .subscribe((data: IScreen[]) => {
                    this.adminService.activeWorkerScreens$.next(data);
                });
        }
    }

    public returnPhotoPath(worker: IUser): string {
        return this.adminService.getPhotoLink(worker);
    }
}

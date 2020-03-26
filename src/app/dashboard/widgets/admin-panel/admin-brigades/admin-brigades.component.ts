import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { IBrigadeAdminPanel, IScreen } from '../../../models/admin-panel';
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
    >();
    public selectWorker: SelectionModel<IUser> = new SelectionModel<IUser>();

    //#endregion

    //#region SUBSCRIPTIONS

    public subsSelectedWorker: Subscription = null;
    public subsActiveBrigadeWorker: Subscription = null;

    //#endregion

    public workers: IUser[] = [];

    constructor(private adminService: AdminPanelService) {}

    public ngOnInit(): void {
        this.subsSelectedWorker = this.adminService.activeBrigade$.subscribe(
            (brigade: IBrigadeAdminPanel) => {
                if (!brigade) {
                    this.adminService.activeBrigade$.next(this.brigades[0]);
                } else {
                    this.setActiveBrigade(brigade);
                    this.subsActiveBrigadeWorker = this.adminService.activeWorker$.subscribe(
                        (worker) => {
                            if (worker.id) {
                                this.brigades.forEach((brig) => {
                                    const worker1: IUser = brig.users.find(
                                        (user: IUser) => user.id === worker.id
                                    );
                                    if (worker1) {
                                        this.setActiveWorker(worker1);
                                    }
                                });
                            } else {
                                const respUser = brigade.users.find(
                                    (user) => user.position === 'responsible'
                                );
                                if (respUser) {
                                    this.adminService.activeWorker$.next(respUser);
                                } else {
                                    this.adminService.activeWorker$.next(brigade.users[0]);
                                }
                            }
                        }
                    );
                }
            }
        );
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
            this.selectBrigade.select(brigade);
            this.adminService.activeBrigade$.next(brigade);
            this.workers = brigade.users;
        }
    }

    public setActiveWorker(worker: IUser): void {
        if (!this.selectWorker.isSelected(worker)) {
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

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { IBrigadeAdminPanel, IWorkerAdminPanel, IScreen } from '../../../models/admin-panel';
import { AdminPanelService } from '../../../services/admin-panel/admin-panel.service';
import { Subscription } from 'rxjs';
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

    public subsSelectedWorker: Subscription = null;

    constructor(private adminService: AdminPanelService) {}

    // TODO

    public ngOnInit(): void {
        // this.adminPanel.activeWorker$.next(this.workers[0]);
        this.adminService.activeBrigade$.subscribe((data: IBrigadeAdminPanel) => {
            if (data) {
                this.setActiveBrigade(data);
            }
        });
    }

    // private async findActiveUser(): Promise<void> {
    //     const brigade: IBrigadeAdminPanel = await this.adminService.activeBrigade$.toPromise();
    //     const worker: IUser = await this.adminService.activeWorker$.toPromise();
    //     if (brigade) {
    //         this.setActiveBrigade(brigade);
    //     }
    //     const workerInBrigade: IUser = brigade.users.find((user: IUser) => user.id === worker.id);
    //     if (workerInBrigade) {
    //         this.setActiveWorker(workerInBrigade);
    //     }
    // }

    public ngOnDestroy(): void {
        if (this.subsSelectedWorker) {
            this.subsSelectedWorker.unsubscribe();
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

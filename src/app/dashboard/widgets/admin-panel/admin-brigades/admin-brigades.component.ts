import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { IBrigadeAdminPanel, IScreen } from '../../../models/admin-panel';
import { AdminPanelService } from '../../../services/admin-panel/admin-panel.service';
import { Subscription, combineLatest } from 'rxjs';
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
    @Input() public searchedBrigade: string = '';

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
    public subs: Subscription = null;

    //#endregion

    public workers: IUser[] = [];

    constructor(private adminService: AdminPanelService) {}

    public ngOnInit(): void {
        this.subs = combineLatest([
            this.adminService.activeBrigade$,
            this.adminService.activeWorker$,
        ]).subscribe(([brigade, worker]) => {
            if (brigade) {
                this.setActiveBrigade(brigade);
                this.defineActiveWorker(brigade, worker);
            } else {
                this.adminService.activeBrigade$.next(this.brigades[0]);
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
        if (this.subs) {
            this.subs.unsubscribe();
        }
    }

    public displaySearchedBrigade(brigade: IBrigadeAdminPanel): boolean {
        const value: string = `Бригада ${brigade.brigadeNumber}`;
        return value.toLowerCase().includes(this.searchedBrigade);
    }

    private defineActiveWorker(brigade: IBrigadeAdminPanel, worker: IUser): void {
        if (worker.id) {
            this.brigades.forEach((brigadeItem) => {
                const brigadeWorker = brigadeItem.users.find((user) => user.id === worker.id);
                if (brigadeWorker) {
                    this.setActiveWorker(brigadeWorker);
                }
            });
        } else {
            let responsibleWorker = brigade
                ? brigade.users.find((brigadeWorker) => brigadeWorker.position === 'responsible')
                : null;
            responsibleWorker = responsibleWorker ? responsibleWorker : brigade.users[0];
            this.setActiveWorker(responsibleWorker);
        }
    }

    private pushUpResponsibleWorker(): void {
        const index: number = this.workers.findIndex((item) => item.position === 'responsible');
        const mainWorker = this.workers.splice(index, 1)[0];
        this.workers.unshift(mainWorker);
    }

    public setActiveBrigade(brigade: IBrigadeAdminPanel): void {
        if (!this.selectBrigade.isSelected(brigade)) {
            this.selectBrigade.select(brigade);
            this.adminService.activeBrigade$.next(brigade);
            this.workers = brigade.users;
            this.pushUpResponsibleWorker();
        }
    }

    public setActiveWorker(worker: IUser): void {
        if (!this.selectWorker.isSelected(worker)) {
            this.selectWorker.select(worker);
            this.adminService.activeWorker$.next(worker);

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

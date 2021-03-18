import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IGlobalClaim } from '../../../../../../dashboard/models/ADMIN/admin-panel.model';
import { AdminPanelService } from '../../../../../../dashboard/services/widgets/admin-panel/admin-panel.service';

@Component({
    selector: 'evj-admin-claims',
    templateUrl: './admin-claims.component.html',
    styleUrls: ['./admin-claims.component.scss'],
})
export class AdminClaimsComponent implements OnInit, OnDestroy {
    public claims: IGlobalClaim[] = [];

    private subscriptions: Subscription[] = [];

    constructor(private adminService: AdminPanelService) {}

    public ngOnInit(): void {
        this.subscriptions.push(
            this.adminService.activeWorker$
                .pipe(
                    mergeMap((worker) => {
                        if (worker.id) {
                            return this.adminService.getWorkerGeneralClaims(worker.id);
                        }
                        return new BehaviorSubject(null);
                    })
                )
                .subscribe((data) => {
                    if (data) {
                        this.claims = data.data;
                    }
                })
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subs) => subs.unsubscribe());
    }
}

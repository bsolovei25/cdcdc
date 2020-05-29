import { Component, OnInit, OnDestroy } from '@angular/core';
import { IGlobalClaim } from '../../../../models/admin-panel';
import { AdminPanelService } from '../../../../services/admin-panel/admin-panel.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

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

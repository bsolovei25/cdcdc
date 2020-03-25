import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AdminPanelService } from '../../../../services/admin-panel/admin-panel.service';
import { IUser } from '../../../../models/events-widget';
import { IBrigadeAdminPanel } from '../../../../models/admin-panel';
import { Subscription } from 'rxjs';

@Component({
    selector: 'evj-aws-alert',
    templateUrl: './aws-alert.component.html',
    styleUrls: ['./aws-alert.component.scss'],
})
export class AwsAlertComponent implements OnInit, OnDestroy {
    @Input() public worker: IUser = null;
    @Input() public isSetResponsible: boolean = true;

    @Output() private choose: EventEmitter<void> = new EventEmitter<void>();

    public workerBrigade: string = '';
    public lastResponsible: string = '';
    public newResponsible: string = '';

    private subscription: Subscription = null;

    constructor(private adminService: AdminPanelService) {}

    public ngOnInit(): void {
        if (this.worker.brigade) {
            const workerBrigadeId: number = this.worker.brigade.id;
            this.workerBrigade = this.worker.brigade.number;
            this.subscription = this.adminService.allBrigades$.subscribe((brigades) => {
                const workerBrigade: IBrigadeAdminPanel = brigades.find(
                    (item) => item.brigadeId === workerBrigadeId
                );
                const responsible: IUser = workerBrigade.users.find(
                    (user) => user.position === 'responsible'
                );
                if (responsible) {
                    this.lastResponsible = `${responsible.lastName} ${responsible.firstName} ${responsible.middleName}`;
                } else {
                    this.lastResponsible = '-';
                }
            });
        }

        this.newResponsible = `${this.worker.lastName} ${this.worker.firstName} ${this.worker.middleName}`;
    }

    public ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    public onClickYes(): void {
        this.worker.position = this.isSetResponsible ? 'responsible' : 'common';
        this.choose.emit();
    }

    public onClickNo(): void {
        this.worker.position = this.isSetResponsible ? 'common' : 'responsible';
        this.choose.emit();
    }
}

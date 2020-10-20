import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IUser } from '../../../../../dashboard/models/EVJ/events-widget';
import { EventsWorkspaceService } from '../../../../../dashboard/services/widgets/events-workspace.service';

@Component({
    selector: 'evj-events-responsible-select',
    templateUrl: './events-responsible-select.component.html',
    styleUrls: ['./events-responsible-select.component.scss'],
})
export class EventsResponsibleSelectComponent implements OnInit {
    @Input() private isRetrieval: boolean = false;

    filter: FormControl = new FormControl({value: '', disabled: true});

    public responsible: IUser = null;

    private onDestroy: Subject<void> = new Subject<void>();

    public users: IUser[];

    constructor(public ewService: EventsWorkspaceService) {}

    public ngOnInit(): void {
        this.ewService.event$.pipe(takeUntil(this.onDestroy)).subscribe((event) => {
            if (event) {
                this.responsible = event.responsibleOperator;
            }
        });
        this.filter.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
            this.filterUsers();
        });
        this.clearFilter();
    }

    public chooseRespons(data: IUser): void {
        this.ewService.event.responsibleOperator = data;
    }

    public clearFilter(): void {
        this.filter.setValue('');
    }

    private filterUsers(): void {
        if (!this.ewService.users) {
            return;
        }
        let value = this.filter.value.trim();
        if (!value || value === '') {
            this.users = this.ewService.users;
            return;
        } else {
            value = value.toLowerCase();
        }
        this.users = this.ewService.users.filter(
            (user) =>
                user.firstName.toLowerCase().indexOf(value) > -1 ||
                user.lastName.toLowerCase().indexOf(value) > -1
        );
    }
}

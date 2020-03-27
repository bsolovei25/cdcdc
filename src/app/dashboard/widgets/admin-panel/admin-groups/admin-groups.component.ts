import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IButtonImgSrc, IGroup, IWorkspace } from '../../../models/admin-panel';
import { SelectionModel } from '@angular/cdk/collections';
import { AdminPanelService } from '../../../services/admin-panel/admin-panel.service';
import { IUser } from '../../../models/events-widget';

@Component({
    selector: 'evj-admin-groups',
    templateUrl: './admin-groups.component.html',
    styleUrls: ['./admin-groups.component.scss'],
})
export class AdminGroupsComponent implements OnInit {
    @Output() private hideGroups: EventEmitter<void> = new EventEmitter<void>();

    public searchIcon: string = 'assets/icons/search-icon.svg';
    public plusIcon: IButtonImgSrc = {
        btnIconSrc: 'assets/icons/plus-icon.svg',
    };

    public allWorkers: IUser[] = [];
    public allWorkspaces: IWorkspace[] = [];

    // Mocked data
    public groups: IGroup[] = [
        {
            id: 1,
            name: 'Группа №1'
        },
        {
            id: 2,
            name: 'Группа №2'
        },
        {
            id: 3,
            name: 'Группа №3'
        },
        {
            id: 4,
            name: 'Группа №4'
        },
    ];

    public groupSelection: SelectionModel<IGroup> = new SelectionModel<IGroup>();

    constructor(private adminService: AdminPanelService) {}

    ngOnInit(): void {
        this.groupSelection.select(this.groups[0]);
        this.adminService.allWorkers$.subscribe((workers: IUser[]) => (this.allWorkers = workers));
        this.adminService
            .getAllScreens()
            .subscribe((screens: IWorkspace[]) => (this.allWorkspaces = screens));
    }

    public onSearchGroup(event: string): void {
        console.log(event);
    }

    public onSearchUser(event: string): void {
        console.log(event);
    }

    public createNewBrigade(): void {}

    public onClickBack(): void {
        this.hideGroups.emit();
    }

    public onSelectGroup(group: IGroup): void {
        this.groupSelection.select(group);
    }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IWorker } from '../../../models/worker';
import { IWorkerOptionAdminPanel, IWorkspace } from '../../../models/admin-panel';
import { IUser } from '../../../models/events-widget';
import { AdminPanelService } from '../../../services/admin-panel/admin-panel.service';

@Component({
    selector: 'evj-admin-worker-settings',
    templateUrl: './admin-worker-settings.component.html',
    styleUrls: ['./admin-worker-settings.component.scss'],
})
export class AdminWorkerSettingsComponent implements OnInit {
    @Output() public closeWorkerSettings: EventEmitter<IUser> = new EventEmitter<IUser>();

    public isChangingOption: boolean = false;
    public isClaimsShowing: boolean = true;
    public isAlertShowing: boolean = false;

    public isCheckBoxClicked: boolean = false;

    public searchIcon: string = 'assets/icons/search-icon.svg';

    public value: string = 'Иванов Иван Иванович';
    public name: string = 'ФИО';

    public options: IWorkerOptionAdminPanel[];

    public worker: IUser = null;

    public workspaces: IWorkspace[] = [
        {
            name: 'Рабочая область №1',
            authorId: 1,
        },
        {
            name: 'Рабочая область №1',
            authorId: 1,
        },
        {
            name: 'Рабочая область №1',
            authorId: 1,
        },
        {
            name: 'Рабочая область №1',
            authorId: 1,
        },
        {
            name: 'Рабочая область №1',
            authorId: 1,
        },
        {
            name: 'Рабочая область №1',
            authorId: 1,
        },
        {
            name: 'Рабочая область №1',
            authorId: 1,
        },
        {
            name: 'Рабочая область №1',
            authorId: 1,
        },
        {
            name: 'Рабочая область №1',
            authorId: 1,
        },
        {
            name: 'Рабочая область №1',
            authorId: 1,
        },
        {
            name: 'Рабочая область №1',
            authorId: 1,
        },
        {
            name: 'Рабочая область №1',
            authorId: 1,
        },
    ];

    constructor(private adminService: AdminPanelService) {}

    public ngOnInit(): void {
        this.options = [
            // {
            //     name: 'ФИО',
            //     value: this.worker.name,
            // },
            // {
            //     name: 'Должность',
            //     value: this.worker.position,
            // },
            // {
            //     name: 'Телефон',
            //     value: this.worker.phone,
            // },
            // {
            //     name: 'Почта',
            //     value: this.worker.email,
            // },
            // {
            //     name: 'Бригада',
            //     value: this.worker.brigade,
            // },
            // {
            //     name: 'ФИО',
            //     value: this.worker.name,
            // },
            // {
            //     name: 'Должность',
            //     value: this.worker.position,
            // },
            // {
            //     name: 'Телефон',
            //     value: this.worker.phone,
            // },
            // {
            //     name: 'Почта',
            //     value: this.worker.email,
            // },
            // {
            //     name: 'Бригада',
            //     value: this.worker.brigade,
            // },
        ];
        this.adminService.getAllScreens().subscribe(console.log);
    }

    public onReturn(): void {
        this.closeWorkerSettings.emit(null);
    }

    public onSave(): void {
        this.closeWorkerSettings.emit(this.worker);
    }
}

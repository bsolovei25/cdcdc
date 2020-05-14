import { Component, OnInit, Input } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { IUser } from '../../../models/events-widget';
import { EventService } from '../../../services/widgets/event.service';
import { AvatarConfiguratorService } from '../../../services/avatar-configurator.service';

export interface IWorkspaceTable {
    acceptFunction?: (value: IUser[]) => void;
    cancelFunction?: () => void;
}

interface IUserWorkspaceTable extends IUser {
    photoPath: string;
}

@Component({
    selector: 'evj-workflow-table',
    templateUrl: './workflow-table.component.html',
    styleUrls: ['./workflow-table.component.scss'],
})
export class WorkflowTableComponent implements OnInit {
    private dataSourceLocal: IUserWorkspaceTable[] = [];
    dataSource: IUserWorkspaceTable[] = [];

    selectedElement: SelectionModel<IUser> = new SelectionModel(true);

    isRefInput: boolean = false;
    isLoading: boolean = true;

    localeData: IWorkspaceTable;

    @Input() set data(event: IWorkspaceTable) {
        this.localeData = event;
        this.selectedElement.clear();
        if (this.dataSource.length === 0) {
            this.loadItem();
        }
    }

    constructor(
        private eventService: EventService,
        private avatarConfiguratorService: AvatarConfiguratorService
    ) {}

    ngOnInit(): void {}

    public accept(): void {
        this.localeData.acceptFunction(this.selectedElement.selected);
    }

    public cancel(): void {
        this.localeData.cancelFunction();
    }

    onNoClick(): void {}

    doubleClick(element): void {}

    searchInput(event): void {
        this.dataSource = this.dataSourceLocal?.filter(
            (val) =>
                val?.firstName?.toLowerCase().includes(event?.target?.value.toLowerCase()) ||
                val?.lastName?.toLowerCase().includes(event?.target?.value.toLowerCase()) ||
                val?.middleName?.toLowerCase().includes(event?.target?.value.toLowerCase()) ||
                val?.positionDescription?.toLowerCase().includes(event?.target?.value.toLowerCase())
        );
    }

    private async loadItem(): Promise<void> {
        this.isLoading = true;
        const dataLoadQueue: Promise<void>[] = [];
        dataLoadQueue.push(
            this.eventService.getUser().then((val) => {
                val.forEach((value) => {
                    const photoPath = this.avatarConfiguratorService.getAvatarPath(value.photoId);
                    const obj = { ...value, photoPath };
                    this.dataSource.push(obj);
                    this.dataSourceLocal.push(obj);
                });
            })
        );
        if (dataLoadQueue.length > 0) {
            try {
                await Promise.all(dataLoadQueue);
                this.isLoading = false;
            } catch (err) {
                console.error(err);
                this.isLoading = false;
            }
        }
    }
}

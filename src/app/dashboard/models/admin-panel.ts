import { IUser } from './events-widget';
import { IWidgets } from './widget.model';
import { IBrigade } from './shift.model';
import { IWorker } from './worker';

export interface IAdminPanel {
    person: IUser;
    workspaces: IWorkspace[];
    availableWidgets: IWidgets[];
    claims: IClaim[];
}

export interface IWorkspace {
    name: string;
    authorId: number;
}

export interface IClaim {
    name: string;
    id: number;
}

export interface IButtonImgSrc {
    btnIconSrc: string;
}

export interface IBrigadeAdminPanel {
    brigadeId: number;
    brigadeNumber: string;
    users: IUser[];
}

export interface IWorkerAdminPanel {
    isActiveWorker: boolean;
    worker: IWorker;
}

export interface IWorkerOptionAdminPanel {
    name: string;
    value: string;
}

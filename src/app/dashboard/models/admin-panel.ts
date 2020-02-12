import { IUser } from './events-widget';
import { IWidgets } from './widget.model';

export interface IAdminPanel {
    person: IUser;
    workspaces: IWorkspace[];
    availableWidgets: IWidgets[];
    claims: IClaim[];
}

export interface IWorkspace {
    name: string;
    author: IUser;
}

export interface IClaim {
    name: string;
    id: string;
}

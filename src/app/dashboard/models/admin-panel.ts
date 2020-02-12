import { IUser } from './events-widget';
import { IWidgets } from './widget.model';

export interface IAdminPanel {
    person: IUser;
    workspaces: IWorkspace[];
    availableWidgets: IWidgets[];
    rights: IRight[];
}

export interface IWorkspace {
    name: string;
    author: IUser;
}

export interface IRight {
    name: string;
    id: string;
}

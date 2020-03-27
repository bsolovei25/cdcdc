import { IUser, IUnitEvents } from './events-widget';
import { IWidgets } from './widget.model';
import { IWorker } from './worker';

export interface IAdminPanel {
    person: IUser;
    workspaces: IWorkspace[];
    availableWidgets: IWidgets[];
    claims: IClaim[];
}

export interface IWorkspace {
    id: number;
    screenName: string;
    widgets?: any;
}

export interface IClaim {
    type?: string;
    comment?: string;
    id: number;
}

export interface IScreen {
    id: number;
    screen: IWorkspace;
    claims: IClaim[];
}

export interface IButtonImgSrc {
    btnIconSrc: string;
}

export interface IBrigadeAdminPanel {
    brigadeId: number;
    brigadeNumber: string;
    users: IUser[];
    unit?: IUnitEvents;
}

export interface IWorkerAdminPanel {
    isActiveWorker: boolean;
    worker: IWorker;
}

export interface IWorkerOptionAdminPanel {
    name?: string;
    value: string;
    key: string;
}

export interface IGroup {
    id: number;
    name: string;
    claims?: IGlobalClaim[];
    users?: number[];
}

export interface IGlobalClaim {
    claimType: string;
    description: string;
    claimCategory: string;
    claimCategoryName?: string;
    claimName?: string;
    claimValueTypeName?: string;
    specification?: string;
    claimValueType?: string;
    value?: string;
}

export enum EnumClaims {
    'Только чтение' = 1,
    'Модификация',
    'Ручной ввод',
    'Администратор',
}

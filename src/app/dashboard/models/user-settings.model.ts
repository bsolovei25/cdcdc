import { IUser } from './events-widget';

export interface IGroupScreensSettings {
    id: number;
    name: string;
    userScreens: IScreenSettings[];
}

export interface IScreenSettings {
    id: number;
    user: IUser[];
    screenName: string;
    updateScreen: boolean;
    widgets: IUserGridItem[];
    claims?: IClaim[];
    isFilter?: boolean;
    isActive?: boolean;
    userScreenGroupId?: number;
    userScreenGroupName?: string;
    isHidden?: boolean;
}

export interface IClaim {
    claimType: ClaimType;
    value: string;
    claimCategory: ClaimCategory;
    claimCategoryName: string;
    claimName: string;
    specification: string;
}

export interface IUserGridItem {
    posX: number;
    posY: number;
    sizeX: number;
    sizeY: number;
    widgetId: string;
    widgetType: string;
    uniqueId: string;
}

export type ClaimType =
    | 'screenView'
    | 'screenEdit'
    | 'screenDel'
    | 'screenAdmin'
    | 'screensAdmin'
    | 'screensAdd'
    | 'screenWidgetAdd'
    | 'screensWidgetAdd'
    | 'screenWidgetEdit'
    | 'screensWidgetEdit'
    | 'screenWidgetDel'
    | 'screensWidgetDel'
    | 'reportsView'
    | 'eventsDelete'
    | 'eventsChangeCategory'
    | string;

export type ClaimCategory = 'allow' | 'deny';

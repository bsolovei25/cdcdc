import { IUser } from './events-widget';

export interface IScreenSettings {
    id: number;
    user: IUser[];
    screenName: string;
    updateScreen: boolean;
    widgets: IUserGridItem[];
    claims?: IClaim[];
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

export type ClaimType = 'screenView' | 'screenEdit' | 'screenDel' | string; // TODO ClaimType
export type ClaimCategory = 'allow' | 'deny';

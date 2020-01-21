import { IUser } from './events-widget';

export interface NewUserSettings {
    userId: number;
    screenId: number;
    userGrid: NewUserGrid[];
}

export interface ScreenSettings {
    id: number;
    user: IUser[];
    screenName: string;
    updateScreen: boolean;
    widgets: NewUserGrid[];
}

export interface NewUserGrid {
    posX: number;
    posY: number;
    sizeX: number;
    sizeY: number;
    widgetId: string;
    widgetType: string;
    uniqueId: string;
}

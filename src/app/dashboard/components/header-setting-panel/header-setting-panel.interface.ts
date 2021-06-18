export interface IInputItem {
    name: string;
    screenName: string;
    screenGroup: string;
}

export interface IHeaderSettingPanelTab {
    name: string;
    isActivate: boolean;
    isOpen: boolean;
    filtration: string;
    relations: IInputItem[];
}

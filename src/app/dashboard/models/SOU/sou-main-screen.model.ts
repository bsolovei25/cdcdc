export interface IInstallation {
    active: boolean;
    deviation: number;
    id: string;
    name: string;
    widgetName?: string;
    installationId?: number;
    order?: number;
    sectionId?: string;
    unitId?: string;
}

export interface IAllInstallations {
    id: string;
    type: string;
    items: IInstallation[];
}

export type IInstallationsObj = {
    [key in InstallationField]?: IAllInstallations;
};

export type InstallationField =
    | 'ProductionOne'
    | 'ProductionTwo'
    | 'ProductionFour'
    | 'ProductionTrade'
    | 'OffSiteCollectors'
    | 'OffSiteFacilities'
    | 'CatalystProduction'
    | 'Other';

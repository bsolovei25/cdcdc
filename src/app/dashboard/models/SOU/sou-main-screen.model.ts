export interface IInstallation {
    active: boolean;
    deviation: number;
    id: number | string;
    name: string;
    widgetName?: string;
    installationId?: number;
    order?: number;
}

export interface IAllInstallations {
    id: string;
    type: string;
    items: IInstallation[];
}

export interface IInstallationsObj {
    ProductionOne?: IAllInstallations;
    ProductionTwo?: IAllInstallations;
    ProductionFour?: IAllInstallations;
    ProductionTrade?: IAllInstallations;
    OffSiteCollectors?: IAllInstallations;
    OffSiteFacilities?: IAllInstallations;
    CatalystProduction?: IAllInstallations;
    Other?: IAllInstallations;
}

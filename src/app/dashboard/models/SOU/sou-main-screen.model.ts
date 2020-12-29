export interface IInstallation {
    active: boolean;
    deviation: number;
    id: number | string;
    name: string;
    widgetName?: string;
    installationId?: number;
    order?: number;
}

export interface IInstallations {
    productionOneData: IInstallation[];
    productionTwoData: IInstallation[];
    productionFourData: IInstallation[];
    productionTradeData: IInstallation[];
    offSiteCollectorsData: IInstallation[];
    offSiteFacilitiesData: IInstallation[];
    catalystProductionData: IInstallation[];
    otherData: IInstallation[];
}

export interface IAllInstallations {
    id: string;
    type: string;
    items: IInstallation[];
}

export interface IInstallation {
    id: number;
    name: string;
    deviation: number;
    active: boolean;
    widgetName?: string;
    installationId?: number;
}

export interface IInstallations {
    productionOneData: IInstallation[];
    productionTwoData: IInstallation[];
    productionFourData: IInstallation[];
    productionTradeData: IInstallation[];
    offSiteCollectorsData: IInstallation;
    offSiteFacilitiesData: IInstallation;
    catalystProductionData: IInstallation;
    otherData: IInstallation;
}

import { IOzsmLoadingPark } from './ozsm-shared.model';

export interface IOzsmPlanningMainItemResponse {
    name: string;
    percent: number;
    value: number;
}

export interface IOzsmPlanningMain {
    storagePercent: number;
    loadingPark: IOzsmLoadingPark;
    items: IOzsmPlanningMainItem[];
}

export interface IOzsmPlanningMainItem {
    id: number;
    name: string;
    percent: number;
    value: number;
    plan: number;
}
